import { useNavigate } from "react-router-dom";

/**
 * Employee Card Component for Dashboard View
 * Read-only card that navigates to employee info page
 */
const EmployeeCardView = ({ employee }) => {
  const navigate = useNavigate();

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-500"; // Green for Present
      case "ON_LEAVE":
        return "bg-blue-500"; // Blue for On Leave
      case "ABSENT":
        return "bg-yellow-500"; // Yellow for Absent
      default:
        return "bg-gray-500";
    }
  };

  const status = employee.status || "ABSENT";
  const statusColor = getStatusColor(status);

  const getInitials = () => {
    const name = employee.name || employee.fullName || "Employee";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      onClick={() => navigate(`/employees/${employee.id}`)}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative group"
    >
      {/* Status Indicator - Top Right */}
      <div
        className={`absolute top-3 right-3 w-3 h-3 rounded-full ${statusColor}`}
        title={status}
      />

      {/* Employee Info */}
      <div className="flex items-center gap-3">
        {/* Profile Image/Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
          {employee.profilePicture ? (
            <img
              src={employee.profilePicture}
              alt={employee.name || employee.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials()
          )}
        </div>

        {/* Name and Basic Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 truncate">
            {employee.name || employee.fullName || "Employee"}
          </h4>
          <p className="text-sm text-gray-500 truncate">
            {employee.jobPosition || employee.department || employee.role || "Employee"}
          </p>
          {employee.employeeId && (
            <p className="text-xs text-gray-400 mt-1">ID: {employee.employeeId}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCardView;

