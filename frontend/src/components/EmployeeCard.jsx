import { useNavigate } from "react-router-dom";

export default function EmployeeCard({ employee }) {
  const navigate = useNavigate();

  const statusMap = {
    PRESENT: "bg-green-500",
    LEAVE: "bg-blue-500",
    ABSENT: "bg-yellow-500",
  };

  return (
    <div
      onClick={() => navigate(`/employees/${employee.id}`)}
      className="border p-4 rounded cursor-pointer relative"
    >
      <img
        src={employee.profilePicture}
        alt="profile"
        className="w-12 h-12 rounded-full"
      />

      <h4 className="mt-2 font-semibold">{employee.fullName}</h4>

      <span
        className={`absolute top-2 right-2 w-3 h-3 rounded-full ${statusMap[employee.status]}`}
      />
    </div>
  );
}
