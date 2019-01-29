import React from 'react';
import { useTimeTravel } from './useTimeTravel';

const initialState = { x: 0, y: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'MOVE':
      state.x += action.x;
      state.y += action.y;
      state.x = Math.min(Math.max(state.x, 0), 9);
      state.y = Math.min(Math.max(state.y, 0), 9);
  }
}

export default function App() {
  const { state, dispatch, timeline, doUndo, doRedo, doReset } = useTimeTravel(
    reducer,
    initialState
  );
  const createMove = (x, y) => () => dispatch({ type: 'MOVE', x, y });
  return (
    <div>
      <h1>Move the green box around</h1>
      <div id="App">
        <div className="redBox" style={{ '--stateX': `${state.x}0px`, '--stateY': `${state.y}0px` }}>
          <div className="greenBox" />
        </div>
        <div className="arrows">
          <div />
          <button onClick={createMove(0, -1)}>🔼</button>
          <div />
          <button onClick={createMove(-1, 0)}>⬅️</button>
          <div>⭐</div>
          <button onClick={createMove(1, 0)}>➡️</button>
          <div />
          <button onClick={createMove(0, 1)}>🔽</button>
          <div />
        </div>
      </div>
      <hr />
      <button onClick={doUndo} disabled={timeline.past.length === 0}>
        Undo
      </button>
      <button onClick={doRedo} disabled={timeline.future.length === 0}>
        Redo
      </button>
      <button
        onClick={doReset}
        disabled={timeline.past.length === 0 && timeline.future.length === 0}
      >
        Reset
      </button>
      <hr />
      <ul>
        <li>Past: {JSON.stringify(timeline.past)}</li>
        <li>Present: {JSON.stringify(timeline.present)}</li>
        <li>Future: {JSON.stringify(timeline.future)}</li>
      </ul>
    </div>
  );
}