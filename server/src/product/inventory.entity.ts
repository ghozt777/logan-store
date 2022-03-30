import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@ObjectType()
class Currency {
    @Field()
    currency: "USD" | "INR"
}

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

    @Field(() => Currency)
    @Column()
    currency: string;

    @Field()
    @OneToOne(() => Product, product => product.productId)
    productId: string;

    @Field()
    @Column({ default: 0 })
    stock: number;
}