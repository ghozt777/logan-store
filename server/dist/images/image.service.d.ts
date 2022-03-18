import { Repository } from "typeorm";
import { Image } from "./image.entity";
export declare class ImageService {
    private imageRepository;
    constructor(imageRepository: Repository<Image>);
    addImage(url: string, name: string): Promise<boolean>;
    getImages(): Promise<{
        images: Image[];
        message: string;
    }>;
}
