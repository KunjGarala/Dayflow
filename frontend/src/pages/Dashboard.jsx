import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './auth/authSlice';

/**
 * Dashboard Component
 * Mock dashboard page - shows after successful login
 * Uses cookie-based refresh token flow
 */
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  /**
   * Handle logout
   * 
   * Backend behavior (assumed):
   * - Clears refresh token cookie
   * 
   * Frontend behavior:
   * - Clears Redux auth state
   * - Redirects to login
   */
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-8 md:p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2">
            HRMS
          </h1>
        </div>
        
        <h2 className="text-2xl font-semibold text-white text-center mb-8">
          Welcome to Dashboard
        </h2>
        
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-slate-700/50 rounded-xl">
            <p className="text-white font-medium">
              Hello, {user?.name || 'User'}!
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Email: {user?.email}
            </p>
            {user?.companyName && (
              <p className="text-sm text-gray-400 mt-1">
                Company: {user.companyName}
              </p>
            )}
          </div>
          
          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <p className="text-sm text-purple-300">
              ✓ Access token stored in Redux memory
            </p>
            <p className="text-sm text-purple-300 mt-1">
              ✓ Refresh token in HTTP-only cookie
            </p>
            <p className="text-sm text-purple-300 mt-1">
              ✓ Automatic token refresh on expiry
            </p>
          </div>
        </div>
        
        <button
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
