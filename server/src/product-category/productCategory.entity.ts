import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('productCategory')
export class ProductCategory {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true })
    name: string;

    @Field(() => [ProductCategory], { nullable: true })
    @ManyToMany(() => ProductCategory, productCategory => productCategory.id, { nullable: true })
    subCategories: [ProductCategory]
}