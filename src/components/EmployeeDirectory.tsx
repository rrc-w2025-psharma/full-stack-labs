import employeesData from "../data/employees.json";
import type { Department } from "../types/Employee";

export function EmployeeDirectory() {
    const departments: Department[] = employeesData;

    return (
        <main>
            {departments.map((department) => (
                <section key={department.name}>
                    <h2>{department.name}</h2>

                    <ul>
                        {department.employees.map((employee) => (
                            <li key={employee.firstName + employee.lastName}>
                                {employee.firstName} {employee.lastName}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </main>
    );
}