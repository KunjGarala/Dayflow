/**
 * Centralized API Exports
 * All API functions are organized in their respective folders
 * This file serves as the main entry point for all APIs
 */

// Import APIs from their respective folders
import authAPI from './auth';
import userAPI from './user';
import companyAPI from './company';
import employeeAPI from './employee';

// Re-export individual API functions for backward compatibility
export {
  loginAPI,
  signupAPI,
  logoutAPI,
  authAPI,
} from './auth';

export {
  getUserProfileAPI,
  updateUserProfileAPI,
  userAPI,
} from './user';

export {
  getCompanyAPI,
  updateCompanyAPI,
  companyAPI,
} from './company';

export {
  createEmployeeAPI,
  getEmployeesAPI,
  getEmployeeByIdAPI,
  employeeAPI,
} from './employee';

// Default export with all APIs grouped
export default {
  auth: authAPI,
  user: userAPI,
  company: companyAPI,
  employee: employeeAPI,
};
