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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const nodemailer = require("nodemailer");
let UserService = class UserService {
    constructor() { }
    async createUserPayload(dto) {
        const { username, password, email } = dto;
        const errors = [];
        const hashedPassword = await argon2.hash(password);
        const payload = {
            username: username,
            password: hashedPassword,
            email: email
        };
        return payload;
    }
    createAccessToken(user) {
        return jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
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
        console.log('email service called to', to, html);
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        let info = await transporter.sendMail({
            from: '"Ghozt R',
            to,
            subject: "Change Password",
            html,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map