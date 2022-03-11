import { Args, Context, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Response, Request } from "express";
import { CACHE_MANAGER, Inject, UseInterceptors } from "@nestjs/common";
import { Cache } from 'cache-manager';
import { LoggingInterceptor } from "./logging.interceptor";
import { UserCreationResponse } from "./types/createUserResponse.type";
import { LoginResponse } from "./types/loginResponse.type";
import * as jwt from 'jsonwebtoken'
import { Auth } from "./auth.decorator";

@UseInterceptors(LoggingInterceptor)
@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService, @InjectRepository(User) private userRepository: Repository<User>, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    @Query(() => String)
    hello(@Auth() isAuth : boolean) {
        console.log('is authenticated', isAuth);
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
        const dto = {
            username ,
            email , 
            password 
        }
        const response = await this.userService.createUser(dto) ;
        return response ;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Context('res') res: Response,
        @Args({ name: 'usernameOrEmail', type: () => String }) usernameOrEmail: string,
        @Args({ name: 'password', type: () => String }) password: string,
    ): Promise<LoginResponse> {
        const dto = {
            usernameOrEmail , 
            password,
            res
        } ;
        const response = await this.userService.logInUser(dto) ;
        return response ;
    }

    @Query(() => User)
    async me(@Context('cookies') cookies: any): Promise<User> {
        const payload = cookies['jid'];
        const user = await this.userService.getUser(payload);
        return user;
    }

    @Query(() => User)
    async whoami(
        @Context('req') req: Request
    ): Promise<User> {
        const header = req.headers["authorization"];
        console.log(req.headers)
        const res: any = jwt.verify(header, process.env.JWT_SECRET);
        const user = await this.userRepository.findOne({ id: res.id });
        return user
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Args({ name: 'email', type: () => String }) email: string
    ): Promise<Boolean> {
        const response = await this.userService.forgotPassword(email);
        return response;
    }

    @Mutation(() => UserCreationResponse)
    async resetPassword(
        @Args({ name: 'token', type: () => String }) token: string,
        @Args({ name: 'newPassword', type: () => String }) newPassword: string,
    ): Promise<UserCreationResponse> {
        const response = await this.userService.resetPassword(token, newPassword);
        return response;
    }

    @Mutation(() => Boolean)
    async logout(
        @Context('res') res: Response
    ) {
        const response = await this.userService.logoutUser(res) ;
        return response ;
    }

}