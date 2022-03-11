import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./../images/image.entity"
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
    categoryId: string;

    @Column()
    inventoryId: string;

    @Field()
    @Column()
    price: number;

    @Column({ nullable: true })
    discountId: string;

    @OneToMany(() => Image, (image: Image) => image.product)
    images: Image[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}