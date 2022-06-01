import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityCategory } from "./category.entity";
import { CategoryResolver } from "./category.resolver";
import { CategoryService } from "./category.service";

@Module({
    imports: [TypeOrmModule.forFeature([EntityCategory])],
    providers: [CategoryResolver, CategoryService],
    controllers: []
})
export class CategoryModule { }