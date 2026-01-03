import api from '../../utils/axiosInstance';

/**
 * Auth API Functions
 * Handles authentication-related API calls
 */

/**
 * Login API
 * POST /api/auth/login
 * 
 * @param {Object} credentials - { identifier, password }
 * @returns {Promise} Response with accessToken and user data
 */
export const loginAPI = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return {
      data: {
        accessToken: response.data.accessToken,
        message: response.data.message,
        user: response.data.user,
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
    const response = await api.post('/api/hr/signup/wofile', userData);
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

// Export grouped API object
export const authAPI = {
  login: loginAPI,
  signup: signupAPI,
  logout: logoutAPI,
};

export default authAPI;

