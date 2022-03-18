"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("../config");
const typeorm_2 = require("typeorm");
const image_entity_1 = require("./image.entity");
let ImageService = class ImageService {
    constructor(imageRepository) {
        this.imageRepository = imageRepository;
    }
    async addImage(url, name) {
        let response = false;
        try {
            const res = await this.imageRepository.save({
                url,
                name
            });
            response = true;
            console.log(res);
        }
        catch (er) {
            console.error(er);
        }
        return response;
    }
    async getImages() {
        if (!config_1.__prod__) {
            const images = await this.imageRepository.find({});
            return {
                images,
                message: ""
            };
        }
        else
            return {
                images: [],
                message: "this query is only available for testing not for prod"
            };
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map