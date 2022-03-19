import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { CategoryResolver } from "./category.resolver";
import { CategoryService } from "./category.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryResolver, CategoryService],
    controllers: []
})
export class CategoryModule { }