import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/product.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@ObjectType()
@Entity('wishlists')
export class WishList {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    wishlistId: string;

    @OneToOne(() => User, user => user.wishlistId)
    @Column()
    userId: string;

    @OneToOne(() => Product, product => product.productId)
    @Column()
    productId: string;

}
