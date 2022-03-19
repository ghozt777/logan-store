import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRespository: Repository<Category>
    ) { }

    async createCategory(categoryName: string) {
        try {
            const response = await this.categoryRespository.insert({
                categoryName
            })
            return true;
        } catch (err) {
            console.log('ctegory creation faliure with message: ', err.message);
            return false;
        }
    }
}