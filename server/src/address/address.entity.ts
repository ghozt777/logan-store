import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@ObjectType()
@Entity('address')
export class Address {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User, user => user.address, { nullable: true })
    user: User;

    @Field()
    @Column()
    addressLine1: string;

    @Field()
    @Column({ nullable: true })
    addressLine2: string;

    @Field()
    @Column()
    city: string;

    @Field()
    @Column()
    zipcode: string;

    @Field()
    @Column()
    country: string;

    @Field(() => Float)
    @Column({ type: 'bigint' })
    mobile: BigInt;
}


