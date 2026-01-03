import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser, clearError } from './authSlice';

/**
 * Signup Component
 * Handles new user registration
 * Uses cookie-based refresh token flow (HTTP-only cookies)
 */
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const { loading, error } = useSelector((state) => state.auth);
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [logoFileName, setLogoFileName] = useState('');

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
   * Handle file upload (UI only - no actual upload)
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFileName(file.name);
      // In real app, you would upload the file here
      console.log('Selected file:', file.name);
    }
  };

  /**
   * Validate form fields
   */
  const validateForm = () => {
    const errors = {};
    
    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors and messages
    setFormErrors({});
    setSuccessMessage('');
    dispatch(clearError());
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Prepare signup data (exclude confirmPassword)
    const signupData = {
      companyName: formData.companyName,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };
    
    // Dispatch signup action
    try {
      const result = await dispatch(signupUser(signupData));
      
      // If signup successful, show success message and redirect
      if (signupUser.fulfilled.match(result)) {
        setSuccessMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      // Error is handled by Redux
      console.error('Signup error:', err);
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
        Create Your Account
      </h2>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
          {successMessage}
        </div>
      )}
      
      {/* Signup Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Company Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Logo
          </label>
          <label className="flex flex-col items-center justify-center w-full px-4 py-3 bg-slate-700/50 border-2 border-dashed border-purple-500/30 rounded-xl text-purple-400 hover:border-purple-500/50 hover:bg-slate-700/70 cursor-pointer transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="text-sm font-medium">Upload Company Logo</span>
            {logoFileName && (
              <span className="text-xs text-gray-400 mt-1">{logoFileName}</span>
            )}
          </label>
        </div>
        
        {/* Company Name Input */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={handleChange}
          />
          {formErrors.companyName && (
            <p className="mt-2 text-sm text-red-400">{formErrors.companyName}</p>
          )}
        </div>
        
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && (
            <p className="mt-2 text-sm text-red-400">{formErrors.name}</p>
          )}
        </div>
        
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <p className="mt-2 text-sm text-red-400">{formErrors.email}</p>
          )}
        </div>
        
        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          {formErrors.phone && (
            <p className="mt-2 text-sm text-red-400">{formErrors.phone}</p>
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
        
        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 pr-20 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formErrors.confirmPassword && (
            <p className="mt-2 text-sm text-red-400">{formErrors.confirmPassword}</p>
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
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      {/* Login Link */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
