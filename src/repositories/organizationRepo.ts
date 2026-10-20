import { roles } from "../data/roles";
import type { Role } from "../types/Role";

let organizationRecords: Role[] = structuredClone(roles);

export const organizationRepo = {
    getRoles(): Role[] {
        return structuredClone(organizationRecords);
    },

    createRole(person: Role): Role[] {
        organizationRecords = [...organizationRecords, person];

        return this.getRoles();
    },

    updateRole(oldRole: string, updatedPerson: Role): Role[] {
        organizationRecords = organizationRecords.map((person) =>
            person.role === oldRole ? updatedPerson : person
        );

        return this.getRoles();
    },

    deleteRole(roleName: string): Role[] {
        organizationRecords = organizationRecords.filter(
            (person) => person.role !== roleName
        );

        return this.getRoles();
    },
};