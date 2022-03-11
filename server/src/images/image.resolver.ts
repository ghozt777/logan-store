import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ImageService } from "./image.service";
import {Image} from "./image.entity"
import { ImageResponse } from "./type/image.response.type";

@Resolver(() => Image)
export class ImageResolver{
    constructor(
        private imageService : ImageService
    ){}
    
    @Mutation(() => Boolean)
    async addImage(
        @Args({name : 'url' , type : () => String}) url: string ,
        @Args({name : 'name' , type : () => String}) name: string ,
    ):Promise<Boolean>{
        const response = await this.imageService.addImage(url , name) ;
        return response ;
    }

    @Query(() => ImageResponse)
    async getImages(): Promise<ImageResponse>{
        const response = await this.imageService.getImages() ;
        return response ;
    }
}