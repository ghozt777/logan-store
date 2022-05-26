import { Field, ObjectType } from "@nestjs/graphql";
import { fieldInfoOfKey } from "@urql/exchange-graphcache/dist/types/store";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@ObjectType()
@Entity('inventory')
export class Inventory {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    inventoryId: string;

    @Field()
    @Column({ unique: true })
    skuCode: string;

    @Field()
    @Column()
    price: number;

    @Field(() => String)
    @Column()
    currency: string;

    @Field(() => Product, { nullable: true })
    @OneToOne(() => Product, product => product.category, { nullable: true })
    product: Product;

    @Field()
    @Column({ default: 0 })
    stock: number;

    @Field()
    @Column({ default: -1 })
    maxNumberOfUnitsPerCustomer: number
}