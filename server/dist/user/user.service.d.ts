import { CreateUserDTO } from "./types/createUser.dto";
import { User } from "./user.entity";
import * as jwt from 'jsonwebtoken';
export declare class UserService {
    constructor();
    createUserPayload(dto: CreateUserDTO): Promise<{
        username: string;
        password: string;
        email: string;
    }>;
    createAccessToken(user: User): string;
    createRefreshToken(user: User): string;
    isValid(token: string): {
        user: string | jwt.JwtPayload;
        isValid: boolean;
    };
    revokeRefreshTokenForUser(id: string): Promise<boolean>;
    sendEmail(to: string, html: string): Promise<void>;
}
