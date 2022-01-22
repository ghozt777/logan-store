import { EmployeeEntity } from "../employee.entity";

export type EmployeeResponseType = {
    employee: EmployeeEntity;
    statusCode: number;
    success: boolean;
}