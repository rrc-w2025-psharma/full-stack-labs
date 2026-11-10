import type { FormEvent } from "react";
import { useFormInput } from "../hooks/useFormInput";
import { organizationService } from "../services/organizationService";

interface AddRoleFormProps {
    onAddRole: () => void;
}

export function AddRoleForm({ onAddRole }: AddRoleFormProps) {
    const firstName = useFormInput();
    const lastName = useFormInput();
    const role = useFormInput();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const result = await organizationService.createRole({
                firstName: firstName.value,
                lastName: lastName.value,
                role: role.value,
            });

            firstName.validate(() => result.errors.firstName);
            lastName.validate(() => result.errors.lastName);
            role.validate(() => result.errors.role);

            if (!result.success) {
                return;
            }

            onAddRole();
            firstName.reset();
            lastName.reset();
            role.reset();
        } catch (error) {
            console.error("Failed to create role:", error);
            role.validate(() => [
                "Unable to save role. Check the backend connection."
            ]);
        }
    }

    return (
        <section>
            <h2>Add Organization Role</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="roleFirstName">
                        First Name:
                    </label>

                    <input
                        id="roleFirstName"
                        type="text"
                        value={firstName.value}
                        onChange={(event) =>
                            firstName.setValue(event.target.value)
                        }
                    />

                    {firstName.messages.map((message) => (
                        <p key={message}>{message}</p>
                    ))}
                </div>

                <div>
                    <label htmlFor="roleLastName">
                        Last Name:
                    </label>

                    <input
                        id="roleLastName"
                        type="text"
                        value={lastName.value}
                        onChange={(event) =>
                            lastName.setValue(event.target.value)
                        }
                    />

                    {lastName.messages.map((message) => (
                        <p key={message}>{message}</p>
                    ))}
                </div>

                <div>
                    <label htmlFor="roleName">
                        Role:
                    </label>

                    <input
                        id="roleName"
                        type="text"
                        value={role.value}
                        onChange={(event) =>
                            role.setValue(event.target.value)
                        }
                    />

                    {role.messages.map((message) => (
                        <p key={message}>{message}</p>
                    ))}
                </div>

                <button type="submit">Add Role</button>
            </form>
        </section>
    );
}