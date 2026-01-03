import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import HrLayout from "../../components/HrLayout";

/**
 * Attendance Page for HR
 * Shows all employees' attendance records
 */
const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/attendance/admin?date=${selectedDate}`);
      setRecords(response.data || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HrLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Employee Attendance</h1>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading attendance records...</p>
              </div>
            ) : records.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No attendance records found for this date</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Employee
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Check In
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Check Out
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Work Hours
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Extra Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr
                        key={record.employeeId || index}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-900">
                          {record.employeeName || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {record.checkIn || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {record.checkOut || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {record.workHours || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {record.extraHours || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </HrLayout>
  );
};

export default Attendance;

