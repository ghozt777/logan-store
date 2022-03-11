import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Auth = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const GQLContext = GqlExecutionContext.create(ctx);
        const authToken = GQLContext.getContext().req.headers["authorization"]
        console.log("auth token : ", authToken );
        if (authToken) return true;
        return false;
    },
);