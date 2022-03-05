import { CreateUserDTO } from "./types/createUser.dto";
import { User } from "./user.entity";
import * as jwt from 'jsonwebtoken';
import { Repository } from "typeorm";
import { Cache } from "cache-manager";
export declare class UserService {
    private userRepository;
    private cacheManager;
    constructor(userRepository: Repository<User>, cacheManager: Cache);
    createUserPayload(dto: CreateUserDTO): Promise<{
        user: {
            username: string;
            password: string;
            email: string;
        };
        errors: any[];
        isValid: boolean;
    }>;
    createAccessToken(user: User): string;
    createRefreshToken(user: User): string;
    isValid(token: string): {
        user: string | jwt.JwtPayload;
        isValid: boolean;
    };
    revokeRefreshTokenForUser(id: string): Promise<boolean>;
    sendEmail(to: string, html: string): Promise<void>;
    getUser(cookie: string): Promise<User>;
    forgotPassword(email: string): Promise<Boolean>;
    resetPassword(token: string, password: string): Promise<{
        errors: any[];
        message: string;
    }>;
    genTemplate: (url: string) => string;
}
