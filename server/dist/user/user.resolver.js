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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService, userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }
    hello() {
        return 'Hello From User';
    }
    async register(username, email, password) {
        const payload = await this.userService.createUserPayload({ username, password, email });
        let isOk = false;
        if (payload) {
            const { username, password, email } = payload;
            try {
                await this.userRepository.insert({
                    username: username,
                    email: email,
                    password: password
                });
                isOk = true;
            }
            catch (err) {
                console.error("USER CREATION FALIURE", err);
            }
            finally {
                return isOk;
            }
        }
        return false;
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "hello", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "username", type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: "email", type: () => String })),
    __param(2, (0, graphql_1.Args)({ name: "password", type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    (0, graphql_2.Resolver)(() => user_entity_1.User),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService, typeorm_2.Repository])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map