import { Repository } from "typeorm";
import { Product } from "./product.entity";
export declare class ProductResolver {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    getProducts(): Promise<Product>;
}
