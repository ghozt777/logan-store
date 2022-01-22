import { EmployeeEntity } from "../employee.entity";
export declare type EmployeeResponseType = {
    employee: EmployeeEntity;
    statusCode: number;
    success: boolean;
};
