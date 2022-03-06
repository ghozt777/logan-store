import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "../product/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Injectable } from "@nestjs/common";

@ObjectType()
@Entity('image')
export class Image {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    url: string;

    @Field()
    @Column({ nullable: true })
    owner: string;

    @ManyToOne(type => Product, (product: Product) => product.images)
    product: Product;
}