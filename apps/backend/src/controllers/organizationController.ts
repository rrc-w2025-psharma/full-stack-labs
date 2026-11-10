import type { Request, Response } from "express";
import { organizationService } from "../services/organizationService.js";

export const organizationController = {
  getRoles(_req: Request, res: Response): void {
    const roles = organizationService.getRoles();
    res.status(200).json(roles);
  },

  createRole(req: Request, res: Response): void {
    const person = req.body;

    if (
      !person ||
      typeof person !== "object" ||
      Array.isArray(person)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid role data.",
      });
      return;
    }

    const result = organizationService.createRole(person);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);
  },
};
