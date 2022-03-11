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
const template_1 = require("./template");
let UserService = class UserService {
    constructor(userRepository, cacheManager) {
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
        this.genTemplate = (url) => {
            let template = template_1.template;
            template = template.replace(/%URL_TO_ADD%/g, url);
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
    async createUser(dto) {
        const { username, password, email } = dto;
        const payload = await this.createUserPayload({ username, password, email });
        if (payload) {
            const { user, errors, isValid } = payload;
            try {
                if (isValid) {
                    const result = await this.userRepository.insert({
                        username: user.username,
                        email: user.email,
                        password: user.password
                    });
                }
            }
            catch (err) {
                console.error("USER CREATION FALIURE", err);
            }
            finally {
                console.log(errors);
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
    async logInUser(dto) {
        const { usernameOrEmail, res, password } = dto;
        const isEmail = usernameOrEmail.includes('@');
        const entityManager = (0, typeorm_1.getManager)();
        const queryString = `SELECT * FROM users
        WHERE ${isEmail ? `email='${usernameOrEmail}'` : `username='${usernameOrEmail}'`}`;
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
                };
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
        };
    }
    async logoutUser(res) {
        try {
            res.clearCookie('jid');
        }
        catch (err) {
            console.log('error deleting cookie', err);
            return false;
        }
        return true;
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
        const res = await this.cacheManager.set(constants_1.PREFIX_FORGOT_PASSWORD + token, user.id, {
            ttl: 60 * 60 * 24
        });
        console.log("key", constants_1.PREFIX_FORGOT_PASSWORD + "val: " + token, user.id, res);
        const template = this.genTemplate(process.env.AUTH_MAIL_REDIR.toString() + token);
        await this.sendEmail(email, template);
        return true;
    }
    async resetPassword(token, password) {
        const response = {
            errors: [],
            message: "reset password successful"
        };
        if (password.length < 8) {
            response.errors.push({
                field: 'password',
                message: 'password length too small'
            });
            response.message = 'reset password failed!';
            return response;
        }
        const userId = await this.cacheManager.get(constants_1.PREFIX_FORGOT_PASSWORD + token);
        console.log('u', userId);
        if (!userId) {
            response.errors.push({
                field: 'token',
                message: 'token expired'
            });
            response.message = 'reset password failed!';
            return response;
        }
        const hashedPassword = await argon2.hash(password);
        await (0, typeorm_1.getConnection)().createQueryBuilder().update(user_entity_1.User).set({ password: hashedPassword }).where({ id: userId }).execute();
        await this.cacheManager.del(constants_1.PREFIX_FORGOT_PASSWORD + token);
        return response;
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