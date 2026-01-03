// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import CreateEmployee from "./pages/employee/CreateEmployee";
import Attendance from "./pages/employee/Attendance";
import TimeOff from "./pages/employee/TimeOff";
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

        {/* 404 - Redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
