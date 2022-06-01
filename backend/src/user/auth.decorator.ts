import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken'

export const Auth = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const GQLContext = GqlExecutionContext.create(ctx);
        const authToken = GQLContext.getContext().req.headers["authorization"]
        if (authToken) {
            console.log("auth token : ", authToken);
            const isOk = jwt.verify(authToken, process.env.JWT_SECRET);
            if (isOk) return true;
            return false;
        }
        else return false;
    },
);