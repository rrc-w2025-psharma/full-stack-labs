import { useState } from "react";
import type { Department, Employee } from "../types/Employee";

interface AddEmployeeFormProps {
    departments: Department[];
    onAddEmployee: (
        employee: Employee,
        departmentName: string
    ) => void;
}

export function AddEmployeeForm({
    departments,
    onAddEmployee,
}: AddEmployeeFormProps) {
    const [firstName, setFirstName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Clear previous validation messages
        setErrors([]);

        const newErrors: string[] = [];

        if (firstName.trim().length < 3) {
            newErrors.push(
                "First name must be at least 3 characters."
            );
        }

        if (!departmentName) {
            newErrors.push("Please select a department.");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        onAddEmployee(
            {
                firstName: firstName.trim(),
            },
            departmentName
        );

        setFirstName("");
        setDepartmentName("");
    }

    return (
        <section>
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">
                        First Name:
                    </label>

                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(event) =>
                            setFirstName(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="department">
                        Department:
                    </label>

                    <select
                        id="department"
                        value={departmentName}
                        onChange={(event) =>
                            setDepartmentName(event.target.value)
                        }
                    >
                        <option value="">
                            Select a department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department.name}
                                value={department.name}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                {errors.length > 0 && (
                    <ul>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}

                <button type="submit">
                    Add Employee
                </button>
            </form>
        </section>
    );
}