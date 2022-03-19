import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductResolver } from "./product.resover";
import { Image } from "../images/image.entity"
import { Inventory } from "./inventory.entity";
import { ProductService } from "./product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Image, Inventory]), CacheModule.register()],
    controllers: [ProductController],
    providers: [ProductResolver, ProductService]
})
export class ProductModule { }