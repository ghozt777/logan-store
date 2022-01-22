"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const typeorm_2 = require("@nestjs/typeorm");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    createHelloResponse() {
        return {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            msg: "Hello From /employee"
        };
    }
    async queryAllEmployees() {
        const result = await this.employeeRepository.query(`SELECT * FROM employee_entity`);
        return {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            employees: result !== null && result !== void 0 ? result : []
        };
    }
    async querySpecificEmployee(id) {
        const result = await this.employeeRepository.findOne({ emp_id: id });
        return {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            employee: result !== null && result !== void 0 ? result : null
        };
    }
    async getManager() {
        const query = `SELECT branch.branch_name as branch, 
        concat(employee.first_name, ' ' , employee.last_name) as manager from branch 
        join employee`;
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(employee_entity_1.EmployeeEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map