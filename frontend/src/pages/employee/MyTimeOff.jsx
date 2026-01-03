import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/axiosInstance";
import TopNavbar from "../../components/TopNavbar";
import LeaveRequestForm from "../../components/LeaveRequestForm";

/**
 * My TimeOff Page for Employees
 * Shows employee's own leave requests and allows creating new ones
 */
const MyTimeOff = () => {
  const { user } = useSelector((state) => state.auth);
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchMyTimeOff();
  }, []);

  const fetchMyTimeOff = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/timeoff/my');
      // setTimeOffRequests(response.data || []);
      
      // Mock data for now
      setTimeOffRequests([
        {
          id: 1,
          startDate: "2025-01-15",
          endDate: "2025-01-17",
          leaveType: "sick",
          type: "Sick Leave",
          reason: "Medical appointment",
          status: "approved",
          requestedDate: "2025-01-10",
        },
        {
          id: 2,
          startDate: "2025-01-20",
          endDate: "2025-01-22",
          leaveType: "paid",
          type: "Paid Leave",
          reason: "Family vacation",
          status: "pending",
          requestedDate: "2025-01-18",
        },
        {
          id: 3,
          startDate: "2024-12-10",
          endDate: "2024-12-12",
          leaveType: "sick",
          type: "Sick Leave",
          reason: "Fever",
          status: "approved",
          requestedDate: "2024-12-08",
        },
      ]);
    } catch (error) {
      console.error("Error fetching time off requests:", error);
      setTimeOffRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveSubmit = async (leaveData) => {
    try {
      // TODO: Call API to submit leave request
      // const response = await api.post('/timeoff/request', leaveData);
      
      // Add new request to list
      const newRequest = {
        id: Date.now(),
        ...leaveData,
        type: leaveData.leaveType === "sick" ? "Sick Leave" : "Paid Leave",
        status: "pending",
        requestedDate: new Date().toISOString().split("T")[0],
      };
      
      setTimeOffRequests((prev) => [newRequest, ...prev]);
      setShowLeaveForm(false);
    } catch (error) {
      console.error("Error submitting leave request:", error);
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
    <div className="min-h-screen bg-gray-50">
      <TopNavbar searchValue={searchValue} setSearchValue={setSearchValue} showSearch={false} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Leave Requests</h1>
              <p className="text-gray-500 mt-1">View and manage your time off requests</p>
            </div>
            <button
              onClick={() => setShowLeaveForm(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              + New Leave
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6">
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

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No leave requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Requested Date
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
                      Days
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Reason
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => {
                    const startDate = new Date(request.startDate);
                    const endDate = new Date(request.endDate);
                    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

                    return (
                      <tr
                        key={request.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-700">
                          {new Date(request.requestedDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{request.type}</td>
                        <td className="px-4 py-3 text-gray-700">
                          {startDate.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {endDate.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{days} days</td>
                        <td className="px-4 py-3 text-gray-700">{request.reason}</td>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <LeaveRequestForm
        isOpen={showLeaveForm}
        onClose={() => setShowLeaveForm(false)}
        onSubmit={handleLeaveSubmit}
        employeeId={user?.id}
      />
    </div>
  );
};

export default MyTimeOff;

