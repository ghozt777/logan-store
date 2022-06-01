import { Field, ObjectType } from "@nestjs/graphql";
import { Errors } from "./errors.type";


@ObjectType()
export class UserCreationResponse {
    @Field(() => [Errors])
    errors: Errors[];

    @Field()
    message: string;
}