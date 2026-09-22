import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Employees } from "./components/Employees";
import { Organization } from "./components/Organization";

import employeesData from "./data/employees.json";
import type { Department, Employee } from "./types/Employee";

function App() {
    const [departments, setDepartments] =
        useState<Department[]>(employeesData);

    function addEmployee(
        employee: Employee,
        departmentName: string
    ) {
        setDepartments((currentDepartments) =>
            currentDepartments.map((department) => {
                if (department.name === departmentName) {
                    return {
                        ...department,
                        employees: [
                            ...department.employees,
                            employee,
                        ],
                    };
                }

                return department;
            })
        );
    }

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    index
                    element={
                        <Employees
                            departments={departments}
                            onAddEmployee={addEmployee}
                        />
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <Employees
                            departments={departments}
                            onAddEmployee={addEmployee}
                        />
                    }
                />

                <Route
                    path="/organization"
                    element={<Organization />}
                />
            </Route>
        </Routes>
    );
}

export default App;