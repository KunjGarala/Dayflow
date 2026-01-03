import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveRequestForm from "./LeaveRequestForm";
import api from "../utils/axiosInstance";

export default function EmployeeCard({ employee, onStatusUpdate }) {
  const navigate = useNavigate();
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [status, setStatus] = useState(employee.status || "PRESENT");
  const [loading, setLoading] = useState(false);

  const statusMap = {
    PRESENT: { color: "bg-green-500", label: "Present" },
    LEAVE: { color: "bg-red-500", label: "Leave" },
    ON_LEAVE: { color: "bg-orange-500", label: "On Leave" },
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === "LEAVE") {
      setShowLeaveForm(true);
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to update employee status
      // await api.put(`/employees/${employee.id}/status`, { status: newStatus });
      setStatus(newStatus);
      if (onStatusUpdate) {
        onStatusUpdate(employee.id, newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveSubmit = async (leaveData) => {
    setLoading(true);
    try {
      // TODO: Call API to submit leave request
      // await api.post(`/employees/${employee.id}/leave`, leaveData);
      setStatus("ON_LEAVE");
      if (onStatusUpdate) {
        onStatusUpdate(employee.id, "ON_LEAVE");
      }
      setShowLeaveForm(false);
    } catch (error) {
      console.error("Error submitting leave request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative">
        <div className="flex items-start justify-between mb-3">
          <div
            onClick={() => navigate(`/employees/${employee.id}`)}
            className="flex-1 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold">
                {employee.name?.charAt(0) || employee.fullName?.charAt(0) || "E"}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {employee.name || employee.fullName || "Employee"}
                </h4>
                <p className="text-sm text-gray-500">
                  {employee.department || employee.jobPosition || "Employee"}
                </p>
              </div>
            </div>
          </div>

          <span
            className={`absolute top-2 right-2 w-3 h-3 rounded-full ${statusMap[status]?.color || "bg-gray-500"}`}
            title={statusMap[status]?.label || "Unknown"}
          />
        </div>

        {/* Status Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => handleStatusChange("PRESENT")}
            disabled={loading || status === "PRESENT"}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              status === "PRESENT"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Present
          </button>
          <button
            onClick={() => handleStatusChange("LEAVE")}
            disabled={loading || status === "LEAVE"}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              status === "LEAVE"
                ? "bg-red-600 text-white"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Leave
          </button>
          <button
            onClick={() => handleStatusChange("ON_LEAVE")}
            disabled={loading || status === "ON_LEAVE"}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              status === "ON_LEAVE"
                ? "bg-orange-600 text-white"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            On Leave
          </button>
        </div>
      </div>

      <LeaveRequestForm
        isOpen={showLeaveForm}
        onClose={() => setShowLeaveForm(false)}
        onSubmit={handleLeaveSubmit}
        employeeId={employee.id}
      />
    </>
  );
}
