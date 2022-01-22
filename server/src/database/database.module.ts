import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv'
dotenv.config();

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: `${process.env.DB_HOST}`,
        port: parseInt(process.env.DB_PORT),
        username: `${process.env.DB_USERNAME}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_DATABASE}`,
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
        logging: true
    }),],
    controllers: [],
    providers: [],
})
export class DatabaseModule { }