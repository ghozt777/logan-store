import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./types/createUser.dto";
import * as argon2 from 'argon2'
import { User } from "./user.entity";
import * as jwt from 'jsonwebtoken'
import { getConnection, getManager, Repository } from "typeorm";
import * as nodemailer from 'nodemailer'
import { InjectRepository } from "@nestjs/typeorm";
import { v4 as uuidv4 } from "uuid"
import { PREFIX_FORGOT_PASSWORD } from "src/constants";
import { Cache } from "cache-manager"

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async createUserPayload(dto: CreateUserDTO) {
        const { username, password, email } = dto;
        const errors = [];
        const isThereUsername = await this.userRepository.findOne({ username });
        const isThereEmail = await this.userRepository.findOne({ email });
        if (isThereUsername) errors.push({
            field: "username",
            message: "username already exsists"
        })
        if (isThereEmail) errors.push({
            field: "email",
            message: "email already in use"
        })
        const hashedPassword = await argon2.hash(password);
        const payload = {
            user: {
                username: username,
                password: hashedPassword,
                email: email
            },
            errors,
            isValid: errors.length === 0
        }
        return payload;
    }

    createAccessToken(user: User) {
        return jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2d'
            }
        )
    }

    createRefreshToken(user: User) {
        return jwt.sign(
            {
                id: user.id,
                tokenVersion: user.tokenVersion
            },
            process.env.JWT_COOKIE_SECRET,
            {
                expiresIn: '7d'
            }
        )
    }

    isValid(token: string) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return {
            user: payload ? payload : {},
            isValid: payload ? true : false
        };
    }

    async revokeRefreshTokenForUser(id: string): Promise<boolean> {
        let isOk = false;
        const entityManager = getManager();
        const queryString = `SELECT * FROM USERS where id='${id}';`
        const user = await entityManager.query(queryString);
        if (user && user[0]) {
            const updateQueryString = `UPDATE users 
            SET tokenVersion = ${user[0].tokenVersion + 1} 
            WHERE id='${id}';`
            await entityManager.query(updateQueryString);
            isOk = true;
        }
        return isOk;
    }

    async sendEmail(to: string, html: string) {

        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.AUTH_MAIL_USER.toString(),
                    pass: process.env.AUTH_MAIL_PASS.toString(),
                },
            });

            let info = await transporter.sendMail({
                from: process.env.AUTH_MAIL_FROM,
                to,
                subject: "Reset Password",
                html,
            });
            console.log("Message sent: %s", info.messageId);
        } catch (err) {
            console.log('error while sending mail : ', err.message);
        }
    }

    async getUser(cookie: string) {
        const res: any = jwt.verify(cookie, process.env.JWT_COOKIE_SECRET);
        const user = await this.userRepository.findOne({ id: res.id });
        return user;
    }

    async forgotPassword(email: string): Promise<Boolean> {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return false;
        const user = await this.userRepository.findOne({ email });
        if (!user) return false;
        const token = uuidv4();
        const res = await this.cacheManager.set(PREFIX_FORGOT_PASSWORD + token, user.id, {
            ttl: 60 * 60 * 24 // ttl in sec -> 1d expiration for all cached tokens   
        });
        console.log("key", PREFIX_FORGOT_PASSWORD + "val: " + token, user.id, res);
        const template = this.genTemplate(process.env.AUTH_MAIL_REDIR.toString() + token);
        await this.sendEmail(email, template);
        return true;
    }

    async resetPassword(token: string, password: string) {
        const response = {
            errors: [],
            message: "reset password successful"
        }
        if (password.length < 8) {
            response.errors.push({
                field: 'password',
                message: 'password length too small'
            })
            response.message = 'reset password failed!'
            return response;
        }

        const userId = await this.cacheManager.get(PREFIX_FORGOT_PASSWORD + token);
        console.log('u', userId)
        if (!userId) {
            response.errors.push({
                field: 'token',
                message: 'token expired'
            })
            response.message = 'reset password failed!'
            return response;
        }
        const hashedPassword = await argon2.hash(password);
        await getConnection().createQueryBuilder().update(User).set({ password: hashedPassword }).where({ id: userId }).execute();
        await this.cacheManager.del(PREFIX_FORGOT_PASSWORD + token);
        return response;
    }


    genTemplate = (url: string) => {
        const template =
            `<!doctype html>
        <html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password</title>
            <meta name="description" content="Reset Password">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <img width="60" src="https://img.icons8.com/external-justicon-lineal-color-justicon/344/external-ghost-halloween-justicon-lineal-color-justicon-2.png" title="logo" alt="logo">
                                  </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Please Click the below link to reset your password. Thank you for using Logan Store. It's been a pleasure serving you.
                                              </p>
                                                <a href="${url}"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;color:black;">Reset
                                                    Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>Logan Store</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        
        </html>
    `
        return template;
    }


}