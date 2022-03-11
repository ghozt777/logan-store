import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./image.entity"
import { Product } from "../product/product.entity"
import { ImageResolver } from "./image.resolver";
import { ImageService } from "./image.service";

@Module({
    imports: [TypeOrmModule.forFeature([Image, Product])],
    controllers: [],
    providers: [ImageResolver, ImageService]
})
export class ImageModule { }