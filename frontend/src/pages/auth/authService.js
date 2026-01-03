/**
 * Auth Service
 * This file uses the centralized API functions from src/apis/index.js
 * 
 * All API calls are handled by the axios instance which:
 * - Automatic cookie handling (access token in cookie)
 * - Automatic logout on 401 errors
 */

import { authAPI } from '../../apis';

// Re-export auth APIs for backward compatibility
export const login = authAPI.login;
export const signup = authAPI.signup;
export const logout = authAPI.logout;

export default {
  login,
  signup,
  logout,
};
