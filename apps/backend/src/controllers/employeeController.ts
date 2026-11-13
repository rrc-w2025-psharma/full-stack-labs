import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService.js";

export const employeeController = {
  async getDepartments(_req: Request, res: Response): Promise<void> {
    try {
      const departments = await employeeService.getDepartments();
      res.status(200).json(departments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to load departments." });
    }
  },

  async createEmployee(req: Request, res: Response): Promise<void> {
    const { employee, departmentName } = req.body ?? {};

    if (!employee || typeof employee !== "object" ||
        Array.isArray(employee) || typeof departmentName !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid employee or department data.",
      });
      return;
    }

    try {
      const result = await employeeService.createEmployee(
        employee,
        departmentName
      );

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create employee." });
    }
  },
};
