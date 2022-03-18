import { ImageService } from "./image.service";
import { ImageResponse } from "./type/image.response.type";
export declare class ImageResolver {
    private imageService;
    constructor(imageService: ImageService);
    addImage(url: string, name: string): Promise<Boolean>;
    getImages(): Promise<ImageResponse>;
}
