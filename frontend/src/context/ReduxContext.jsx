import { createContext, useContext, useMemo } from 'react';
import { store } from '../store/store';

/**
 * Redux Context
 * 
 * This context provides convenient access to Redux Toolkit store.
 * The actual Redux Provider is in main.jsx using react-redux's Provider.
 * This context provides additional convenience for accessing the store directly.
 * 
 * For most use cases, use the hooks from '../hooks/redux' instead:
 * - useAppDispatch()
 * - useAppSelector()
 * - useAppStore()
 * - useReduxState()
 */

// Create the context
const ReduxContext = createContext(null);

/**
 * Redux Provider Component
 * 
 * Wraps the application with Redux store access.
 * Note: The actual Redux Provider is in main.jsx.
 * This context provides additional convenience for direct store access.
 */
export const ReduxProvider = ({ children }) => {
  const value = useMemo(() => ({
    store,
  }), []);

  return (
    <ReduxContext.Provider value={value}>
      {children}
    </ReduxContext.Provider>
  );
};

/**
 * Custom hook to access Redux context
 * 
 * @returns {Object} Redux context value with store
 * 
 * @example
 * const { store } = useRedux();
 * const state = store.getState();
 */
export const useRedux = () => {
  const context = useContext(ReduxContext);
  if (!context) {
    throw new Error('useRedux must be used within a ReduxProvider');
  }
  return context;
};

export default ReduxContext;

