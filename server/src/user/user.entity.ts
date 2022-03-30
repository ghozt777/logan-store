import { Field, ObjectType } from "@nestjs/graphql";
import { EntityCategory } from "src/category/category.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from "typeorm";
import { Address } from "../address/address.entity";
import { WishList } from "./wisthlist.entity";

@ObjectType()
@Entity('users')
export class User {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column({ unique: true })
    username: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true, unique: true })
    cartId: number;

    @Column({ nullable: true, default: 0 })
    tokenVersion: number;

    @Field(() => Address, { nullable: true })
    @OneToMany(() => Address, address => address.user)
    address: Address[];

    @Field()
    @OneToOne(() => EntityCategory, category => category.categoryId, { nullable: true })
    @Column()
    categoryId: string;

    @Field()
    @OneToOne(() => WishList, wishlist => wishlist.userId)
    @Column({ nullable: true })
    wishlistId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}