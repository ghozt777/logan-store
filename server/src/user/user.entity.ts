import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";



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

    @Field()
    @Column({ nullable: true })
    addressLine1: string;

    @Field()
    @Column({ nullable: true })
    addressLine2: string;

    @Field()
    @Column({ nullable: true })
    city: string;

    @Field()
    @Column({ nullable: true })
    zipcode: number;

    @Field()
    @Column({ nullable: true })
    country: string;

    @Field()
    @Column({ nullable: true })
    mobile: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}