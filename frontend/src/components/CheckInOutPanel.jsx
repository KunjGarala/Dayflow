import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../utils/axiosInstance";

/**
 * Check-In / Check-Out Panel Component
 * Shows check-in/out buttons and status indicator
 */
const CheckInOutPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already checked in today
    checkTodayStatus();
  }, []);

  const checkTodayStatus = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await api.get(`/attendance/my?date=${today}`);
      if (response.data && response.data.length > 0) {
        const todayRecord = response.data[0];
        if (todayRecord.checkIn) {
          setIsCheckedIn(true);
          setCheckInTime(todayRecord.checkIn);
        }
      }
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await api.post("/attendance/check-in");
      const now = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setIsCheckedIn(true);
      setCheckInTime(now);
    } catch (error) {
      console.error("Error checking in:", error);
      alert("Failed to check in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await api.post("/attendance/check-out");
      setIsCheckedIn(false);
      setCheckInTime(null);
    } catch (error) {
      console.error("Error checking out:", error);
      alert("Failed to check out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Attendance
      </h3>

      {/* Status Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-4 h-4 rounded-full ${
            isCheckedIn ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-gray-600">
          {isCheckedIn ? "Checked In" : "Not Checked In"}
        </span>
      </div>

      {/* Check In Time */}
      {isCheckedIn && checkInTime && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Check In Time</p>
          <p className="text-lg font-semibold text-green-700">{checkInTime}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleCheckIn}
          disabled={loading || isCheckedIn}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          disabled={loading || !isCheckedIn}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CheckInOutPanel;

