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
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
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
    async getUser(cookie) {
        const res = jwt.verify(cookie, process.env.JWT_COOKIE_SECRET);
        const user = await this.userRepository.findOne({ id: res.id });
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map