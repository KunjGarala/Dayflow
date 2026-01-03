import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { employeeAPI } from "../../apis";
import TopNavbar from "../../components/TopNavbar";

/**
 * Employee Information Page
 * Read-only view of employee details
 */
const EmployeeInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.getById(id);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar showSearch={false} />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading employee information...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar showSearch={false} />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Employee not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar showSearch={false} />
      
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-purple-600 hover:text-purple-700 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Employees
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8 pb-6 border-b">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              {employee.name?.charAt(0) || employee.fullName?.charAt(0) || "E"}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {employee.name || employee.fullName || "Employee"}
              </h1>
              <p className="text-lg text-gray-600">
                {employee.jobPosition || employee.department || "Employee"}
              </p>
              {employee.employeeId && (
                <p className="text-sm text-gray-500 mt-1">ID: {employee.employeeId}</p>
              )}
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-800">{employee.email || employee.identifier || "N/A"}</p>
                </div>
                {employee.mobileNumber && (
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="text-gray-800">{employee.mobileNumber}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Work Information
              </h3>
              <div className="space-y-3">
                {employee.department && (
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-gray-800">{employee.department}</p>
                  </div>
                )}
                {employee.jobPosition && (
                  <div>
                    <p className="text-sm text-gray-600">Position</p>
                    <p className="text-gray-800">{employee.jobPosition}</p>
                  </div>
                )}
                {employee.manager && (
                  <div>
                    <p className="text-sm text-gray-600">Manager</p>
                    <p className="text-gray-800">{employee.manager}</p>
                  </div>
                )}
                {employee.location && (
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="text-gray-800">{employee.location}</p>
                  </div>
                )}
              </div>
            </div>

            {employee.yearOfJoining && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Employment Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Year of Joining</p>
                    <p className="text-gray-800">{employee.yearOfJoining}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;

