import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./types/createUser.dto";
import * as argon2 from 'argon2'

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

}