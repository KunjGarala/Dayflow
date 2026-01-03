import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export default function AdminAttendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("/attendance/admin?date=2025-10-22")
      .then(res => setRecords(res.data))
      .catch(err => {
        console.error("Error fetching attendance:", err);
        setRecords([]);
      });
  }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>Employee</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Work Hours</th>
          <th>Extra Hours</th>
        </tr>
      </thead>

      <tbody>
        {records.map(r => (
          <tr key={r.employeeId} className="text-center border-t">
            <td>{r.employeeName}</td>
            <td>{r.checkIn}</td>
            <td>{r.checkOut}</td>
            <td>{r.workHours}</td>
            <td>{r.extraHours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
