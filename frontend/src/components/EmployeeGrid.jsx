import { useEffect, useState } from "react";
import axios from "../utils/axios";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeGrid() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("/hr/employees")
      .then(res => setEmployees(res.data))
      .catch(err => {
        console.error("Error fetching employees:", err);
        setEmployees([]);
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {employees.map(emp => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </div>
  );
}
