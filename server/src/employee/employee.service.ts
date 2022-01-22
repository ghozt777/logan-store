import { HttpStatus, Injectable } from "@nestjs/common";
import { getManager, Repository } from "typeorm"
import { EmployeeEntity } from "./employee.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>) { }

    async queryAllEmployees(): Promise<EmployeeEntity[]> {
        const result = await this.employeeRepository.query(`SELECT * FROM employee_entity`);
        return result;
    }

    async querySpecificEmployee(id: number): Promise<EmployeeEntity> {
        const result = await this.employeeRepository.findOne({ emp_id: id })
        return result;
    }

    async getManager() {
        const query = `SELECT branch.branch_name as branch, 
        concat(employee.first_name, ' ' , employee.last_name) as manager from branch 
        join employee`

        
    }


}