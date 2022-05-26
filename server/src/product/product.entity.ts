import { Field, ObjectType } from "@nestjs/graphql";
import { EntityCategory } from "src/entity-category/category.entity";
import { ProductCategory } from "src/product-category/productCategory.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./../images/image.entity"
import { Brand } from "./brand.entity";
import { DisCount } from "./discount.entity";
import { Inventory } from "./inventory.entity";
@ObjectType()
@Entity('products')
export class Product {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ nullable: true })
    description: string;

    @Field()
    @Column()
    SKU: string;

    @Field(() => ProductCategory, { nullable: true })
    @ManyToOne(() => ProductCategory, (pc: ProductCategory) => pc.product, { nullable: true })
    category: ProductCategory;

    @Field(() => Inventory, { nullable: true })
    @OneToOne(() => Inventory, (inventory: Inventory) => inventory.product, { nullable: true })
    @JoinColumn()
    inventory: Inventory;

    @Column({ nullable: true })
    discountId: string;

    @Field()
    @Column({ default: 0 })
    upvotes: number;

    @Field(() => [Image], { nullable: true })
    @OneToMany(() => Image, (image: Image) => image.product)
    images: Image[];

    @Field(() => Brand, { nullable: true })
    @ManyToOne(() => Brand, brand => brand.id, { nullable: true })
    brand: Brand

    @Field(() => [DisCount], { nullable: true })
    @ManyToMany(() => DisCount, discount => discount.discountId, { nullable: true })
    applicabeDiscountIds: [string];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}