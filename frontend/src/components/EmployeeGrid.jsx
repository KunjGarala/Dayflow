import { useEffect, useState } from "react";
import { employeeAPI } from "../apis";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeGrid() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (employeeId, newStatus) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, status: newStatus } : emp
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading employees...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No employees found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Employees</h2>
        <p className="text-gray-500 mt-1">Manage employee status and attendance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onStatusUpdate={handleStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
}
