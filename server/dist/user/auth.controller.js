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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const user_service_1 = require("./user.service");
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async handleRefreshToken(req, res) {
        const token = req.cookies.jid;
        if (!token) {
            return {
                statsusCode: common_1.HttpStatus.UNAUTHORIZED,
                success: false,
                msg: "Invalid Token",
                accessToken: ""
            };
        }
        let payload = null;
        try {
            payload = jwt.verify(token, process.env.JWT_COOKIE_SECRET);
        }
        catch (err) {
            console.error('Error while token verification', err);
            return {
                statsusCode: common_1.HttpStatus.UNAUTHORIZED,
                success: false,
                msg: "Invalid Token" + err.message,
                accessToken: ""
            };
        }
        const entityManager = (0, typeorm_1.getManager)();
        const queryString = `SELECT * FROM users where id='${payload.id}'`;
        const user = await entityManager.query(queryString);
        if (user && user[0]) {
            if (payload.tokenVersion != user[0].tokenVersion) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                    statsusCode: common_1.HttpStatus.UNAUTHORIZED,
                    success: false,
                    msg: "Invalid Token",
                    accessToken: ""
                });
            }
            const accessToken = jwt.sign({
                id: user[0].id
            }, process.env.JWT_SECRET, {
                expiresIn: '15m'
            });
            const refreshToken = this.userService.createRefreshToken(user[0]);
            console.log('refresh token generated: ', refreshToken);
            return res.cookie('jid', refreshToken).status(201).json({
                statsusCode: common_1.HttpStatus.CREATED,
                success: true,
                msg: "Token creation successful",
                accessToken: accessToken
            });
        }
        return {
            statsusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
            success: false,
            msg: "Unhandled Error",
            accessToken: ""
        };
    }
    async revoke(body) {
        this.userService.revokeRefreshTokenForUser(body.id);
        return true;
    }
};
__decorate([
    (0, common_1.Post)('/refresh_token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleRefreshToken", null);
__decorate([
    (0, common_1.Post)('/revoke'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revoke", null);
AuthController = __decorate([
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map