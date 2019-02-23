import React, { useContext, useEffect, useReducer, useRef } from 'react';

const ReduxStoreContext = React.createContext();

export const ReduxProvider = ({ store, children }) => (
  <ReduxStoreContext.Provider value={store}>
    {children}
  </ReduxStoreContext.Provider>
);

export const useReduxDispatch = () => {
  const store = useContext(ReduxStoreContext);
  return store.dispatch;
};

export const useReduxState = () => { 
  const forceUpdate = useForceUpdate();
  const store = useContext(ReduxStoreContext);
  const state = useRef(store.getState());
  useEffect(() => {
    const callback = () => {
      state.current = store.getState();
      forceUpdate();
    };
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  }, []);
  return state.current;
};

const forcedReducer = state => !state;
const useForceUpdate = () => useReducer(forcedReducer, false)[1];