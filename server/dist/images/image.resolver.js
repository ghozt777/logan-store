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
exports.ImageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const image_service_1 = require("./image.service");
const image_entity_1 = require("./image.entity");
const image_response_type_1 = require("./type/image.response.type");
let ImageResolver = class ImageResolver {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async addImage(url, name) {
        const response = await this.imageService.addImage(url, name);
        return response;
    }
    async getImages() {
        const response = await this.imageService.getImages();
        return response;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'url', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'name', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ImageResolver.prototype, "addImage", null);
__decorate([
    (0, graphql_1.Query)(() => image_response_type_1.ImageResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageResolver.prototype, "getImages", null);
ImageResolver = __decorate([
    (0, graphql_1.Resolver)(() => image_entity_1.Image),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], ImageResolver);
exports.ImageResolver = ImageResolver;
//# sourceMappingURL=image.resolver.js.map