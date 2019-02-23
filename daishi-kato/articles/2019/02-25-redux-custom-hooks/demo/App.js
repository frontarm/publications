import React, { useCallback } from 'react';
import store from './store';
import { ReduxProvider, useReduxState, useReduxDispatch } from './redux-bindings';

const App = () => (
  <ReduxProvider store={store}>
    <Counter />
    <TextBox />
  </ReduxProvider>
);

const Counter = () => {
  const state = useReduxState();
  const dispatch = useReduxDispatch();
  const inc = useCallback(() => dispatch({ type: 'inc' }), []);
  return (
    <div>
      <div>Count: {state.count}</div>
      <button onClick={inc}>+1</button>
    </div>
  );
};

const TextBox = () => {
  const state = useReduxState();
  const dispatch = useReduxDispatch();
  const setText = useCallback(event => dispatch({
    type: 'setText',
    text: event.target.value,
  }), []);
  return (
    <div>
      <div>Text: {state.text}</div>
      <input value={state.text} onChange={setText} />
    </div>
  );
};

export default App;