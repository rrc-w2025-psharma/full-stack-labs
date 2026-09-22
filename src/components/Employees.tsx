import type { Department, Employee } from "../types/Employee";
import { EmployeeDirectory } from "./EmployeeDirectory";
import { AddEmployeeForm } from "./AddEmployeeForm";

interface EmployeesProps {
    departments: Department[];
    onAddEmployee: (
        employee: Employee,
        departmentName: string
    ) => void;
}

export function Employees({
    departments,
    onAddEmployee,
}: EmployeesProps) {
    return (
        <>
            <EmployeeDirectory departments={departments} />

            <AddEmployeeForm
                departments={departments}
                onAddEmployee={onAddEmployee}
            />
        </>
    );
}