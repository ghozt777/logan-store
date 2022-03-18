"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.Auth = (0, common_1.createParamDecorator)((_, ctx) => {
    const GQLContext = graphql_1.GqlExecutionContext.create(ctx);
    const authToken = GQLContext.getContext().req.headers["authorization"];
    console.log("auth token : ", authToken);
    if (authToken)
        return true;
    return false;
});
//# sourceMappingURL=auth.decorator.js.map