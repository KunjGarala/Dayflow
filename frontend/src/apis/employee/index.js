import api from '../../utils/axiosInstance';

/**
 * Employee API Functions
 * Handles employee-related API calls
 */

/**
 * Create Employee
 * POST /employees/create
 * 
 * @param {Object} employeeData - Employee data to create
 * @returns {Promise} Response with created employee data
 */
export const createEmployeeAPI = async (employeeData) => {
  try {
    const response = await api.post('/employees/create', employeeData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get All Employees
 * GET /employees
 * 
 * @returns {Promise} Response with employees list
 */
export const getEmployeesAPI = async () => {
  try {
    const response = await api.get('/employees');
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get Employee by ID
 * GET /employees/:id
 * 
 * @param {string} id - Employee ID
 * @returns {Promise} Response with employee data
 */
export const getEmployeeByIdAPI = async (id) => {
  try {
    const response = await api.get(`/employees/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Export grouped API object
export const employeeAPI = {
  create: createEmployeeAPI,
  getAll: getEmployeesAPI,
  getById: getEmployeeByIdAPI,
};

export default employeeAPI;

