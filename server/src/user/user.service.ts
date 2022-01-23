import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./types/createUser.dto";
import * as argon2 from 'argon2'
import { User } from "./user.entity";
import * as jwt from 'jsonwebtoken'
import { getManager } from "typeorm";
import * as nodemailer from 'nodemailer'

@Injectable()
export class UserService {
    constructor() { }

    async createUserPayload(dto: CreateUserDTO) {
        const { username, password, email } = dto;
        const errors = [];
        const hashedPassword = await argon2.hash(password);
        const payload = {
            username: username,
            password: hashedPassword,
            email: email
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
                expiresIn: '15m'
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


}