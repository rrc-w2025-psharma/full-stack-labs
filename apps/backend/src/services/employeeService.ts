import { employeeRepo } from "../repositories/employeeRepo.js";
import type { Employee, Department } from "../types/Employee.js";

interface CreateEmployeeResult {
  success: boolean;
  errors: {
    firstName: string[];
    department: string[];
  };
  departments?: Department[];
}

export const employeeService = {
  async getDepartments(): Promise<Department[]> {
    return employeeRepo.getDepartments();
  },

  async createEmployee(
    employee: Employee,
    departmentName: string
  ): Promise<CreateEmployeeResult> {
    const errors = {
      firstName: [] as string[],
      department: [] as string[],
    };

    if (
      typeof employee?.firstName !== "string" ||
      employee.firstName.trim().length < 3
    ) {
      errors.firstName.push("First name must be at least 3 characters.");
    }

    const departments = await employeeRepo.getDepartments();

    const departmentExists = departments.some(
      (department) => department.name === departmentName
    );

    if (!departmentExists) {
      errors.department.push("Please select a valid department.");
    }

    if (errors.firstName.length || errors.department.length) {
      return { success: false, errors };
    }

    const updatedDepartments = await employeeRepo.createEmployee(
      {
        firstName: employee.firstName.trim(),
        lastName: employee.lastName,
      },
      departmentName
    );

    return {
      success: true,
      errors,
      departments: updatedDepartments,
    };
  },
};
