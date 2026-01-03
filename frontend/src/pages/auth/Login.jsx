import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, clearError } from './authSlice';

/**
 * Login Component
 * Handles user authentication with email/password
 * Uses cookie-based refresh token flow (HTTP-only cookies)
 */
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  // Form state
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validate form fields
   */
  const validateForm = () => {
    const errors = {};
    
    if (!formData.identifier.trim()) {
      errors.identifier = 'Login ID / Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.identifier)) {
      errors.identifier = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   * 
   * Backend behavior (assumed):
   * - Sets refresh token in HTTP-only cookie
   * - Returns access token in response body
   * 
   * Frontend behavior:
   * - Stores access token in Redux only
   * - Redirects to dashboard on success
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors({});
    dispatch(clearError());
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Dispatch login action
    try {
      const result = await dispatch(loginUser(formData));
      console.log(result);
      
      // If login successful, navigate to dashboard
      if (loginUser.fulfilled.match(result)) {
        navigate('/dashboard');
      }
    } catch (err) {
      // Error is handled by Redux
      console.error('Login error:', err);
    }
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-8 md:p-10">
      {/* Logo Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2">
          HRMS
        </h1>
      </div>
      
      <h2 className="text-2xl font-semibold text-white text-center mb-8">
        Login to Your Account
      </h2>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      
      {/* Login Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Identifier Input */}
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-300 mb-2">
            Login ID / Email
          </label>
          <input
            type="email"
            id="identifier"
            name="identifier"
            className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your email"
            value={formData.identifier}
            onChange={handleChange}
          />
          {formErrors.identifier && (
            <p className="mt-2 text-sm text-red-400">{formErrors.identifier}</p>
          )}
        </div>
        
        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full px-4 py-3 pr-20 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formErrors.password && (
            <p className="mt-2 text-sm text-red-400">{formErrors.password}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      
      {/* Sign Up Link */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        Don't have an account?{' '}
        <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
