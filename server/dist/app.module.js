"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const product_module_1 = require("./product/product.module");
const image_module_1 = require("./images/image.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({
                isGlobal: true
            }),
            config_1.ConfigModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                context: async ({ req, res }) => {
                    var _a;
                    return {
                        req,
                        res,
                        headers: req.headers,
                        cookies: (_a = req.cookies) !== null && _a !== void 0 ? _a : []
                    };
                },
                cors: { origin: true, credentials: true }
            }),
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            product_module_1.ProductModule,
            image_module_1.ImageModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map