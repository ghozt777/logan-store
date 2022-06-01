import { Field, ObjectType } from "@nestjs/graphql";
import { Image } from "../image.entity";

@ObjectType()
export class ImageResponse{
    @Field(() => [Image])
    images: Image[] ;

    @Field()
    message : string;
}