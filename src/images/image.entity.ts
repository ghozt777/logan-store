import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "../product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('images')
export class Image {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ unique: true })
    url: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    owner: string;

    @ManyToOne(type => Product, (product: Product) => product.images)
    @JoinColumn()
    product: Product;
}