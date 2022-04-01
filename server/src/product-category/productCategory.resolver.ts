import { Resolver, Query } from "@nestjs/graphql";
import { ProductCategory } from "./productCategory.entity";

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
    constructor() { }

    @Query(() => String)
    helloFromProductCategory() {
        return "Hello from product category module"
    }
}