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
import { Response } from "express";
import { template as emailTemplate } from "./template"

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

    async createUser(dto: {
        username: string;
        email: string;
        password: string;
    }) {
        const { username, password, email } = dto;
        const payload = await this.createUserPayload({ username, password, email });
        if (payload) {
            const { user, errors, isValid } = payload;
            try {
                if (isValid) {
                    const em = getManager();
                    const [userCategory] = await em.query(`SELECT * FROM entityCategory WHERE categoryName='User'`);
                    const result = await this.userRepository.insert({
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        categoryId: userCategory.categoryId
                    });
                }
            } catch (err) {
                console.error("USER CREATION FALIURE", err);
            } finally {
                console.log(errors)
                return {
                    errors,
                    message: isValid ? "user creation successful" : "user creation faliure"
                };
            }
        }
        return {
            errors: [{ field: 'username', message: 'unknown error' }, { field: 'email', message: 'unknown error' }, { field: 'password', message: 'unknown error' }],
            message: "user creation faliure"
        };
    }


    async logInUser(dto: {
        usernameOrEmail: string;
        password: string;
        res: Response
    }) {
        const { usernameOrEmail, res, password } = dto;
        const isEmail = usernameOrEmail.includes('@');
        const entityManager = getManager();
        const queryString = `SELECT * FROM users
        WHERE ${isEmail ? `email='${usernameOrEmail}'` : `username='${usernameOrEmail}'`}`
        const user = await entityManager.query(queryString);
        if (Array.isArray(user) && user[0]) {
            const isPasswordValid = await argon2.verify(user[0].password, password);
            if (!isPasswordValid) {
                return {
                    accessToken: "",
                    errors: [
                        {
                            field: 'password',
                            message: 'worng password !'
                        }
                    ]
                }
            }
            const accessToken = this.createAccessToken(user[0]);
            const refreshToken = this.createRefreshToken(user[0]);
            res.cookie('jid', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
            });
            res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
            return {
                accessToken: accessToken,
                errors: []
            };
        }
        return {
            accessToken: "",
            errors: [
                {
                    field: "usernameOrEmail",
                    message: "invalid creadentials"
                }
            ]
        }
    }

    async logoutUser(res: Response) {
        try {
            res.clearCookie('jid');
        } catch (err) {
            console.log('error deleting cookie', err);
            return false;
        }
        return true;
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
        let template = emailTemplate;
        template = template.replace(/%URL_TO_ADD%/g, url);
        return template;
    }

}