import { UseInterceptors } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggingInterceptor } from "src/user/logging.interceptor";
import { Float } from "type-graphql";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";


@UseInterceptors(LoggingInterceptor)
@Resolver(() => Product)
export class ProductResolver {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private productService: ProductService
    ) { }

    @Query(() => [Product]) // no auth required as we wanna show the products for all the customers wether they are logged in or not
    async getProducts(): Promise<Product[]> {
        const products = await this.productService.getAllProducts();
        return products;
    }

    @Mutation(() => Boolean)
    async addProduct(
        @Args({ type: () => String, name: 'productName' }) productName: string,
        @Args({ type: () => String || null, name: 'description' }) description: string | null,
    ): Promise<Boolean> {
        const response = await this.productService.addProduct(productName, description,);
        return response;
    }

    @Mutation(() => Boolean)
    async addImageToProduct(
        @Args({ type: () => String, name: 'productId' }) productId: string,
        @Args({ type: () => String, name: 'imageName' }) imageName: string,
        @Args({ type: () => String, name: 'imageUrl' }) imageUrl: string
    ): Promise<Boolean> {
        const response = await this.productService.addImage(productId, imageName, imageUrl);
        return response;
    }

    @Mutation(() => Boolean)
    async createInventory(
        @Args({ type: () => String, name: 'currency' }) currency: "USD" | "INR",
        @Args({ type: () => Float, name: 'stock' }) stock: number,
        @Args({ type: () => Float, name: 'price' }) price: number,
        @Args({ type: () => String, name: 'productId' }) productId: string,
    ): Promise<Boolean> {
        const response = await this.productService.createInventory(currency, price, stock, productId);
        return response;
    }

}