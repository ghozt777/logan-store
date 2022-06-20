import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('productCategory')
export class ProductCategory {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true })
    name: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    imageUrl: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    categoryDescription: string;

    @Field(() => Product, { nullable: true })
    @OneToMany(() => Product, (product: Product) => product.category, { nullable: true })
    product: Product

    @ManyToMany(() => ProductSubCategory)
    @JoinTable()
    subCategory: ProductSubCategory[]
}

@ObjectType()
@Entity('productSubCategory')
export class ProductSubCategory {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column({ nullable: false, unique: true })
    subCategoryName: string;
}