import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside } from 'shared/documentHelpers'

Yep, arrow functions are great. They *do* look nicer, they *do* take less keystrokes, and they *are* more fun. But there is a much better reason to use arrow functions...

## Arrows prevent `this` bugs

Arrow functions don't redefine the value of `this` within their function body. This makes it a lot easier to predict their behavior when passed as callbacks, and prevents bugs caused by use of `this` within callbacks.

Here's an example of the type of bug that arrow functions prevent. At first glance, you may expect the button's background color to change to red when you click it. But if you actually click the button, you'll find that nothing changes...

```js{unpersisted,defaultRightPanel=console}
import React from 'react'
import ReactDOM from 'react-dom'

class BrokenButton extends React.Component {
  render() {
    return (
      <button onClick={this.handleClick} style={this.state}>
        Set background to red
      </button>
    )
  }

  handleClick() {
    this.setState({ backgroundColor: 'red' })
  }
}

ReactDOM.render(
  <BrokenButton />,
  document.getElementById('root')
)
```

So what's gone wrong? The problem is that the `handleClick` method isn't a method at all! *JavaScript doesn't actually have methods.* It only has functions. And the value of `this` inside those functions has some funny rules. In this case, those rules cause `this` to be `null`.

<Aside>
<Details>

Don't believe `this` is `null`? You can check it by inserting `alert(this)` as the first line of `handleClick()`.

</Details>
</Aside>

Let's test your understanding with a little quiz: can you explain the reason that `this` is `null` in the example? Spend a few moments figuring it out, then check your answer below.

<Spoiler title='show answer'>

In a JavaScript method, the value of `this` has nothing to do with the class on which it was *defined*. Instead, it depends on the object that it was called *upon*.

In terms of `.` syntax, this means that if you call `obj.someMethod()`, the value of `this` within `someMethod` will be `obj` -- regardless of where `someMethod` was originally defined! If you just call `someMethod()` without using a `.`, `this` will be `null`.

There are two important exceptions:

- You can force a specific value of `this` with a function's `call`, `apply` and `bind` methods
- If the function is an `=>` arrow function, `this` is hard-wired to refer to the value of `this` at the location where the function was defined

None of these exceptions apply in the above example, and you don't know how `handleClick` is called (because it is called within the React's `button` component). As such, you have no idea what `this` will be!

</Spoiler>

<Aside>
<Reference title='JS Reference'>

My explanation of `this` is a bit like high school chemistry; it's a nice idea but it may give an expert a heart attack.

If all you want to do is use React, it is probably good enough. But otherwise go read the details at [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/this).

</Reference>
</Aside>

How'd you go? Don't worry too much if you're a little confused; `this` is confusing, even for the experts. But there is one important thing that you need to remember:

*Once you've passed a method as a callback, you have no idea how it will be called, and thus no idea what `this` will be.*

That is, unless you use an arrow function.

In an arrow function, `this` means the same thing *within* the function body as it does *outside* of it. Which means that if you use arrow functions within your component's `render` or lifecycle methods, they can use `this` and `this.setState` with no surprises.

For example, you could fix the above example by replacing the `handleClick` callback with an arrow function:

```js{unpersisted}
import React from 'react'
import ReactDOM from 'react-dom'

class Button extends React.Component {
  render() {
    return (
      <button
        onClick={() => this.setState({ backgroundColor: 'red' })}
        style={this.state}
      >
        Set background to red
      </button>
    )
  }
}

ReactDOM.render(
  <Button />,
  document.getElementById('root')
)
```

Simple, right? But if you do need help remembering the rule, just remember that *arrow functions can't touch this!*

<iframe width="560" height="315" src="https://www.youtube.com/embed/otCpCn0l4Wo" frameBorder="0" allowFullScreen></iframe>

But this old-school classic doesn't explain why you *wouldn't* want to use arrow functions. So let's continue.

## Browser support

