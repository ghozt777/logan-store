import { HttpStatus, Injectable } from "@nestjs/common";
import { HelloResponse } from "./types/helloResponse.type";
import { getManager, Repository } from "typeorm"
import { EmployeeEntity } from "./employee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeesResponseType } from "./types/employees.type";
import { EmployeeResponseType } from "./types/employee.type";

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>) { }
    createHelloResponse(): HelloResponse {
        return {
            statusCode: HttpStatus.OK,
            success: true,
            msg: "Hello From /employee"
        }
    }

    async queryAllEmployees(): Promise<EmployeesResponseType> {
        // const result = await this.employeeRepository.find();
        // same as the above code :
        const result = await this.employeeRepository.query(`SELECT * FROM employee_entity`);
        return {
            statusCode: HttpStatus.OK,
            success: true,
            employees: result ?? []
        };
    }

    async querySpecificEmployee(id: number): Promise<EmployeeResponseType> {
        const result = await this.employeeRepository.findOne({ emp_id: id })
        return {
            statusCode: HttpStatus.OK,
            success: true,
            employee: result ?? null
        };
    }

    async getManager() {
        const query = `SELECT branch.branch_name as branch, 
        concat(employee.first_name, ' ' , employee.last_name) as manager from branch 
        join employee`


    }


}