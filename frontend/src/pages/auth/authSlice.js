import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup, logout } from './authService';

/**
 * Async thunk for user login
 * 
 * Backend behavior:
 * - Returns accessToken in response body
 * - Returns user data in response body
 * 
 * Frontend behavior:
 * - Stores accessToken in Redux state
 * - Stores user data in Redux state
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      
      // Backend returns accessToken and user data
      return {
        accessToken: response.data.accessToken,
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
 * - Clears localStorage
 * - Calls logout API endpoint
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

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return {
      accessToken,
      user,
      isAuthenticated: !!accessToken && !!user,
      loading: false,
      error: null,
    };
  } catch (error) {
    return {
      accessToken: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }
};

// Initial state
// Access token is stored in Redux state and localStorage
const initialState = loadInitialState();

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
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        
        // Persist to localStorage
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      // Login rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        
        // Clear localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
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
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        
        // Clear localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      })
      // Logout rejected
      .addCase(logoutUser.rejected, (state) => {
        // Clear state even if logout API call failed
        state.loading = false;
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        
        // Clear localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
