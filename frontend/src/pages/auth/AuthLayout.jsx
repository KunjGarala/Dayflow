import { Outlet } from 'react-router-dom';

/**
 * AuthLayout Component
 * Shared layout wrapper for authentication pages (Login, Signup)
 * Provides consistent dark theme with purple accent styling
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

