import type { Department } from "../types/Employee";

interface EmployeeDirectoryProps {
    departments: Department[];
}

export function EmployeeDirectory({
    departments,
}: EmployeeDirectoryProps) {
    return (
        <main>
            {departments.map((department) => (
                <section key={department.name}>
                    <h2>{department.name}</h2>

                    <ul>
                        {department.employees.map((employee, index) => (
                            <li
                                key={
                                    employee.firstName +
                                    employee.lastName +
                                    index
                                }
                            >
                                {employee.firstName} {employee.lastName}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </main>
    );
}