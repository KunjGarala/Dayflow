import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export default function MyAttendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("/attendance/my?month=10")
      .then(res => setRecords(res.data))
      .catch(err => {
        console.error("Error fetching attendance:", err);
        setRecords([]);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">My Attendance</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Work Hours</th>
            <th>Extra Hours</th>
          </tr>
        </thead>

        <tbody>
          {records.map(row => (
            <tr key={row.date} className="text-center border-t">
              <td>{row.date}</td>
              <td>{row.checkIn}</td>
              <td>{row.checkOut}</td>
              <td>{row.workHours}</td>
              <td>{row.extraHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
