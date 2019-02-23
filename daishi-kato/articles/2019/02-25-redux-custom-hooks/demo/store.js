import { createStore } from 'redux';

const initialState = {
  count: 0,
  text: 'edit me'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + 1 };
    case 'setText':
      return { ...state, text: action.text };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;