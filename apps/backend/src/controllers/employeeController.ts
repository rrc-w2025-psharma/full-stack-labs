
import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService.js";

export const employeeController = {
  getDepartments(_req: Request, res: Response): void {
    const departments = employeeService.getDepartments();
    res.status(200).json(departments);
  },

  createEmployee(req: Request, res: Response): void {
    const { employee, departmentName } = req.body ?? {};

    if (
      !employee ||
      typeof employee !== "object" ||
      Array.isArray(employee) ||
      typeof departmentName !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid employee or department data.",
      });
      return;
    }

    const result = employeeService.createEmployee(
      employee,
      departmentName
    );

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);
  },
};
