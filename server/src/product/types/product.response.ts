import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "../product.entity";
import { ErrorType } from "./error.type";

@ObjectType()
export class ProductsResponse {
    @Field()
    products: [Product];

    @Field()
    errors: [ErrorType];
}