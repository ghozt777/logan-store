import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot() ,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: async ({ req, res }) => {

        return { 
          req, 
          res , 
          headers : req.headers  ,
  
        }
      },
      cors: { origin: true, credentials: true }
    }),
    ClientsModule.register([
      {
        name: 'logan-store',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        }
      },
    ]),
    DatabaseModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
