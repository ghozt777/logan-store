import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductResolver } from "./product.resover";
import { Image } from "../images/image.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Product, Image]), CacheModule.register()],
    controllers: [ProductController],
    providers: [ProductResolver]
})
export class ProductModule { }