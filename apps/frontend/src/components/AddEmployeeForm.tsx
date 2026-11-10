import type { FormEvent } from "react";
import type { Department } from "../types/Employee";
import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";

interface AddEmployeeFormProps {
    departments: Department[];
    onAddEmployee: () => void;
}

export function AddEmployeeForm({
    departments,
    onAddEmployee,
}: AddEmployeeFormProps) {
    const firstName = useFormInput();
    const departmentName = useFormInput();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const result = await employeeService.createEmployee(
                { firstName: firstName.value },
                departmentName.value
            );

            firstName.validate(() => result.errors.firstName);
            departmentName.validate(() => result.errors.department);

            if (!result.success) {
                return;
            }

            onAddEmployee();
            firstName.reset();
            departmentName.reset();
        } catch (error) {
            console.error("Failed to create employee:", error);
            firstName.validate(() => [
                "Unable to save employee. Check the backend connection."
            ]);
        }
    }

    return (
        <section>
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>

                    <input
                        id="firstName"
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
                    <label htmlFor="department">Department:</label>

                    <select
                        id="department"
                        value={departmentName.value}
                        onChange={(event) =>
                            departmentName.setValue(event.target.value)
                        }
                    >
                        <option value="">Select a department</option>

                        {departments.map((department) => (
                            <option
                                key={department.name}
                                value={department.name}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>

                    {departmentName.messages.map((message) => (
                        <p key={message}>{message}</p>
                    ))}
                </div>

                <button type="submit">Add Employee</button>
            </form>
        </section>
    );
}