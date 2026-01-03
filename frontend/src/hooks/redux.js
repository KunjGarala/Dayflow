/**
 * Redux Hooks
 * 
 * Convenient hooks for accessing Redux Toolkit store.
 * These hooks provide typed access to the Redux store.
 * 
 * Usage examples:
 * 
 * // Using useAppSelector
 * const user = useAppSelector((state) => state.auth.user);
 * 
 * // Using useAppDispatch
 * const dispatch = useAppDispatch();
 * dispatch(loginUser(credentials));
 * 
 * // Using useReduxState (combines both)
 * const { state, dispatch } = useReduxState((state) => state.auth);
 */

import { useDispatch, useSelector, useStore } from 'react-redux';

/**
 * Typed version of useDispatch hook
 * 
 * @returns {Function} Dispatch function
 * 
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(loginUser({ email, password }));
 */
export const useAppDispatch = () => {
  return useDispatch();
};

/**
 * Typed version of useSelector hook
 * 
 * @param {Function} selector - Selector function that receives state and returns selected value
 * @param {Function} equalityFn - Optional equality function for comparison
 * @returns {any} Selected state value
 * 
 * @example
 * const user = useAppSelector((state) => state.auth.user);
 * const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
 */
export const useAppSelector = useSelector;

/**
 * Hook to access the Redux store directly
 * 
 * @returns {Store} Redux store instance
 * 
 * @example
 * const store = useAppStore();
 * const state = store.getState();
 */
export const useAppStore = () => {
  return useStore();
};

/**
 * Custom hook that combines selector and dispatch
 * Useful when you need both state and dispatch together
 * 
 * @param {Function} selector - Selector function
 * @returns {Object} Object containing selected state and dispatch function
 * 
 * @example
 * const { state, dispatch } = useReduxState((state) => state.auth);
 * // state.user, state.isAuthenticated, etc.
 * // dispatch(loginUser(...))
 */
export const useReduxState = (selector) => {
  const state = useAppSelector(selector);
  const dispatch = useAppDispatch();
  
  return { state, dispatch };
};

