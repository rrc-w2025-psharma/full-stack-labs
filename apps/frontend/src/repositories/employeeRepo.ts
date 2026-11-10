import type { Department, Employee } from "../types/Employee";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export interface CreateEmployeeResult {
  success: boolean;
  errors: {
    firstName: string[];
    department: string[];
  };
  departments?: Department[];
}

export const employeeRepo = {
  async getDepartments(): Promise<Department[]> {
    const response = await fetch(`${API_URL}/api/departments`);

    if (!response.ok) {
      throw new Error("Failed to fetch departments.");
    }

    return response.json();
  },

  async createEmployee(
    employee: Employee,
    departmentName: string
  ): Promise<CreateEmployeeResult> {
    const response = await fetch(`${API_URL}/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee, departmentName }),
    });

    const result: CreateEmployeeResult = await response.json();

    if (!response.ok && response.status !== 400) {
      throw new Error("Failed to create employee.");
    }

    return result;
  },
};
