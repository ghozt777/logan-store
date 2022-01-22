import { Repository } from "typeorm";
import { EmployeeEntity } from "./employee.entity";
export declare class EmployeeService {
    private employeeRepository;
    constructor(employeeRepository: Repository<EmployeeEntity>);
    queryAllEmployees(): Promise<EmployeeEntity[]>;
    querySpecificEmployee(id: number): Promise<EmployeeEntity>;
    getManager(): Promise<void>;
}
