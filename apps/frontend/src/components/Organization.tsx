import { useEffect, useState } from "react";
import { organizationRepo } from "../repositories/organizationRepo";
import { AddRoleForm } from "./AddRoleForm";
import type { Role } from "../types/Role";

export function Organization() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState("");

  async function refreshRoles() {
    try {
      const data = await organizationRepo.getRoles();
      setRoles(data);
      setError("");
    } catch (error) {
      console.error("Failed to load roles:", error);
      setError("Unable to load organization roles.");
    }
  }

  useEffect(() => {
    void organizationRepo.getRoles()
      .then((data) => {
        setRoles(data);
        setError("");
      })
      .catch((error: unknown) => {
        console.error("Failed to load roles:", error);
        setError("Unable to load organization roles.");
      });
  }, []);

  return (
    <main className="organization">
      <h2>Organization</h2>

      {error && <p role="alert">{error}</p>}

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

      <AddRoleForm onAddRole={() => void refreshRoles()} />
    </main>
  );
}
