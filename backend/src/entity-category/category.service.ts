import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EntityCategory } from "./category.entity";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(EntityCategory) private entityCategoryRepository: Repository<EntityCategory>
    ) { }

    async createCategory(categoryName: string) {
        try {
            const response = await this.entityCategoryRepository.insert({
                categoryName
            })
            return true;
        } catch (err) {
            console.log('category creation faliure with message: ', err.message);
            return false;
        }
    }
}