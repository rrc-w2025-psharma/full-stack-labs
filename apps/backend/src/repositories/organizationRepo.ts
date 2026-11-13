import { prisma } from "../lib/prisma.js";
import type { Role } from "../types/Role.js";

export const organizationRepo = {
  async getRoles(): Promise<Role[]> {
    return prisma.role.findMany({
      select: {
        firstName: true,
        lastName: true,
        role: true,
      },
      orderBy: { id: "asc" },
    });
  },

  async createRole(person: Role): Promise<Role[]> {
    await prisma.role.create({
      data: person,
    });

    return this.getRoles();
  },

  async updateRole(
    oldRole: string,
    updatedPerson: Role
  ): Promise<Role[]> {
    await prisma.role.update({
      where: { role: oldRole },
      data: updatedPerson,
    });

    return this.getRoles();
  },

  async deleteRole(roleName: string): Promise<Role[]> {
    await prisma.role.delete({
      where: { role: roleName },
    });

    return this.getRoles();
  },
};
