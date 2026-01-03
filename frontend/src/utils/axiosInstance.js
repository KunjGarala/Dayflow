import axios from 'axios';
import API_BASE_URL from '../config';

/**
 * Axios Instance Configuration
 * 
 * This instance handles:
 * - Automatic token handling (access token from Redux state)
 * - Automatic logout on 401 errors (token expired/invalid)
 * 
 * Access token is stored in Redux state, sent in Authorization header
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // Not using cookies, using Authorization header
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
 * Attaches access token from Redux store to Authorization header
 */
api.interceptors.request.use(
  (config) => {
    // Get access token from Redux store
    if (storeRef) {
      const state = storeRef.getState();
      const accessToken = state.auth?.accessToken;
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
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
 * 2. Clears access token from Redux state
 */
api.interceptors.response.use(
  (response) => {
    // Successful response - return as is
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
