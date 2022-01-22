import { EmployeeService } from "./employee.service";
export declare class EmployeeResolver {
    private employeeService;
    constructor(employeeService: EmployeeService);
    hello(): string;
}
