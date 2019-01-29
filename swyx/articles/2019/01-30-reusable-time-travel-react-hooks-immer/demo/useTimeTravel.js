import React, { useReducer } from 'react';
import produce from 'immer';

const UNDO = Symbol('UNDO');
const REDO = Symbol('REDO');
const RESET = Symbol('RESET');
export function useTimeTravel(reducer, initialState) {
  const timeline = {
    past: [],
    present: initialState,
    future: []
  };
  const proxiedReducer = (tl, action) => {
    if (action === UNDO) return _doUndo(tl);
    if (action === REDO) return _doRedo(tl);
    if (action === RESET) return _doReset(tl);
    // else
    const newState = produce(tl.present, draft => reducer(draft, action));
    return _addNewPresent(tl, newState);
  };
  const [_timeline, _dispatch] = useReducer(proxiedReducer, timeline);
  return {
    state: _timeline.present,
    timeline: _timeline,
    dispatch: _dispatch,
    doUndo: () => _dispatch(UNDO),
    doRedo: () => _dispatch(REDO),
    doReset: () => _dispatch(RESET)
  };
}

function _addNewPresent(timeline, newPresent) {
  return produce(timeline, draft => {
    draft.past.push(draft.present);
    draft.present = newPresent;
    draft.future = [];
  });
}
function _doUndo(timeline) {
  return produce(timeline, draft => {
    if (!draft.past.length) return;
    const newPresent = draft.past.pop();
    draft.future.unshift(draft.present);
    draft.present = newPresent;
  });
}
function _doRedo(timeline) {
  return produce(timeline, draft => {
    if (!draft.future.length) return;
    const newPresent = draft.future.shift();
    draft.past.push(draft.present);
    draft.present = newPresent;
  });
}

function _doReset(timeline) {
  return produce(timeline, draft => {
    if (!draft.past.length) return;
    const newPresent = draft.past.shift();
    draft.future = [...draft.past, draft.present, ...draft.future];
    draft.present = newPresent;
    draft.past = [];
  });
}