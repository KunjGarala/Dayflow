import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EmployeeGrid from "../../components/EmployeeGrid";
import HrLayout from "../../components/HrLayout";
import EmployeeLayout from "../../components/EmployeeLayout";

/**
 * Employee Dashboard
 * Complete dashboard showing all employees with status management
 */
const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isHR = user?.role === "HR";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  // If not HR, show employee view with all employees
  if (!isHR) {
    return (
      <EmployeeLayout>
        <div className="max-w-7xl mx-auto">
          <EmployeeGrid />
        </div>
      </EmployeeLayout>
    );
  }

  // HR View - Show all employees
  return (
    <HrLayout>
      <div>
        <EmployeeGrid />
      </div>
    </HrLayout>
  );
};

export default EmployeeDashboard;

