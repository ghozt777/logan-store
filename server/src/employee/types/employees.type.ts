import { EmployeeEntity } from "../employee.entity";

export type EmployeesResponseType = {
    employees : EmployeeEntity[] ;
    statusCode : number ;
    success: boolean ;
}