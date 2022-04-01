import { Field, ObjectType } from "@nestjs/graphql";
import { EntityCategory } from "src/entity-category/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./../images/image.entity"
import { Brand } from "./brand.entity";
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

    @Column({ nullable: true })
    productCategoryId: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @OneToOne(() => Inventory, inventory => inventory.inventoryId)
    inventoryId: string;

    @Column({ nullable: true })
    discountId: string;

    @Field()
    @OneToOne(() => EntityCategory, category => category.categoryId)
    @Column({ nullable: true })
    entityCategoryId: string;

    @Field(() => [Image], { nullable: true })
    @OneToMany(() => Image, (image: Image) => image.product)
    images: Image[];

    @Field(() => Brand)
    @ManyToOne(() => Brand, brand => brand.id)
    brand: Brand

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}