import { Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { EmployeeEntity } from "./employee.entity";
import { EmployeeService } from "./employee.service";


@Resolver()
export class EmployeeResolver {
    constructor(private employeeService: EmployeeService) { }

    @Query(() => String)
    hello() {
        return "Hello World"
    }
}