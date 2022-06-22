import { ConsoleLogger, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, getManager, Repository } from "typeorm";
import { Product } from "./product.entity";
import { Inventory } from "./inventory.entity";
import { Image } from "src/images/image.entity";
import { DisCount } from "./discount.entity";
import { GenericResponse } from "./genericResponse.dto";
import { Brand } from "./brand.entity";
import { VariantsDTO } from "./types/variants.dto";
import { ProductVariants, VariantProps } from "./variants.entity";
const crypto = require('crypto')

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
        @InjectRepository(Image) private imageRepository: Repository<Image>,
        @InjectRepository(DisCount) private discountRepository: Repository<DisCount>
    ) { }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.images', 'images')
            .leftJoinAndSelect('product.brand', 'brands')
            .leftJoinAndSelect('product.inventory', 'inventory')
            .leftJoinAndSelect('product.variants', 'productVariants')
            .leftJoinAndSelect('productVariants.variantProps', 'variantProps')
            .getMany();
        console.log(products);
        return products;
    }

    generateSKUCode(productName: string) {
        const prefix = productName.split(' ')[0].toUpperCase();
        const u_key = crypto.randomBytes(12).toString('hex');
        return prefix + "-" + u_key;
    }

    async addProduct(productName: string, description: string | null, brandName: string) {
        const em = getManager();
        try {
            const skuCode = this.generateSKUCode(productName);
            const brand = await em.findOne(Brand, { name: brandName });
            if (!brand) throw new Error(`Brand with name ${brandName} not registered please register the brand first !`);
            const response = await this.productRepository.insert({
                name: productName,
                description,
                SKU: skuCode,
                brand
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
            console.log('response', resposne);
            const resp = this.tagProductWithInventory(resposne.generatedMaps[0].inventoryId, foundProduct.productId);
            if (!resp) throw new Error(`Error while tagging product with inventory`);
            return true;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    async registerDiscount(code: string, percentage: number) {
        try {
            await this.discountRepository.save({ code, discountPercentage: percentage });
            return true;
        } catch (err) {
            console.error(`error while registering discount with code : ${code}`);
            console.error(`error message : ${err.message}`);
            return false;
        }
    }

    async tagProductWithDiscount(productId: string, discountId: string): Promise<GenericResponse> {
        try {
            const foundProduct = await this.productRepository.findOne({ productId });
            if (!foundProduct) {
                return {
                    errors: [{
                        field: 'product',
                        message: `product with id=${productId} not found !`
                    }],
                    isOk: false
                };
            }
            const foundDiscount = await this.discountRepository.findOne({ discountId });
            if (!foundDiscount) {
                return {
                    errors: [{
                        field: 'discount',
                        message: `discount with id=${discountId} not found !`
                    }],
                    isOk: false
                };
            }
            const em = getManager();
            await em.query(`UPDATE products SET discountId='${discountId}' WHERE productId='${productId}'`);
            return {
                errors: [],
                isOk: true
            };
        } catch (err) {
            console.error(`error while tagging product with id = ${productId} with discount with id = ${discountId}`);
            console.error(`error with message : ${err.message}`);
            return {
                errors: [{
                    field: 'unknown',
                    message: err.message
                }],
                isOk: false
            };
        }
    }

    async tagProductWithDiscountCode(productId: string, discountCode: string): Promise<GenericResponse> {
        try {
            const discount = await this.discountRepository.findOne({ code: discountCode });
            if (!discount) {
                return {
                    errors: [{
                        field: 'discount',
                        message: `discount with code=${discountCode} not found !`
                    }],
                    isOk: false
                }
            }
            const response = await this.tagProductWithDiscount(productId, discount.discountId);
            return response;
        } catch (err) {
            console.error(`error while tagging product with id = ${productId} with discount with code = ${discountCode}`);
            console.error(`error with message : ${err.message}`);
            return {
                errors: [{
                    field: 'unknown',
                    message: err.message
                }],
                isOk: false
            };
        }
    }

    async registerBrand(name: string, brandLogo: string): Promise<Boolean> {
        const em = getManager();
        let isOk = true;
        try {
            const response = await em.save(Brand, {
                name,
                brandLogo
            })
        } catch (err) {
            console.error(`Error while registering brand with message -> ${err.message}`)
            isOk = false;
        }
        return isOk;
    }

    async getTrendingProducts(): Promise<Array<Product>> {

        const products = await this.productRepository
            .createQueryBuilder('product').orderBy("product.upvotes", "DESC").limit(5)
            .leftJoinAndSelect('product.images', 'images')
            .leftJoinAndSelect('product.brand', 'brands')
            .leftJoinAndSelect('product.inventory', 'inventory')
            .leftJoinAndSelect('product.variants', 'productVariants')
            .leftJoinAndSelect('productVariants.variantProps', 'variantProps')
            .getMany();

        return products;
    }

    async tagProductWithInventory(inventoryId: string, productId: string): Promise<Boolean> {
        let isOk = true;
        const em = getManager();
        try {
            const foundInventory = await em.findOne(Inventory, { inventoryId });
            const foundProduct = await em.findOne(Product, { productId });
            console.log(foundInventory, foundProduct)
            if (!foundInventory) throw new Error(`Inventory with inventory id = ${inventoryId} not found please re-check`)
            if (!foundProduct) throw new Error(`Product with product id = ${productId} not found please re-check`)
            foundProduct.inventory = foundInventory;
            await em.save(foundProduct);
        } catch (err) {
            console.error(`Error while tagging product with inventory with message -> ${err.message}`);
            console.error(err);
            isOk = false;
        }
        return isOk;
    }

    async tagProductWithCategory(productId: string, categoryName: string): Promise<Boolean> {
        let isOk = true;
        const em = getManager();
        try {
            let queryString = `SELECT * FROM productCategory WHERE LOWER(name) = LOWER('${categoryName}') ;`
            const [foundCategory] = await em.query(queryString);
            if (!foundCategory) throw new Error(`Category with name = ${categoryName} not registered please recheck the name`);
            const foundProduct = await em.findOne(Product, { productId });
            if (!foundProduct) throw new Error(`Product with id = ${productId} not found please recheck the id`);
            foundProduct.category = foundCategory;
            await em.save(foundProduct);
        } catch (err) {
            console.error(`Error while tagging product with category with message -> ${err.message}`);
            console.error(err);
            isOk = false;
        }
        return isOk;
    }

    async tagProductWithBrand(productId: string, brandId: string): Promise<Boolean> {
        const em = getManager();
        let isOk = true;
        try {
            const em = getManager();
            const foundProduct = await this.productRepository.findOne({ productId });
            if (!foundProduct) throw new Error(`Product with product id = ${productId} not found !`);
            const [foundBrand] = await em.query(`SELECT * FROM brands WHERE id='${brandId}'`);
            if (!foundBrand) throw new Error(`Brand with brand id = ${brandId} not found !`);
            foundProduct.brand = foundBrand;
            await em.save(foundProduct);
        } catch (err) {
            console.error(`error while tagging product with brand with message -> ${err.message}`);
            isOk = false;
        } finally {
            return isOk;
        }
    }

    async createproductVariant(dto: VariantsDTO): Promise<{ productVariant: ProductVariants, msg: string; }> {
        try {
            let toInsertVariantProps = []
            dto.variants.forEach((v) => {
                const variantToSave = new VariantProps();
                variantToSave.variantName = v.variantName;
                variantToSave.priceIncement = v.priceIncrement;
                toInsertVariantProps.push(variantToSave);
            })
            const pv = new ProductVariants();
            pv.property = dto.property;
            pv.variantProps = toInsertVariantProps;
            return {
                productVariant: pv,
                msg: "success"
            }
        } catch (err) {
            return {
                msg: err.message ?? "Unknown Error!",
                productVariant: null
            };
        }
    }

    async addProductVariants(productId: string, dto: VariantsDTO): Promise<GenericResponse> {
        const response: GenericResponse = {
            errors: [],
            isOk: false
        };
        try {
            const em = getManager();
            const foundProduct = await em.findOne(Product, { productId });
            if (!foundProduct) {
                response.errors.push({ field: 'product', message: 'product not found' })
                throw new Error(`product with id=${productId} Not Found !`);
            }
            const variantsInsertionResponse = await this.createproductVariant(dto);
            if (!variantsInsertionResponse.productVariant) {
                response.errors.push({ field: 'variants', message: 'internal server error ' });
                throw new Error(`Error inserting variants with message -> ${variantsInsertionResponse.msg}`);
            }
            foundProduct.variants = await em.save(variantsInsertionResponse.productVariant);
            await em.save(foundProduct);
            response.isOk = true;
        } catch (err) {
            console.error('Error adding variants to product with message -> ', err.message);
            console.error(err);
            response.errors.push({ field: 'sever error message', message: err.message });
            return response;
        } finally {
            return response;
        }
    }

}