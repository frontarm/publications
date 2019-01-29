export const demoboardHelpers = {
  'App.js': require('!raw-loader!./demo/App.js'),
  'index.js': require('!raw-loader!./demo/index.js'),
  'styles.css': require('!raw-loader!./demo/styles.css'),
  'useTimeTravel.js': require('!raw-loader!./demo/useTimeTravel.js'),
}

**Bottom Line Up Front**: You'll learn how to build this demo -- with a `useTimeTravel` React hook.

```jsx
//--- App.js <-- App.js
//--- useTimeTravel.js <-- useTimeTravel.js
//--- index.js <-- index.js
//--- styles.css <-- styles.css
```

---

[React Hooks](https://reactjs.org/docs/hooks-overview.html) are a fundamentally simpler way to encapsulate custom behavior in user interfaces. 

If stateful React components are like an atom, hooks are the subatomic particles. We are given primitives like `useState` and `useReducer`, and we can compose and remix them in various quantities to create new elements with the exact properties we want.

Where `useState` is useful for reading and mutating atomic values, `useReducer` is better for updating collections (arrays and objects) of data that represent more complex states. It borrows heavily from Redux patterns in dispatching typed actions and passing through simple state machines. I will refer the reader to [the docs](https://reactjs.org/docs/hooks-reference.html#usereducer) rather than repeat them here.

## Tolerant User Interfaces

My favorite of the [six principles of User Interface Design](https://en.wikipedia.org/wiki/Principles_of_user_interface_design) is **Tolerance**, which asks the UI designer to limit the cost of mistakes by the user. By giving the user an implicit assurance that their work won't be lost without intention, they encourage play and discovery of everything else in the UI, which enables more serendipity with lower cognitive load. Many apps I see don't pass this simple test, and don't offer undo/redo capability even in UI that doesn't interact with a backend, probably because it is extra work.

We should make it easier to write Tolerant User Interfaces.

One easy way to reduce the number of irreversible actions is to make more things reversible. Implementing this with typical state primitives in React is troublesome, because those APIs tend to discard past state in favor of new state.

## Implementing a Timeline

So how do we implement tolerance in our React apps? We can stick historical state in another piece of state, or a global variable, but those solutions are problematic too. Better to treat state history just like another part of state:

```js
  const timeline = {
    past: [],
    present: initialState,
    future: []
  };
```

Because we're working with objects and arrays, we'd like to avoid defensive copying and use local mutability with structural sharing, so we introduce [immer](https://github.com/mweststrate/immer):

```js
import produce from 'immer'
```

(seriously, [go read the docs](https://github.com/mweststrate/immer))

And now we can write reducer methods to add new states:

```js
function _addNewPresent(timeline, newPresent) {
  return produce(timeline, draft => {
    draft.past.push(draft.present);
    draft.present = newPresent;
    draft.future = [];
  });
}
```

and move back in time:

```js
function _doUndo(timeline) {
  return produce(timeline, draft => {
    if (!draft.past.length) return;
    const newPresent = draft.past.pop();
    draft.future.unshift(draft.present);
    draft.present = newPresent;
  });
}
```

and Redo and Reset and so on.

## Proxying `useReducer` with the Timeline

Now that we've scoped out our Timeline data structure, we can think a bit about the reusability of it, and try to build it in to an idiomatic custom React Hook.

The `useReducer` API looks like this:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

Wouldn't it be nice if we could pass in a similar `reducer` to a different hook?

```js
const { state, dispatch, timeline, doUndo } = useTimeTravel(reducer, initialState);
```

And we could write the reducer in a locally mutable style?

```js
function reducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'MOVE':
      state.x += action.x;
      state.y += action.y;
  }
}
```

In order to accomplish this, we need to transform `reducer` and `initialState` into the `timeline` data structure, and then return nicely named, easy to work with variables in the result. This is trivial in custom hooks:

```js
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
    doUndo: () => _dispatch(UNDO), // nice to wrap action type
    doRedo: () => _dispatch(REDO), // nice to wrap action type
    doReset: () => _dispatch(RESET) // nice to wrap action type
  };
}
```

So working backwards from the API that we *want* to use, we were able write the custom hook logic in just a few lines of code.

We can use the destructured artefacts in our UI easily:

```jsx
const createMove = (x, y) => () => dispatch({ type: 'MOVE', x, y });
// later on...
<button onClick={createMove(0, -1)}>🔼</button>
<button onClick={createMove(-1, 0)}>⬅️</button>
<button onClick={createMove(1, 0)}>➡️</button>
<button onClick={createMove(0, 1)}>🔽</button>
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
```

And you can play with it here:

```jsx
//--- App.js <-- App.js
//--- useTimeTravel.js <-- useTimeTravel.js
//--- index.js <-- index.js
//--- styles.css <-- styles.css
```