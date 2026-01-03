import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../utils/axiosInstance";

/**
 * Check-In / Check-Out Panel Component
 * Status API driven
 */
const CheckInOutPanel = () => {
  const { user } = useSelector((state) => state.auth);

  const [status, setStatus] = useState("GRAY"); // RED | GREEN | BLUE | GRAY
  const [checkInTime, setCheckInTime] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📥 Fetch current status
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await api.get("/api/employee/attendance/status");

      /*
        Expected response example:
        {
          status: "GREEN",
          checkInTime: "09:32 AM"
        }
      */

      if (res.data) {
        setStatus(res.data.status || "GRAY");
        setCheckInTime(res.data.checkInTime || null);
      }
    } catch (err) {
      console.error("Failed to fetch attendance status", err);
    }
  };

  // 🟢 Check In
  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await api.post("/api/employee/attendance/checkin");
      await fetchStatus(); // refresh status
    } catch (err) {
      console.error("Check-in failed", err);
      alert("Check-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Check Out
  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await api.post("/api/employee/attendance/checkout");
      await fetchStatus(); // refresh status
    } catch (err) {
      console.error("Check-out failed", err);
      alert("Check-out failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Status color mapping
  const statusColor = {
    GREEN: "bg-green-500",
    RED: "bg-red-500",
    BLUE: "bg-blue-500",
    GRAY: "bg-gray-400",
  };

  const statusLabel = {
    GREEN: "Checked In",
    RED: "Not Checked In",
    BLUE: "On Leave",
    GRAY: "Absent",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Attendance
      </h3>

      {/* Status Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-4 h-4 rounded-full ${statusColor[status]}`}
        />
        <span className="text-sm text-gray-600">
          {statusLabel[status]}
        </span>
      </div>

      {/* Check In Time */}
      {status === "GREEN" && checkInTime && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Check In Time</p>
          <p className="text-lg font-semibold text-green-700">
            {checkInTime}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleCheckIn}
          disabled={loading || status === "GREEN" || status === "BLUE"}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          disabled={loading || status !== "GREEN"}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CheckInOutPanel;
