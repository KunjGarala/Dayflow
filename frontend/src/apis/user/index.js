import api from '../../utils/axiosInstance';

/**
 * User API Functions
 * Handles user profile-related API calls
 */

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

// Export grouped API object
export const userAPI = {
  getProfile: getUserProfileAPI,
  updateProfile: updateUserProfileAPI,
};

export default userAPI;

