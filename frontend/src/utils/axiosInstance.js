import axios from 'axios';
import API_BASE_URL from '../config';

/**
 * Axios Instance Configuration
 * 
 * This instance handles:
 * - Automatic cookie handling (access token in cookie)
 * - Automatic logout on 401 errors (token expired/invalid)
 * 
 * Access token is stored in HTTP-only cookie, sent automatically with requests
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Automatically sends cookies with requests
});

// Store reference - will be set after store initialization
let storeRef = null;

/**
 * Set store reference (called from main.jsx after store is created)
 * This breaks the circular dependency
 */
export const setStoreRef = (store) => {
  storeRef = store;
};

/**
 * Request Interceptor
 * Cookies are sent automatically by browser, no need to attach token manually
 */
api.interceptors.request.use(
  (config) => {
    // Cookies are sent automatically with withCredentials: true
    // No need to manually attach token to headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles 401 errors (token expired/invalid)
 * 
 * Flow:
 * 1. If 401 (unauthorized), logout user and redirect to login
 * 2. Cookie is handled automatically by browser
 */
api.interceptors.response.use(
  (response) => {
    // Successful response - return as is
    // Cookie is handled automatically by browser
    return response;
  },
  async (error) => {
    // If error is 401 (unauthorized), logout user
    if (error.response?.status === 401) {
      if (storeRef) {
        const authSlice = await import('../pages/auth/authSlice');
        storeRef.dispatch(authSlice.logoutUser());
      }
      window.location.href = '/login';
    }

    // Return error as is
    return Promise.reject(error);
  }
);

export default api;
