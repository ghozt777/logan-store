import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class EmployeeEntity {
    @Field()
    @PrimaryGeneratedColumn()
    emp_id: number;

    @Field()
    @Column()
    first_name: string;

    @Field()
    @Column()
    last_name: string;

    @Field()
    @Column("date")
    birth_day: Date;

    @Field()
    @Column("varchar", { length: 1 })
    sex: string;

    @Field()
    @Column()
    salary: number;

    @Field()
    @Column({ nullable: true })
    super_id: number;

    @Field()
    @Column()
    branch_id: number;
}