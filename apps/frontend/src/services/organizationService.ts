import { organizationRepo } from "../repositories/organizationRepo";
import type { Role } from "../types/Role";

export const organizationService = {
  async createRole(person: Role) {
    return organizationRepo.createRole(person);
  },
};
