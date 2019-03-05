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
    <div>
      <button onClick={forceUpdate}>Update</button>
      <h3>Bad Counter (Normal)</h3>
      <BadCounter />
      <ConcurrentMode>
        <h3>Bad Counter (Concurrent Mode)</h3>
        <BadCounter />
        <h3>Good Counter (Concurrent Mode)</h3>
        <GoodCounter />
      </ConcurrentMode>
    </div>
  );
};

export default App;