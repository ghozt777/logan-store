import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}