import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "src/category/category.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from "typeorm";
import { Address } from "../address/address.entity";

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
    @OneToOne(() => Category, category => category.categoryId, { nullable: true })
    @Column()
    categoryId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}