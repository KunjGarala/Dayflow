import { useState, useEffect } from "react";
import api from "../../utils/axiosInstance";
import HrLayout from "../../components/HrLayout";

/**
 * TimeOff Page for HR
 * Allows HR to view and manage employee time off requests
 */
const TimeOff = () => {
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  useEffect(() => {
    // TODO: Fetch time off requests from API
    // For now, using mock data
    setTimeOffRequests([
      {
        id: 1,
        employeeName: "John Doe",
        employeeId: "EMP001",
        startDate: "2025-01-15",
        endDate: "2025-01-17",
        type: "Sick Leave",
        reason: "Medical appointment",
        status: "pending",
        requestedDate: "2025-01-10",
      },
      {
        id: 2,
        employeeName: "Jane Smith",
        employeeId: "EMP002",
        startDate: "2025-01-20",
        endDate: "2025-01-22",
        type: "Vacation",
        reason: "Family vacation",
        status: "approved",
        requestedDate: "2025-01-08",
      },
    ]);
  }, []);

  const handleApprove = async (id) => {
    try {
      // TODO: Call API to approve time off
      setTimeOffRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: "approved" } : req
        )
      );
    } catch (error) {
      console.error("Error approving time off:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      // TODO: Call API to reject time off
      setTimeOffRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: "rejected" } : req
        )
      );
    } catch (error) {
      console.error("Error rejecting time off:", error);
    }
  };

  const filteredRequests =
    filter === "all"
      ? timeOffRequests
      : timeOffRequests.filter((req) => req.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <HrLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Time Off Requests</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === "all"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === "pending"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("approved")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === "approved"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setFilter("rejected")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === "rejected"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No time off requests found</p>
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
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Start Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        End Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Reason
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {request.employeeName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {request.employeeId}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {request.type}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {new Date(request.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {new Date(request.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {request.reason}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {request.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApprove(request.id)}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(request.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {request.status !== "pending" && (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
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

export default TimeOff;

