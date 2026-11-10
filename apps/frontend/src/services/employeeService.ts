import { employeeRepo } from "../repositories/employeeRepo";
import type { Employee } from "../types/Employee";

export const employeeService = {
  async createEmployee(employee: Employee, departmentName: string) {
    return employeeRepo.createEmployee(employee, departmentName);
  },
};
