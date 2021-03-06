import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ImageModule } from './images/image.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './entity-category/category.module';
import { ProductCategoryModule } from './product-category/productCategory.module';
import { __prod__ } from './config';


@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: async ({ req, res }) => {
        return {
          req,
          res,
          headers: req.headers,
          cookies: req.cookies ?? []
        }
      },
      cors: { origin: true, credentials: true },
      playground: !__prod__, // security purposes -> read : https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground/
      introspection: !__prod__ // security purposes -> read : https://hasura.io/learn/graphql/intro-graphql/introspection/
    }),
    DatabaseModule,
    UserModule,
    ProductModule,
    ImageModule,
    AddressModule,
    CategoryModule,
    ProductCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
