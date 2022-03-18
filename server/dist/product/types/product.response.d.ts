import { Product } from "../product.entity";
import { ErrorType } from "./error.type";
export declare class ProductsResponse {
    products: [Product];
    errors: [ErrorType];
}
