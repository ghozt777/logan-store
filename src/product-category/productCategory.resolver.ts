import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { getManager } from "typeorm";
import { ProductCategory } from "./productCategory.entity";

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
    constructor() { }

    @Query(() => String)
    helloFromProductCategory() {
        return "Hello from product category module"
    }

    @Mutation(() => Boolean)
    async addCategory(
        @Args({ type: () => String, name: 'categoryName' }) categoryName: string,
        @Args({ type: () => String, name: 'imageUrl' }) imageUrl: string
    ): Promise<Boolean> {
        const em = getManager();
        let isOk = true;
        try {
            const response = await em.save(ProductCategory, {
                name: categoryName,
                imageUrl
            })
        } catch (err) {
            console.error(`Error while adding category with message -> ${err.message}`);
            isOk = false;
        }
        return isOk;
    }
}