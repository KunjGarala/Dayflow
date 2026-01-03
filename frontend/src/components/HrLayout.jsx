import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { logoutUser } from "../pages/auth/authSlice";

/**
 * HR Layout Component
 * Provides header and navigation for HR users
 */
const HrLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const isHR = user?.role === "HR";

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent">
            Dayflow HRMS
          </h1>
        </div>
        <div className="relative">
          <ProfileMenu onLogout={handleLogout} />
        </div>
      </header>

      {/* HR Navigation Header */}
      {isHR && (
        <nav className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
          <div className="px-6">
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/dashboard")}
                className={`relative px-5 py-4 font-medium text-sm transition-all duration-200 rounded-t-md ${
                  isActive("/dashboard")
                    ? "text-purple-600"
                    : "text-slate-600 hover:text-purple-600 hover:bg-purple-50/50"
                }`}
              >
                Employees
                {isActive("/dashboard") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => navigate("/employees/create")}
                className={`relative px-5 py-4 font-medium text-sm transition-all duration-200 rounded-t-md ${
                  isActive("/employees/create")
                    ? "text-purple-600"
                    : "text-slate-600 hover:text-purple-600 hover:bg-purple-50/50"
                }`}
              >
                Add Employees
                {isActive("/employees/create") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => navigate("/attendance")}
                className={`relative px-5 py-4 font-medium text-sm transition-all duration-200 rounded-t-md ${
                  isActive("/attendance")
                    ? "text-purple-600"
                    : "text-slate-600 hover:text-purple-600 hover:bg-purple-50/50"
                }`}
              >
                Attendance
                {isActive("/attendance") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => navigate("/timeoff")}
                className={`relative px-5 py-4 font-medium text-sm transition-all duration-200 rounded-t-md ${
                  isActive("/timeoff")
                    ? "text-purple-600"
                    : "text-slate-600 hover:text-purple-600 hover:bg-purple-50/50"
                }`}
              >
                Time Off
                {isActive("/timeoff") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-t-full" />
                )}
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="pt-6 pb-12 px-6">{children}</main>
    </div>
  );
};

export default HrLayout;