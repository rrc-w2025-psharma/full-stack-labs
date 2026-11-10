import employeesData from "../data/employees.json" with { type: "json" };
import type { Department, Employee } from "../types/Employee.js";

let departments: Department[] = structuredClone(employeesData);

export const employeeRepo = {
  getDepartments(): Department[] {
    return structuredClone(departments);
  },

  createEmployee(
    employee: Employee,
    departmentName: string
  ): Department[] {
    departments = departments.map((department) => {
      if (department.name === departmentName) {
        return {
          ...department,
          employees: [...department.employees, employee],
        };
      }

      return department;
    });

    return this.getDepartments();
  },
};
