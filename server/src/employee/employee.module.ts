import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "./employee.entity";
import { EmployeeResolver } from "./employee.resolver";
import { EmployeeService } from "./employee.service";

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity])],
    providers: [EmployeeResolver, EmployeeService],
})
export class EmployeeModule { }