import { organizationRepo } from "../repositories/organizationRepo.js";
import type { Role } from "../types/Role.js";

interface CreateRoleResult {
  success: boolean;
  errors: {
    firstName: string[];
    lastName: string[];
    role: string[];
  };
}

export const organizationService = {
  async getRoles(): Promise<Role[]> {
    return organizationRepo.getRoles();
  },

  async createRole(person: Role): Promise<CreateRoleResult> {
    const errors = {
      firstName: [] as string[],
      lastName: [] as string[],
      role: [] as string[],
    };

    if (typeof person?.firstName !== "string" ||
        person.firstName.trim().length < 3) {
      errors.firstName.push("First name must be at least 3 characters.");
    }

    if (typeof person?.lastName !== "string" ||
        !person.lastName.trim()) {
      errors.lastName.push("Last name is required.");
    }

    if (typeof person?.role !== "string" ||
        !person.role.trim()) {
      errors.role.push("Role is required.");
    }

    const existingRoles = await organizationRepo.getRoles();

    if (typeof person?.role === "string") {
      const roleOccupied = existingRoles.some(
        (existingPerson) =>
          existingPerson.role.toLowerCase() ===
          person.role.trim().toLowerCase()
      );

      if (roleOccupied) {
        errors.role.push("This role is already occupied.");
      }
    }

    if (errors.firstName.length ||
        errors.lastName.length ||
        errors.role.length) {
      return { success: false, errors };
    }

    await organizationRepo.createRole({
      firstName: person.firstName.trim(),
      lastName: person.lastName.trim(),
      role: person.role.trim(),
    });

    return { success: true, errors };
  },
};
