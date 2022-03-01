import { Field, ObjectType } from "@nestjs/graphql";

// type Errors = {
//     field: string;
//     message: string;
// }

@ObjectType()
class Errors {
    @Field(() => String)
    field: string;

    @Field(() => String)
    message: string;
}

@ObjectType()
export class UserCreationResponse {
    @Field(() => [Errors])
    errors: Errors[];

    @Field()
    message: string;
}