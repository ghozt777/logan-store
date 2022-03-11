import { UseInterceptors } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggingInterceptor } from "src/user/logging.interceptor";
import { Repository } from "typeorm";
import { Product } from "./product.entity";

@UseInterceptors(LoggingInterceptor)
@Resolver(() => Product)
export class ProductResolver {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

    @Query(() => Product)
    async getProducts(): Promise<Product> {
        const products = await this.productRepository.query(`SELECT * FROM products`);
        return products;
    }

    

}