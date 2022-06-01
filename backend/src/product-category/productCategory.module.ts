import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { ProductCategory } from "./productCategory.entity";
import { ProductCategoryResolver } from "./productCategory.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory, Product])],
    controllers: [],
    providers: [ProductCategoryResolver]
})
export class ProductCategoryModule { }
