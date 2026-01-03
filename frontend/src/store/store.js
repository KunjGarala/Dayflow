import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';

/**
 * Redux Toolkit Store Configuration
 * 
 * This store manages the global application state using Redux Toolkit.
 * All slices are combined here to create a single source of truth.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers here as needed
    // example: user: userReducer,
    // example: profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

