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
exports.ProductResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const logging_interceptor_1 = require("../user/logging.interceptor");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductResolver = class ProductResolver {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getProducts() {
        const products = await this.productRepository.query(`SELECT * FROM products`);
        return products;
    }
};
__decorate([
    (0, graphql_1.Query)(() => product_entity_1.Product),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProducts", null);
ProductResolver = __decorate([
    (0, common_1.UseInterceptors)(logging_interceptor_1.LoggingInterceptor),
    (0, graphql_1.Resolver)(() => product_entity_1.Product),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.resover.js.map