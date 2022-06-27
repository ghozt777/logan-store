import { UseInterceptors } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, ArgsType, Field, InputType } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategory } from "src/product-category/productCategory.entity";
import { LoggingInterceptor } from "src/user/logging.interceptor";
import { Float } from "type-graphql";
import { getManager, Repository } from "typeorm";
import { GenericResponse } from "./genericResponse.dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { VariantsDTO } from "./types/variants.dto";


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
        @Args({ type: () => String, name: 'brand' }) brand: string,
    ): Promise<Boolean> {
        const response = await this.productService.addProduct(productName, description, brand);
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

    @Mutation(() => Boolean)
    async registerDiscount(
        @Args({ type: () => String, name: 'code' }) code: string,
        @Args({ type: () => Float, name: 'percentage' }) percentage: number,
    ) {
        const res = await this.productService.registerDiscount(code, percentage);
        return res;
    }

    @Mutation(() => GenericResponse)
    async tagProductWithDiscount(
        @Args({ type: () => String, name: 'productId' }) productId: string,
        @Args({ type: () => String, name: 'discountId' }) discountId: string,
    ): Promise<GenericResponse> {
        const response = await this.productService.tagProductWithDiscount(productId, discountId);
        return response;
    }

    @Mutation(() => GenericResponse)
    async tagProductWithDiscountCode(
        @Args({ type: () => String, name: 'productId' }) productId: string,
        @Args({ type: () => String, name: 'discountCode' }) discountCode: string,
    ) {
        const response = await this.productService.tagProductWithDiscountCode(productId, discountCode);
        return response;
    }

    @Mutation(() => Boolean)
    async registerBrand(
        @Args({ type: () => String, name: 'name' }) name: string,
        @Args({ type: () => String, name: 'brandLogo' }) brandLogo: string
    ) {
        const response = await this.productService.registerBrand(name, brandLogo);
        return response;
    }

    @Query(() => [Product])
    async getTrendingProducts(): Promise<Array<Product>> {
        const products = await this.productService.getTrendingProducts();
        return products;
    }

    @Mutation(() => Boolean)
    async tagProductWithInventory(
        @Args({ type: () => String, name: 'inventoryId' }) inventoryId: string,
        @Args({ type: () => String, name: 'productId' }) productId: string,
    ) {
        const response = this.productService.tagProductWithInventory(inventoryId, productId);
        return response;
    }

    @Mutation(() => Boolean)
    async tagProductWithCategory(
        @Args({ type: () => String, name: 'productId' }) productId: string,
        @Args({ type: () => String, name: 'categoryName' }) categoryName: string,
    ) {
        const response = this.productService.tagProductWithCategory(productId, categoryName);
        return response;
    }

    @Mutation(() => Boolean)
    async tagProductWithBrand(
        @Args({ type: () => String, name: 'productId' }) productId: string,
        @Args({ type: () => String, name: 'brandId' }) brandId: string,
    ) {
        const response = this.productService.tagProductWithBrand(productId, brandId);
        return response;
    }

    @Query(() => [ProductCategory])
    async getCategories(): Promise<Array<ProductCategory>> {
        const em = getManager();
        const response = await em.query('SELECT * FROM productCategory')
        return response;
    }


    @Mutation(() => GenericResponse)
    async addProductVariants(
        @Args('variantsInfo') variantsDTO: VariantsDTO,
        @Args({ type: () => String, name: 'productId' }) productId: string
    ): Promise<GenericResponse> {
        const response = await this.productService.addProductVariants(productId, variantsDTO);
        return response;
    }

}


