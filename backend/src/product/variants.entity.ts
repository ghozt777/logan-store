import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@ObjectType()
@Entity('productVariants')
export class ProductVariants {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column()
    property: string;

    @Field(() => [VariantProps], { nullable: true })
    @OneToMany(() => VariantProps, (v: VariantProps) => v.productVariants, { nullable: true, cascade: true })
    @JoinColumn({ name: 'variantProps' })
    variantProps: VariantProps[]

    @OneToOne(() => Product, (p: Product) => p.variants, { nullable: true })
    product: Product;
}

@ObjectType()
@Entity('variantProps')
export class VariantProps {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ nullable: false })
    variantName: string;

    @Field()
    @Column({ default: 0, nullable: false })
    priceIncement: number;

    @ManyToOne(() => ProductVariants, (pv: ProductVariants) => pv.variantProps, { nullable: true })
    productVariants: ProductVariants
}