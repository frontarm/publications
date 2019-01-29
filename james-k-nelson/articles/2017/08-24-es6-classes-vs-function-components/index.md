import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details } from 'shared/documentHelpers'

There are three rules I use to decide which way to declare my components.

1. If your component needs access to lifecycle methods, use a class
2. If your component needs access to `this`, use a class
3. Otherwise, use a function component

But where do these rules come from?

Well, rule #1 is easy: functions can't have methods. And if they can't have methods, they definitely can't have lifecycle methods. So if you need to manage the component's lifecycle, you'll need to use a class.

Rule #2 is also pretty easy -- function component don't have a `this` to access! You can see this in action in this demo:

```jsx{unpersisted}
import React from 'react'
import ReactDOM from 'react-dom'

function IsThisUndefined(props) {
  return <div>{props.title} {this === undefined ? 'Yes' : 'No'}!</div>
}

ReactDOM.render(
  <IsThisUndefined title='Is this undefined?' />,
  document.getElementById('root')
)
```

But rule #3 is a little less obvious. Sure, declaring a component using a function will save you 2 lines over a class. But class components provide extra features like state, ref and lifecycle methods. Even if your component doesn't need these features now, there is a good chance you'll need them later. And consistency has some value of itself. So why would you want to use function components at all?

Actually, the answer is simple: *simplicity has value in and of itself*. Extra features only give you extra value if you're actually using them. In fact, the extra constraints imposed by function components will gently steer you towards creating reusable components. It's almost magical.

So really, the rule is simple:

**If you don't need the extra features provided by class components, don't use class components.**

<h2>Further Reading...</h2>

- [Learn Raw React: Forms and Bound Events](/courses/learn-raw-react/state-and-events/forms-and-bound-events/#top)
