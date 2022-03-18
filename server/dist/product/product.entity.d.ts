import { Image } from "./../images/image.entity";
export declare class Product {
    productId: string;
    name: string;
    description: string;
    SKU: string;
    categoryId: string;
    inventoryId: string;
    price: number;
    discountId: string;
    images: Image[];
    created_at: Date;
    updated_at: Date;
}
