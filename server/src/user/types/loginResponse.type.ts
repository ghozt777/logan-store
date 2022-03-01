import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    accessToken: string;
    // errors: any[];
}