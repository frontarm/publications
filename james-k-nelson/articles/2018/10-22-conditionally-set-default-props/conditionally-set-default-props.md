import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet } from 'shared/documentHelpers'

While most React components receive their props from a parent component, it's also possible to specify *default* props. To do so, you simply assign a `defaultProps` object to the component; when React renders the component, the default props will be used unless the parent overrides them.

```jsx
class Tooltip extends React.Component {
  // ...
}

// If the parent component doesn't specify a `delay` prop, then
// the value of `100` will be used.
Tooltip.defaultProps = {
  delay: 100,
}
```

Default props work great when the same default value can be used for every instance of the component. But what if you want the default value to depend on *other* props?

For example, what if you want your Tooltip component's `delay` prop to depend on the event that triggered the tooltip?

```jsx
// This won't work, as `this` doesn't point to a component instance.`
Tooltip.defaultProps = {
  delay: this.props.trigger === 'hover' ? 100: 0,
}
```

This presents a problem: the `defaultProps` object is shared amongst *all* instances of your component. It doesn't have access to `this`, let alone `this.props`.

Because there's only one `defaultProps` object, it turns out to be impossible to set conditional defaults using it. But luckily, there's are a few other ways to handle default props, and they're pretty darn simple.


## Approach 1: Compute the value when you need it

If the only place that you need the prop is within your component's render function, then you can just compute a default *within* the render function. 

To compute a default value, you'll need to check if your prop is `undefined`, and if so, use the default instead.

```jsx{unpersisted}
///index.js
import React from 'react'
import ReactDOM from 'react-dom'

export function App(props) {
  let delay = 
    props.delay !== undefined
      ? props.delay
      : (props.trigger === 'hover' ? 100 : 0)
  
  return <h1>Delay: {delay}</h1>
}

ReactDOM.render(
  <App delay={0} trigger='hover' />,
  document.getElementById('root')
)
```

It's important to actually compare the value of your prop with `undefined`. This makes it possible to specify [falsy](/articles/truthy-equality-coercion-in-javascript/) values like `0`. To get some intuition for this, try changing `props.delay === undefined` to `!props.delay` in the editor above. Notice how the printed value goes from `0` to `100`, despite the fact that a `delay={0}` prop is specified!


## Approach 2: `getSomething()`

When you have a prop that is used in multiple places, it's best to avoid computing the default each time it is used. Instead, you'll want to factor out the computation into a function. This makes maintenance easier, as you'll only ever need to change the default in one place.

```jsx
class Tooltip extends React.Component {
  getDelay() {
    return (
      this.props.delay !== undefined
        ? this.props.delay
        : (this.props.trigger === 'hover' ? 100 : 0)
    )
  }
  
  render() {
    let delay = this.getDelay()

    // ...
  }
}
```

You can also use this approach with function components -- just create a function that accepts the component's props, and returns the prop (or its default).

```jsx
function getDelay(props) {
  return (
    props.delay !== undefined
      ? props.delay
      : (props.trigger === 'hover' ? 100 : 0) 
  )
}

function Tooltip(props)  {
  let delay = getDelay(props)

  // ...
}
```


## Approach 3: `get something()`

If you gon't like the idea of writing out `getSomething()` every time that you need to use the prop, you can also use a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get). You can then access it through `this.something`.

Note that while this may look and feel simpler, it's really just hiding the work that is being done. Because of this, I'd recommend creating an explicit function instead, as in the above example.

```jsx
class Tooltip extends React.Component {
  get delay() {
    return (
      this.props.delay !== undefined
        ? this.props.delay
        : (this.props.trigger === 'hover' ? 100 : 0)
    )
  }
  
  render() {
    let delay = this.delay

    // ...
  }
}
```

So to summarize: props are just objects, so you can easily compute default values with plain JavaScript. And that's really all there is to it.

Thanks so much for reading! And if you've found this helpful, take a look at my [React (without the buzzwords) course](/courses/learn-raw-react/). It's packed full of live exampes and exercises, and will help deepen your understanding of React's fundamentals, including elements, function components, class components and events.

