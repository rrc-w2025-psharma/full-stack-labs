import type { Role } from "../types/Role";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export interface CreateRoleResult {
  success: boolean;
  errors: {
    firstName: string[];
    lastName: string[];
    role: string[];
  };
}

export const organizationRepo = {
  async getRoles(): Promise<Role[]> {
    const response = await fetch(`${API_URL}/api/roles`);

    if (!response.ok) {
      throw new Error("Failed to fetch roles.");
    }

    return response.json();
  },

  async createRole(person: Role): Promise<CreateRoleResult> {
    const response = await fetch(`${API_URL}/api/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    const result: CreateRoleResult = await response.json();

    if (!response.ok && response.status !== 400) {
      throw new Error("Failed to create role.");
    }

    return result;
  },
};
