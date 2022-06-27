import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { ProductCategory, ProductSubCategory } from "./productCategory.entity";
import { ProductCategoryResolver } from "./productCategory.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory, Product, ProductSubCategory])],
    controllers: [],
    providers: [ProductCategoryResolver]
})
export class ProductCategoryModule { }
