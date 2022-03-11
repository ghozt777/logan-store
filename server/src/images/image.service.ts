import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { __prod__ } from "src/config";
import { Repository } from "typeorm";
import { Image } from "./image.entity";

@Injectable()
export class ImageService{
    constructor(
        @InjectRepository(Image) private imageRepository : Repository<Image> 
    ){}

    async addImage(url : string , name: string){
        let response = false ;
        try{
            const res = await this.imageRepository.save({
                url ,
                name 
            })
            response = true ;
            console.log(res) ;
        }catch(er){
            console.error(er) ;
        }
        return response ;
    }
    async getImages(){  
        if(!__prod__){
            const images = await this.imageRepository.find({});
            return{
                images ,
                message: "" 
            }
        }
        else return {
            images: [] ,
            message : "this query is only available for testing not for prod"
        }
    }
}