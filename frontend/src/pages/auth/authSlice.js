import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup, logout } from './authService';

/**
 * Async thunk for user login
 * 
 * Backend behavior:
 * - Sets access token in HTTP-only cookie
 * - Returns user data in response body
 * 
 * Frontend behavior:
 * - Token is stored in cookie (handled by browser)
 * - Only stores user data and auth state in Redux
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      
      // Backend returns user data, token is in cookie
      return {
        user: response.data.user,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  }
);

/**
 * Async thunk for user signup
 * Handles new user registration
 */
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signup(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Signup failed. Please try again.'
      );
    }
  }
);

/**
 * Async thunk for user logout
 * 
 * Frontend behavior:
 * - Clears Redux auth state
 * - Backend clears cookie
 * - Redirects to login
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Call logout endpoint to clear cookie
      await logout();
    } catch (error) {
      // Even if logout fails, clear frontend state
      console.error('Logout error:', error);
    }
  }
);

// Initial state
// Access token is in cookie, not stored in Redux
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Clear error action
     */
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Login fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      // Login rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Signup pending
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Signup fulfilled
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      // Signup rejected
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout pending
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      // Logout fulfilled
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Logout rejected
      .addCase(logoutUser.rejected, (state) => {
        // Clear state even if logout API call failed
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
