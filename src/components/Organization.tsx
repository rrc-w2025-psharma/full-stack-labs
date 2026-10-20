import { useState } from "react";
import { organizationRepo } from "../repositories/organizationRepo";
import { AddRoleForm } from "./AddRoleForm";
import type { Role } from "../types/Role";

export function Organization() {
    const [roles, setRoles] = useState<Role[]>(
        () => organizationRepo.getRoles()
    );

    function refreshRoles() {
        setRoles(organizationRepo.getRoles());
    }

    return (
        <main className="organization">
            <h2>Organization</h2>

            <div className="organization-list">
                {roles.map((person) => (
                    <div
                        className="organization-row"
                        key={person.role}
                    >
                        <span>
                            {person.firstName} {person.lastName}
                        </span>

                        <span>{person.role}</span>
                    </div>
                ))}
            </div>

            <AddRoleForm onAddRole={refreshRoles} />
        </main>
    );
}