import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./image.entity"
import { Product } from "../product/product.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Image, Product])],
    controllers: [],
    providers: []
})
export class ImageModule { }