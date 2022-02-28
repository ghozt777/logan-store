import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ nullable: true , default: 0 })
    tokenVersion: number;

}