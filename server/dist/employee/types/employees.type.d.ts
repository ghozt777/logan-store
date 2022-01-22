import { EmployeeEntity } from "../employee.entity";
export declare type EmployeesResponseType = {
    employees: EmployeeEntity[];
    statusCode: number;
    success: boolean;
};
