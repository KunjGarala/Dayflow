import api from '../../utils/axiosInstance';

/**
 * Auth Service
 * All API calls use the axios instance which handles:
 * - Automatic cookie handling (access token in cookie)
 * - Automatic logout on 401 errors
 */

/**
 * Login API call
 * 
 * Backend expected behavior:
 * - POST /genrate-token
 * - Sets access token in HTTP-only cookie
 * - Returns user data in response body
 * 
 * @param {Object} data - Login credentials { email, password }
 * @returns {Promise} Response with user data
 */
export const login = async (data) => {
  try {
    const response = await api.post('/genrate-token', data);
    
    // Access token is in cookie (set by backend)
    // Return user data from response
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
 * Signup API call
 * 
 * Backend expected behavior:
 * - POST /api/auth/sign-up
 * - Returns success message and user data
 * 
 * @param {Object} data - Signup data { companyName, name, email, phone, password }
 * @returns {Promise} Response
 */
export const signup = async (data) => {
  try {
    const response = await api.post('/api/auth/sign-up', data);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout API call
 * 
 * Backend expected behavior:
 * - POST /api/auth/logout
 * - Clears access token cookie
 * 
 * @returns {Promise} Response
 */
export const logout = async () => {
  try {
    const response = await api.post('/api/auth/logout');
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  signup,
  logout,
};
