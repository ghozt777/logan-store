import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Arg } from "type-graphql";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService, @InjectRepository(User) private userRepository: Repository<User>) { }

    @Query(() => String)
    hello() {
        return 'Hello From User'
    }

    @Mutation(() => Boolean)
    async register(
        @Args({ name: "username", type: () => String }) username: string,
        @Args({ name: "email", type: () => String }) email: string,
        @Args({ name: "password", type: () => String }) password: string,
    ) {
        const payload = await this.userService.createUserPayload({ username, password, email });
        let isOk = false;
        if (payload) {
            const { username, password, email } = payload;
            try {
                await this.userRepository.insert({
                    username: username,
                    email: email,
                    password: password
                });
                isOk = true;
            } catch (err) {
                console.error("USER CREATION FALIURE", err);
            } finally {
                return isOk;
            }
        }
        return false;
    }

}