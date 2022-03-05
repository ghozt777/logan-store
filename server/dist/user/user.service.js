"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const user_entity_1 = require("./user.entity");
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const nodemailer = require("nodemailer");
const typeorm_2 = require("@nestjs/typeorm");
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
let UserService = class UserService {
    constructor(userRepository, cacheManager) {
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
        this.genTemplate = (url) => {
            const template = `<!doctype html>
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
    `;
            return template;
        };
    }
    async createUserPayload(dto) {
        const { username, password, email } = dto;
        const errors = [];
        const isThereUsername = await this.userRepository.findOne({ username });
        const isThereEmail = await this.userRepository.findOne({ email });
        if (isThereUsername)
            errors.push({
                field: "username",
                message: "username already exsists"
            });
        if (isThereEmail)
            errors.push({
                field: "email",
                message: "email already in use"
            });
        const hashedPassword = await argon2.hash(password);
        const payload = {
            user: {
                username: username,
                password: hashedPassword,
                email: email
            },
            errors,
            isValid: errors.length === 0
        };
        return payload;
    }
    createAccessToken(user) {
        return jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: '2d'
        });
    }
    createRefreshToken(user) {
        return jwt.sign({
            id: user.id,
            tokenVersion: user.tokenVersion
        }, process.env.JWT_COOKIE_SECRET, {
            expiresIn: '7d'
        });
    }
    isValid(token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return {
            user: payload ? payload : {},
            isValid: payload ? true : false
        };
    }
    async revokeRefreshTokenForUser(id) {
        let isOk = false;
        const entityManager = (0, typeorm_1.getManager)();
        const queryString = `SELECT * FROM USERS where id='${id}';`;
        const user = await entityManager.query(queryString);
        if (user && user[0]) {
            const updateQueryString = `UPDATE users 
            SET tokenVersion = ${user[0].tokenVersion + 1} 
            WHERE id='${id}';`;
            await entityManager.query(updateQueryString);
            isOk = true;
        }
        return isOk;
    }
    async sendEmail(to, html) {
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
        }
        catch (err) {
            console.log('error while sending mail : ', err.message);
        }
    }
    async getUser(cookie) {
        const res = jwt.verify(cookie, process.env.JWT_COOKIE_SECRET);
        const user = await this.userRepository.findOne({ id: res.id });
        return user;
    }
    async forgotPassword(email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
            return false;
        const user = await this.userRepository.findOne({ email });
        if (!user)
            return false;
        const token = (0, uuid_1.v4)();
        await this.cacheManager.set(constants_1.PREFIX_FORGOT_PASSWORD + token, user.id);
        const template = this.genTemplate(process.env.AUTH_MAIL_REDIR.toString());
        await this.sendEmail(email, template);
        return true;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map