import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Employees } from "./components/Employees";
import { Organization } from "./components/Organization";

import { employeeRepo } from "./repositories/employeeRepo";
import type { Department } from "./types/Employee";

function App() {
    const [departments, setDepartments] = useState<Department[]>(
        () => employeeRepo.getDepartments()
    );

    function refreshEmployees() {
        setDepartments(employeeRepo.getDepartments());
    }

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    index
                    element={
                        <Employees
                            departments={departments}
                            onAddEmployee={refreshEmployees}
                        />
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <Employees
                            departments={departments}
                            onAddEmployee={refreshEmployees}
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