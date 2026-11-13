import { prisma } from "../lib/prisma.js";
import type { Department, Employee } from "../types/Employee.js";

export const employeeRepo = {
  async getDepartments(): Promise<Department[]> {
    return prisma.department.findMany({
      select: {
        name: true,
        employees: {
          select: {
            firstName: true,
            lastName: true,
          },
          orderBy: { id: "asc" },
        },
      },
      orderBy: { id: "asc" },
    });
  },

  async createEmployee(
    employee: Employee,
    departmentName: string
  ): Promise<Department[]> {
    const department = await prisma.department.findUnique({
      where: { name: departmentName },
    });

    if (!department) {
      throw new Error("Department not found");
    }

    await prisma.employee.create({
      data: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        departmentId: department.id,
      },
    });

    return this.getDepartments();
  },
};
