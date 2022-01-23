import { HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    handleRefreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | {
        statsusCode: HttpStatus;
        success: boolean;
        msg: string;
        accessToken: string;
    }>;
    revoke(body: any): Promise<boolean>;
}
