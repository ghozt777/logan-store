import { CreateUserDTO } from "./types/createUser.dto";
export declare class UserService {
    constructor();
    createUserPayload(dto: CreateUserDTO): Promise<{
        username: string;
        password: string;
        email: string;
    }>;
}
