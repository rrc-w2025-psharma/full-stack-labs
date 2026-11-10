import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Employees } from "./components/Employees";
import { Organization } from "./components/Organization";

import { employeeRepo } from "./repositories/employeeRepo";
import type { Department } from "./types/Employee";

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState("");

  async function refreshEmployees() {
    try {
      const data = await employeeRepo.getDepartments();
      setDepartments(data);
      setError("");
    } catch (error) {
      console.error("Failed to load employees:", error);
      setError("Unable to load employees from the server.");
    }
  }

  useEffect(() => {
    void employeeRepo.getDepartments()
      .then((data) => {
        setDepartments(data);
        setError("");
      })
      .catch((error: unknown) => {
        console.error("Failed to load employees:", error);
        setError("Unable to load employees from the server.");
      });
  }, []);

  return (
    <>
      {error && <p role="alert">{error}</p>}

      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Employees
                departments={departments}
                onAddEmployee={() => void refreshEmployees()}
              />
            }
          />

          <Route
            path="/employees"
            element={
              <Employees
                departments={departments}
                onAddEmployee={() => void refreshEmployees()}
              />
            }
          />

          <Route
            path="/organization"
            element={<Organization />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
