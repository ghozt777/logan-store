import { Args, Context, Field, GraphQLExecutionContext, Mutation, ObjectType, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import * as argon2 from 'argon2'
import * as dotenv from 'dotenv'
dotenv.config();
import * as jwt from 'jsonwebtoken'
import { ExecutionContext, Req, Res } from "@nestjs/common";
import { Response } from "express";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

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

    @Mutation(() => LoginResponse)
    async login(
        @Context('res') res: Response,
        @Args({ name: 'usernameOrEmail', type: () => String }) usernameOrEmail: string,
        @Args({ name: 'password', type: () => String }) password: string,
    ): Promise<LoginResponse> {
        const isEmail = usernameOrEmail.includes('@');
        const entityManager = getManager();
        const queryString = `SELECT * FROM users
        WHERE ${isEmail ? `email='${usernameOrEmail}'` : `username='${usernameOrEmail}'`}`
        const user = await entityManager.query(queryString);
        if (Array.isArray(user) && user[0]) {
            const isPasswordValid = await argon2.verify(user[0].password, password);
            if (!isPasswordValid) throw new Error('invalid credentails');
            const accessToken = jwt.sign(
                {
                    id: user[0].id,
                    username: user[0].username,
                    email: user[0].email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '15m'
                }
            )
            const refreshToken = jwt.sign(
                {
                    id: user[0].id
                },
                process.env.JWT_COOKIE_SECRET,
                {
                    expiresIn: '7d'
                }
            )
            res.cookie('jid', refreshToken, {
                httpOnly: true,
                sameSite: 'lax'
            });
            return {
                accessToken: accessToken
            };
        }
        else throw new Error('invalid credentails');
    }

}