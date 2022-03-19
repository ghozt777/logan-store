import { CacheModule, MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../address/address.entity";
import { AuthController } from "./auth.controller";
import { User } from "./user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Address]), CacheModule.register(),],
    providers: [UserResolver, UserService],
    controllers: [AuthController]
})
export class UserModule {
    constructor() { }
}