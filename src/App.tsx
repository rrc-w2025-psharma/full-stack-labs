import { useState } from "react";
import { Header } from "./components/Header";
import { EmployeeDirectory } from "./components/EmployeeDirectory";
import { AddEmployeeForm } from "./components/AddEmployeeForm";
import { Footer } from "./components/Footer";

import employeesData from "./data/employees.json";
import type { Department, Employee } from "./types/Employee";

function App() {
    const [departments, setDepartments] =
        useState<Department[]>(employeesData);

    function addEmployee(employee: Employee, departmentName: string) {
        setDepartments((currentDepartments) =>
            currentDepartments.map((department) => {
                if (department.name === departmentName) {
                    return {
                        ...department,
                        employees: [...department.employees, employee],
                    };
                }

                return department;
            })
        );
    }

    return (
        <>
            <Header />

            <EmployeeDirectory departments={departments} />

            <AddEmployeeForm
                departments={departments}
                onAddEmployee={addEmployee}
            />

            <Footer />
        </>
    );
}

export default App;