Browser support for arrows in September 2018 is [around 87%](https://caniuse.com/#feat=arrow-functions), i.e. everything except IE (pun intended -- sorry!) This means that you wouldn't want to use arrow functions if you're writing raw JavaScript for IE. But you already know that. And you're probably transpiling your code anyway.

## Performance implications

The biggest problem you can have with arrows is that they're *too* easy to define. You may find yourself defining functions where don't actually need them. But why would too many functions be a problem?

### Function definition is... usually not that expensive

Each time your browser executes a `=>` statement, it needs to create a *new* function object. And this can be an expensive operation, depending on the circumstances.

As of September 2018, older browsers like IE and Safari can still be orders of magnitude slower at defining functions than calling existing ones. However, for modern versions of Chrome and Firefox, arrow functions are insignificant from a performance perspective. To get a feel for this, try running [this benchmark](https://jsperf.com/function-call-vs-definition/1) over a number of different browsers.

But say you're unlucky enough to be building a major app that needs to support older browsers. Even then, you'll need to be defining hundreds or thousands of arrow functions per second for it to become an issue. I've only ever run into one such situation, which was with very large virtualized tables with event handlers on every cell.

So don't panic about the performance cost. If your component is only rendering once or twice on a page, it won't be a problem. And if you do start rendering enough elements to feel some lag, you can easily factor out the arrows later. 

### Two functions are never equal to each other

While arrow functions *can* slow down a component, the bigger problem is that they can slow down child components. Which isn't to say that they *will* slow down child components; they probably won't. That is, they won't unless those child components are optimized with `PureComponent` or `shouldComponentUpdate`.

So what's the problem? Two identical arrow functions are not equal. You can see this for yourself in the example below, where the functions `a` and `b` are equivalent, but not equal:

```js{unpersisted}
import React from 'react'
import ReactDOM from 'react-dom'

const a = (x) => x,
      b = (x) => x

ReactDOM.render(
  <div>
    <h3>Are <code>a</code> and <code>b</code> equal by <code>==</code>?</h3>
    <p>{a == b ? 'Yes!' : 'No :('}</p>
  </div>,
  document.getElementById('root')
)
```

<Aside>
<Details>

Optimizations based on `PureComponent` and `shouldComponentUpdate` work by skipping work when no `props` have changed. Learn more at the [React docs](https://facebook.github.io/react/docs/optimizing-performance.html#avoid-reconciliation).

</Details>
</Aside>

If you use arrow functions within `render`, each call to render will create *new* function objects. If you then pass these functions to child elements via `props`, optimizations based on `PureComponent` or `shouldComponentUpdate` will fail (as the arrow function props will change on every render).

You can see this in action in the following example where the `<PropChangeCounter />` component prints the number of times that each of its props have changed. Notice how `constant` doesn't change, while `onChange` does. This is because each call to `render` creates a new arrow function!

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import PropChangeCounter from './PropChangeCounter.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '' }
  }
  render() {
    return <div>
      <input
        placeholder="Email"
        value={this.state.email}
        onChange={e => this.setState({ email: e.target.value })}
      />
      <PropChangeCounter
        constant={"this doesn't change"}
        value={this.state.email}
        onChange={e => this.setState({ email: e.target.value })}
      />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
///PropChangeCounter.js
import React from 'react'

const el = React.createElement

export default class PropChangeCounter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.title = props.title
    this.counts = {}
    for (let key of Object.keys(props)) {
      this.counts[key] = 0
    }
  }
  componentWillReceiveProps(nextProps) {
    const keys = Array.from(new Set(Object.keys(nextProps).concat(Object.keys(this.props))))
    for (let key of keys) {
      if (this.props[key] !== nextProps[key]) {
        this.counts[key] = (this.counts[key] || 0) + 1
      }
    }
  }
  render() {
    return (
      el('div', { style: { border: '1px dotted #888', padding: '10px' } },
        el('h3', { style: { margin: 0 } }, "prop change counts"),
        el('ul', { style: { padding: 0, margin: 0, listStyle: 'none' } },
          ...Object.keys(this.counts).map(key =>
            el('li', { key, style: { margin: 0 } },
              el('strong', {}, key+': '),
              this.counts[key],
              " changes"
            )
          )
        )
      )
    )
  }
}
```

To reiterate, *arrow functions do not affect performance*. The problems only arise when you re-create the same arrow function on each render. Which means there is a simple fix...

### Defining arrows once

If performance is important for your component, you'll want to define any arrow functions just once. And the obvious time to do this is when the component loads.

One way of accomplishing this would be to define all your arrow functions in the constructor. Of course, this would become unwieldy for any reasonably complex component, and wouldn't really have any benefit over simply using [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

However, if you're using Babel (or create-react-app) to build your source, you have another option: setting arrow functions as [class fields](https://github.com/tc39/proposal-class-fields) (or **arrow methods**).

For example, you could fix the bug in the first example by redefining `handleClick` as an arrow function method:

```js{unpersisted}
import React from 'react'
import ReactDOM from 'react-dom'

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.handleClick} style={this.state}>
        Set background to red
      </button>
    )
  }

  // Note: As of September 2018, this syntax is not yet part of
  // JavaScript proper, but is slated for inclusion soon. It should
  // already work with Babel.
  handleClick = () => {
    this.setState({ backgroundColor: 'red' })
  }
}

ReactDOM.render(
  <Button />,
  document.getElementById('root')
)
```

This gives you the best of both worlds. You get the improved performance from only defining functions once, but you still get the simple method-like syntax.

## Don't Panic

A [wise man](https://en.wikiquote.org/wiki/Donald_Knuth) once said that "premature optimization is the root of all evil". He was probably exaggerating a *little bit*, but the point he was trying to make is a good one.

**You won't introduce any bugs by using too many arrow functions.** You probably will introduce bugs but not using enough.

So to wrap things up, here are the three rules of arrow functions:

1. If your environment supports arrow methods, you can use them for *all* methods.

2. Use arrow functions within `render`. It's ok. I promise.

3. If performance becomes an issue, check whether arrow functions are causing `PureComponent` or `shouldComponentUpdate` to make unnecessary updates.

