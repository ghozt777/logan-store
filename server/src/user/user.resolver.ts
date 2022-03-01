import { Args, Context, Field, Mutation, ObjectType, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import * as argon2 from 'argon2'
import { Response, Request } from "express";
import { CACHE_MANAGER, Inject, UseInterceptors } from "@nestjs/common";
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid'
import { LoggingInterceptor } from "./logging.interceptor";
import { UserCreationResponse } from "./types/createUserResponse.type";
import { LoginResponse } from "./types/loginResponse.type";



@UseInterceptors(LoggingInterceptor)
@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService, @InjectRepository(User) private userRepository: Repository<User>, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    @Query(() => String)
    hello() {
        return 'Hello From User'
    }

    @Mutation(() => String)
    checkAuth(@Context('req') req: Request) {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(' ')[1];
            const { user } = this.userService.isValid(token);
            console.log("User: ", user);
            return 'auth passed'
        }
        return 'auth failed'
    }


    @Mutation(() => UserCreationResponse)
    async register(
        @Args({ name: "username", type: () => String }) username: string,
        @Args({ name: "email", type: () => String }) email: string,
        @Args({ name: "password", type: () => String }) password: string,
    ): Promise<UserCreationResponse> {
        const payload = await this.userService.createUserPayload({ username, password, email });
        if (payload) {
            const { user, errors, isValid } = payload;
            try {
                if (isValid) {
                    const result = await this.userRepository.insert({
                        username: user.username,
                        email: user.email,
                        password: user.password
                    });
                }
            } catch (err) {
                console.error("USER CREATION FALIURE", err);
            } finally {
                console.log(errors)
                return {
                    errors,
                    message: isValid ? "user creation successful" : "user creation faliure"
                };
            }
        }
        return {
            errors: [
                {
                    field: 'username',
                    message: 'unknown error'
                },
                {
                    field: 'email',
                    message: 'unknown error'
                },
                {
                    field: 'password',
                    message: 'unknown error'
                }
            ],
            message: "user creation faliure"
        };;
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
            if (!isPasswordValid) {
                return {
                    accessToken: "",
                    errors: [
                        {
                            field: 'password',
                            message: 'worng password !'
                        }
                    ]
                }
            }
            const accessToken = this.userService.createAccessToken(user[0]);
            const refreshToken = this.userService.createRefreshToken(user[0]);
            res.cookie('jid', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
            });
            return {
                accessToken: accessToken,
                errors: []
            };
        }
        return {
            accessToken: "",
            errors: [
                {
                    field: "usernameOrEmail",
                    message: "invalid creadentials"
                }
            ]
        }
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Args({ name: 'email', type: () => String }) email: string
    ) {
        const entityManager = getManager();
        const user = await entityManager.query(`SELECT * FROM users WHERE email='${email}'`);
        if (user && user[0]) {
            const token = uuidv4();
            const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`;
            await this.userService.sendEmail(user[0].email, html);
            await this.cacheManager.set(process.env.FORGOT_PASSWORD_PREFIX + token, user[0].id);
        }
        return true;
    }

    @Query(() => User)
    async me(@Context('cookies') cookies: any): Promise<User> {
        const payload = cookies['jid'];
        const user = await this.userService.getUser(payload);
        return user;
    }

}