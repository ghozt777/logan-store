import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@ObjectType()
@Entity('productVariants')
export class ProductVariants {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column()
    property: string;

    @Field(() => [Variants])
    @OneToMany(() => Variants, (v: Variants) => v.productVariants)
    variants: Variants[]

    @OneToOne(() => Product, (p: Product) => p.variants)
    product: Product;
}

@ObjectType()
@Entity('variants')
export class Variants {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ nullable: false })
    variantName: string;

    @Field()
    @Column({ default: 0, nullable: false })
    priceIncement: number;

    @ManyToOne(() => ProductVariants, (pv: ProductVariants) => pv.variants)
    productVariants: ProductVariants
}