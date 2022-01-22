import { HelloResponse } from "./types/helloResponse.type";
import { Repository } from "typeorm";
import { EmployeeEntity } from "./employee.entity";
import { EmployeesResponseType } from "./types/employees.type";
import { EmployeeResponseType } from "./types/employee.type";
export declare class EmployeeService {
    private employeeRepository;
    constructor(employeeRepository: Repository<EmployeeEntity>);
    createHelloResponse(): HelloResponse;
    queryAllEmployees(): Promise<EmployeesResponseType>;
    querySpecificEmployee(id: number): Promise<EmployeeResponseType>;
    getManager(): Promise<void>;
}
