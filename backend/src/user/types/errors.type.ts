import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Errors {
    @Field(() => String)
    field: string;

    @Field(() => String)
    message: string;
}