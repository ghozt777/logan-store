import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
export declare class UserResolver {
    private userService;
    private userRepository;
    constructor(userService: UserService, userRepository: Repository<User>);
    hello(): string;
    register(username: string, email: string, password: string): Promise<boolean>;
    login(usernameOrEmail: string, password: string): Promise<boolean>;
}
