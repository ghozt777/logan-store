import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'reflect-metadata'

async function bootstrap() {
  console.log('debug: ', process.env.DB_HOST);
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT || 5001);
  console.log(`server is running -> http://${process.env.HOST}:${process.env.PORT}/graphql`)
}
bootstrap();
