import { EmployeeService } from "./employee.service";
export declare class EmployeeController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    hello(): import("./types/helloResponse.type").HelloResponse;
    getAllEmployees(): Promise<import("./types/employees.type").EmployeesResponseType>;
    getSpecificEmployee(id: number): Promise<import("./types/employee.type").EmployeeResponseType>;
}
