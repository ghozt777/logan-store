import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { getManager } from "typeorm";
import { UserService } from "./user.service";

@Controller('/')
export class AuthController {
    constructor(private userService: UserService) { }

    @Post('/refresh_token')
    async handleRefreshToken(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies.jid;
        if (!token) {
            return {
                statsusCode: HttpStatus.UNAUTHORIZED,
                success: false,
                msg: "Invalid Token",
                accessToken: ""
            }
        }
        let payload = null;
        try {
            payload = jwt.verify(token, process.env.JWT_COOKIE_SECRET);
        } catch (err) {
            console.error('Error while token verification', err);
            return {
                statsusCode: HttpStatus.UNAUTHORIZED,
                success: false,
                msg: "Invalid Token" + err.message,
                accessToken: ""
            }
        }

        // token valid 
        const entityManager = getManager();
        const queryString = `SELECT * FROM users where id='${payload.id}'`
        const user = await entityManager.query(queryString);
        if (user && user[0]) {
            if (payload.tokenVersion != user[0].tokenVersion) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    statsusCode: HttpStatus.UNAUTHORIZED,
                    success: false,
                    msg: "Invalid Token",
                    accessToken: ""
                });
            }
            const accessToken = jwt.sign(
                {
                    id: user[0].id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '15m'
                }
            )

            const refreshToken = this.userService.createRefreshToken(user[0]);
            console.log('refresh token generated: ', refreshToken)
            return res.cookie('jid', refreshToken).status(201).json({
                statsusCode: HttpStatus.CREATED,
                success: true,
                msg: "Token creation successful",
                accessToken: accessToken
            });
        }


        return {
            statsusCode: HttpStatus.SERVICE_UNAVAILABLE,
            success: false,
            msg: "Unhandled Error",
            accessToken: ""
        }
    }

    @Post('/revoke')
    async revoke(@Body() body) {
        this.userService.revokeREfreshTokenForUser(body.id);
        return true;
    }
}