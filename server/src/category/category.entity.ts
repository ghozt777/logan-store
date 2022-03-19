import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('category')
export class Category {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Field(() => String)
    @Column({ unique: true })
    categoryName: string;

}