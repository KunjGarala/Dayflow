import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/axiosInstance";
import TopNavbar from "../../components/TopNavbar";

/**
 * My Attendance Page
 * Shows employee's own attendance records with check-in/out times and extra hours
 * Shows all past days attendance
 */
export default function MyAttendance() {
  const { user } = useSelector((state) => state.auth);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("all"); // "all" or specific month
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      if (selectedMonth === "all") {
        // Fetch all attendance records - try different endpoints
        try {
          const response = await api.get(`/attendance/my/all`);
          setRecords(response.data || []);
        } catch (err) {
          // Fallback: fetch last 12 months
          const response = await api.get(`/attendance/my`);
          setRecords(response.data || []);
        }
      } else {
        // Fetch for specific month
        const month = selectedMonth.split("-")[1];
        const response = await api.get(`/attendance/my?month=${month}`);
        setRecords(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar searchValue={searchValue} setSearchValue={setSearchValue} showSearch={false} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>
              <p className="text-gray-500 mt-1">
                View your check-in/out times and work hours
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Past Days</option>
                <option value={new Date().toISOString().slice(0, 7)}>This Month</option>
                <option value={new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7)}>
                  Last Month
                </option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading attendance records...</p>
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No attendance records found for this month</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
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
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr
                      key={record.date || index}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-900">
                        {record.date
                          ? new Date(record.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
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
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            record.extraHours && parseFloat(record.extraHours) > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {record.extraHours || "0"} hrs
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            record.status === "PRESENT"
                              ? "bg-green-100 text-green-800"
                              : record.status === "ABSENT"
                              ? "bg-red-100 text-red-800"
                              : record.status === "ON_LEAVE"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {record.status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary Statistics */}
          {records.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Days</p>
                <p className="text-2xl font-bold text-green-700">{records.length}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Present Days</p>
                <p className="text-2xl font-bold text-blue-700">
                  {records.filter((r) => r.status === "PRESENT").length}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">On Leave</p>
                <p className="text-2xl font-bold text-orange-700">
                  {records.filter((r) => r.status === "ON_LEAVE").length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Extra Hours</p>
                <p className="text-2xl font-bold text-purple-700">
                  {records
                    .reduce((sum, r) => sum + (parseFloat(r.extraHours) || 0), 0)
                    .toFixed(1)}{" "}
                  hrs
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
