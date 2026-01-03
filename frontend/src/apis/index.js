import api from '../utils/axiosInstance';

/**
 * Centralized API Functions
 * All API calls are organized here by feature/module
 * This file serves as the single source of truth for all API endpoints
 */

// ============================================
// AUTH APIs
// ============================================

/**
 * Login API
 * POST /genrate-token
 * 
 * @param {Object} credentials - { email, password }
 * @returns {Promise} Response with user data (token is in cookie)
 */
export const loginAPI = async (credentials) => {
  try {
    const response = await api.post('/genrate-token', credentials);
    return {
      data: {
        user: response.data.user || response.data,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Signup API
 * POST /api/auth/sign-up
 * 
 * @param {Object} userData - { companyName, name, email, phone, password }
 * @returns {Promise} Response with success message and user data
 */
export const signupAPI = async (userData) => {
  try {
    const response = await api.post('/api/auth/sign-up', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout API
 * POST /api/auth/logout
 * 
 * @returns {Promise} Response
 */
export const logoutAPI = async () => {
  try {
    const response = await api.post('/api/auth/logout');
    return response;
  } catch (error) {
    throw error;
  }
};

// ============================================
// USER APIs (Example - Add your user APIs here)
// ============================================

/**
 * Get User Profile
 * GET /api/user/profile
 * 
 * @returns {Promise} Response with user profile data
 */
export const getUserProfileAPI = async () => {
  try {
    const response = await api.get('/api/user/profile');
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update User Profile
 * PUT /api/user/profile
 * 
 * @param {Object} userData - User data to update
 * @returns {Promise} Response with updated user data
 */
export const updateUserProfileAPI = async (userData) => {
  try {
    const response = await api.put('/api/user/profile', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

// ============================================
// COMPANY APIs (Example - Add your company APIs here)
// ============================================

/**
 * Get Company Details
 * GET /api/company
 * 
 * @returns {Promise} Response with company data
 */
export const getCompanyAPI = async () => {
  try {
    const response = await api.get('/api/company');
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update Company Details
 * PUT /api/company
 * 
 * @param {Object} companyData - Company data to update
 * @returns {Promise} Response with updated company data
 */
export const updateCompanyAPI = async (companyData) => {
  try {
    const response = await api.put('/api/company', companyData);
    return response;
  } catch (error) {
    throw error;
  }
};

// ============================================
// EXPORT ALL APIs (Grouped by feature)
// ============================================

export const authAPI = {
  login: loginAPI,
  signup: signupAPI,
  logout: logoutAPI,
};

export const userAPI = {
  getProfile: getUserProfileAPI,
  updateProfile: updateUserProfileAPI,
};

export const companyAPI = {
  get: getCompanyAPI,
  update: updateCompanyAPI,
};

// Default export with all APIs grouped
export default {
  auth: authAPI,
  user: userAPI,
  company: companyAPI,
};

