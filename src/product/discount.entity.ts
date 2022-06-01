import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('discounts')
export class DisCount {

    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    discountId: string;

    @Field(() => String)
    @Column({ unique: true })
    code: string;

    @Field()
    @Column()
    discountPercentage: number;
}