import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import EmployeeGrid from "../components/EmployeeGrid";
import HrLayout from "../components/HrLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // 🔐 Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <HrLayout>
      {/* 📋 MAIN CONTENT – EMPLOYEE GRID (Wireframe Landing Page) */}
      <div className="p-6">
        <EmployeeGrid />
      </div>
    </HrLayout>
  );
};

export default Dashboard;
