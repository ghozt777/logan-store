import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Response } from "express";
declare class LoginResponse {
    accessToken: string;
}
export declare class UserResolver {
    private userService;
    private userRepository;
    constructor(userService: UserService, userRepository: Repository<User>);
    hello(): string;
    register(username: string, email: string, password: string): Promise<boolean>;
    login(res: Response, usernameOrEmail: string, password: string): Promise<LoginResponse>;
}
export {};
