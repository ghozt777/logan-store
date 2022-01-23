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
const argon2 = require("argon2");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let LoginResponse = class LoginResponse {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
LoginResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoginResponse);
let UserResolver = class UserResolver {
    constructor(userService, userRepository, cacheManager) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
    }
    hello() {
        return 'Hello From User';
    }
    checkAuth(req) {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(' ')[1];
            const { user } = this.userService.isValid(token);
            console.log("User: ", user);
            return 'auth passed';
        }
        return 'auth failed';
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
    async login(res, usernameOrEmail, password) {
        const isEmail = usernameOrEmail.includes('@');
        const entityManager = (0, typeorm_2.getManager)();
        const queryString = `SELECT * FROM users
        WHERE ${isEmail ? `email='${usernameOrEmail}'` : `username='${usernameOrEmail}'`}`;
        const user = await entityManager.query(queryString);
        if (Array.isArray(user) && user[0]) {
            const isPasswordValid = await argon2.verify(user[0].password, password);
            if (!isPasswordValid)
                throw new Error('invalid credentails');
            const accessToken = this.userService.createAccessToken(user[0]);
            const refreshToken = this.userService.createRefreshToken(user[0]);
            res.cookie('jid', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
            });
            return {
                accessToken: accessToken
            };
        }
        else
            throw new Error('invalid credentails');
    }
    async forgotPassword(email) {
        const entityManager = (0, typeorm_2.getManager)();
        const user = await entityManager.query(`SELECT * FROM users WHERE email='${email}'`);
        if (user && user[0]) {
            const token = (0, uuid_1.v4)();
            const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`;
            await this.userService.sendEmail(user[0].email, html);
            await this.cacheManager.set(process.env.FORGOT_PASSWORD_PREFIX + token, user[0].id);
        }
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "hello", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "checkAuth", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: "username", type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: "email", type: () => String })),
    __param(2, (0, graphql_1.Args)({ name: "password", type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => LoginResponse),
    __param(0, (0, graphql_1.Context)('res')),
    __param(1, (0, graphql_1.Args)({ name: 'usernameOrEmail', type: () => String })),
    __param(2, (0, graphql_1.Args)({ name: 'password', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'email', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
UserResolver = __decorate([
    (0, graphql_2.Resolver)(() => user_entity_1.User),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_service_1.UserService, typeorm_2.Repository, Object])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map