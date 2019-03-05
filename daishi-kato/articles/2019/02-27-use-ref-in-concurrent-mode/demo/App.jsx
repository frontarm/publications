import React, {
  useReducer,
  unstable_ConcurrentMode as ConcurrentMode
} from "react";

import BadCounter from "./BadCounter";
import GoodCounter from "./GoodCounter";

const useForceUpdate = () => useReducer(state => !state, false)[1];

const App = () => {
  const forceUpdate = useForceUpdate();
  return (
    <ConcurrentMode>
      <div>
        <button onClick={forceUpdate}>Update</button>
        <h3>Bad Counter</h3>
        <BadCounter />
        <h3>Good Counter</h3>
        <GoodCounter />
      </div>
    </ConcurrentMode>
  );
};

export default App;
