import { EmployeeEntity } from "./employee.entity";
import { EmployeeService } from "./employee.service";
export declare class EmployeeResolver {
    private employeeService;
    constructor(employeeService: EmployeeService);
    hello(): string;
    getEmployees(): Promise<EmployeeEntity[]>;
}
