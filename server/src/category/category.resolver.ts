import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";

@Resolver(() => Category)
export class CategoryResolver {
    constructor(
        private categoryService: CategoryService
    ) { }
    @Mutation(() => Boolean)
    async addCategory(
        @Args({ type: () => String, name: 'categoryName' }) categoryName: string
    ): Promise<Boolean> {
        const response = await this.categoryService.createCategory(categoryName);
        return response;
    }
} 