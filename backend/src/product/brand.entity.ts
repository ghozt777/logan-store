import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@ObjectType()
@Entity('brands')
export class Brand {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ unique: true })
    name: string;

    @Field(() => String)
    @Column()
    brandLogo: string;

    @Field(() => Product, { nullable: true })
    @OneToMany(() => Product, p => p.brand, { nullable: true })
    product: Product

}