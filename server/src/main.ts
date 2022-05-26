import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'reflect-metadata'
import * as dotenv from 'dotenv'
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT || 5001);
  console.log(`server is running -> http://${process.env.HOST}:${process.env.PORT}/graphql`)
}
bootstrap();
