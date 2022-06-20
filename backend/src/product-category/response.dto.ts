import { Field, ObjectType } from "@nestjs/graphql";
import { Errors } from "src/user/types/errors.type";

@ObjectType()
export class GenericResponse {
    @Field(() => [Errors])
    errors: Errors[];

    @Field()
    success: boolean;

    @Field()
    msg: string;
}