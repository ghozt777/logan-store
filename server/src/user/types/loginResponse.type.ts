import { ObjectType, Field } from "@nestjs/graphql";
import { Errors } from "./errors.type";



@ObjectType()
export class LoginResponse {
    @Field(() => String)
    accessToken: string;

    @Field(() => [Errors])
    errors: Errors[]
}