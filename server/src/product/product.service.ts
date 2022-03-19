import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { Product } from "./product.entity";
import { Inventory } from "./inventory.entity";
import { Image } from "src/images/image.entity";
const crypto = require('crypto')

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
        @InjectRepository(Image) private imageRepository: Repository<Image>
    ) { }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.images', 'images')
        .getMany();
        console.log(products);
        return products;
    }

    generateSKUCode(productName: string) {
        const prefix = productName.split(' ')[0].toUpperCase();
        const u_key = crypto.randomBytes(12).toString('hex');
        return prefix + "-" + u_key;
    }

    async addProduct(name: string, description: string | null) {
        const em = getManager();
        try {
            const skuCode = this.generateSKUCode(name);
            const response = await this.productRepository.insert({
                name,
                description,
                SKU: skuCode
            })
            return true;
        } catch (err) {
            console.log('Error while creating product with message: ', err.message);
            return false;
        }
    }

    async addImage(productId: string, imageName: string, imageUrl: string) {
        try {
            const [product] = await this.productRepository.find({ productId });
            if (!product) throw new Error(`Product Not Found`);
            const image = new Image();
            image.name = imageName;
            image.url = imageUrl;
            image.product = product;
            await this.imageRepository.save(image);
            return true;
        } catch (err) {
            console.error('error adding image to product', productId);
            console.error('error: ', err);
            return false;
        }
    }

    async createInventory(currency: "INR" | "USD", price: number, stock: number, productId: string) {
        try {
            const [foundProduct] = await this.productRepository.find({ productId });
            if (!foundProduct) throw new Error(`product with productId = ${productId} dosen't exist`);
            const resposne = await this.inventoryRepository.insert({
                currency,
                price,
                stock,
                skuCode: foundProduct.SKU
            })
            return true;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
}