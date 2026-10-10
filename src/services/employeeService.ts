import { employeeRepo } from "../repositories/employeeRepo";
import type { Employee, Department } from "../types/Employee";

interface CreateEmployeeResult {
    success: boolean;
    errors: {
        firstName: string[];
        department: string[];
    };
    departments?: Department[];
}

export const employeeService = {
    createEmployee(
        employee: Employee,
        departmentName: string
    ): CreateEmployeeResult {
        const errors = {
            firstName: [] as string[],
            department: [] as string[],
        };

        if (employee.firstName.trim().length < 3) {
            errors.firstName.push(
                "First name must be at least 3 characters."
            );
        }

        const departments = employeeRepo.getDepartments();

        const departmentExists = departments.some(
            (department) => department.name === departmentName
        );

        if (!departmentExists) {
            errors.department.push(
                "Please select a valid department."
            );
        }

        if (
            errors.firstName.length > 0 ||
            errors.department.length > 0
        ) {
            return {
                success: false,
                errors,
            };
        }

        const updatedDepartments = employeeRepo.createEmployee(
            { ...employee, firstName: employee.firstName.trim() },
            departmentName
        );

        return {
            success: true,
            errors,
            departments: updatedDepartments,
        };
    },
};