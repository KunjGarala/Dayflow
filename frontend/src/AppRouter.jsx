// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import CreateEmployee from "./pages/employee/CreateEmployee";
import Attendance from "./pages/employee/Attendance";
import TimeOff from "./pages/employee/TimeOff";
import MyAttendance from "./pages/employee/MyAttendance";
import MyTimeOff from "./pages/employee/MyTimeOff";
import EmployeeInfo from "./pages/employee/EmployeeInfo";
import CompanyInfo from "./pages/company/CompanyInfo";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/profile/Profile";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes with Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Protected Profile Route */}
        <Route
          path="/profile"
          element={
            // <ProtectedRoute>
              <Profile />
            // {/* </ProtectedRoute> */}
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />

        {/* Company Info Route - HR only */}
        <Route
          path="/company"
          element={
            // <ProtectedRoute>
              <CompanyInfo />
            // </ProtectedRoute>
          }
        />

        {/* Employee Routes - Protected (HR/Admin only) */}
        <Route
          path="/employees/create"
          element={
            // <ProtectedRoute>
              <CreateEmployee />
            // </ProtectedRoute>
          }
        />

        {/* Attendance Route - HR only */}
        <Route
          path="/attendance"
          element={
            // <ProtectedRoute>
              <Attendance />
            // </ProtectedRoute>
          }
        />

        {/* Time Off Route - HR only */}
        <Route
          path="/timeoff"
          element={
            // <ProtectedRoute>
              <TimeOff />
            // </ProtectedRoute>
          }
        />

        {/* Employee Dashboard Route */}
        <Route
          path="/employee-dashboard"
          element={
            // <ProtectedRoute>
              <EmployeeDashboard />
            // </ProtectedRoute>
          }
        />

        {/* My Attendance Route - For employees */}
        <Route
          path="/my-attendance"
          element={
            // <ProtectedRoute>
              <MyAttendance />
            // </ProtectedRoute>
          }
        />

        {/* My TimeOff Route - For employees */}
        <Route
          path="/my-timeoff"
          element={
            // <ProtectedRoute>
              <MyTimeOff />
            // </ProtectedRoute>
          }
        />

        {/* Employee Info Route - Read-only employee details */}
        <Route
          path="/employees/:id"
          element={
            // <ProtectedRoute>
              <EmployeeInfo />
            // </ProtectedRoute>
          }
        />

        {/* 404 - Redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
