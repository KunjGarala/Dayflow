import api from '../../utils/axiosInstance';

/**
 * Company API Functions
 * Handles company-related API calls
 */

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

// Export grouped API object
export const companyAPI = {
  get: getCompanyAPI,
  update: updateCompanyAPI,
};

export default companyAPI;

