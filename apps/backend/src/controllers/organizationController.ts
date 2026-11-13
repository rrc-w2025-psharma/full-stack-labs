import type { Request, Response } from "express";
import { organizationService } from "../services/organizationService.js";

export const organizationController = {
  async getRoles(_req: Request, res: Response): Promise<void> {
    try {
      const roles = await organizationService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to load roles." });
    }
  },

  async createRole(req: Request, res: Response): Promise<void> {
    const person = req.body;

    if (!person || typeof person !== "object" ||
        Array.isArray(person)) {
      res.status(400).json({
        success: false,
        message: "Invalid role data.",
      });
      return;
    }

    try {
      const result = await organizationService.createRole(person);

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create role." });
    }
  },
};
