import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('entityCategory')
export class EntityCategory {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Field(() => String)
    @Column({ unique: true })
    categoryName: string;

}