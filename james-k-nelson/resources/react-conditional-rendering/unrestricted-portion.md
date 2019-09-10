import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet, UnlessStatic } from 'shared/documentHelpers'
import registrationWizard from './registration-wizard.gif'
export { breadboardHelpers } from './breadboardHelpers.js'

One of the first things you'll notices about React is that it doesn't have a special way to handle conditional rendering. Unlike Vue and Angular, there's no `if` prop or directive.

```html
<!-- In Vue, this div will only be rendered if `isGuest` is truthy -->
<div v-if="isGuest">
  <h1>I'm Sorry, Dave.</h1>
  <p>I'm afraid I can't do that.</p>
</div>
```

Of course, React *does* let you conditionally render elements. The difference is that with React, you don't need any special syntax; you just use plain JavaScript. But *how*?

This guide will help you master the four different approaches to conditional rendering with React. By following along, you'll learn how to simplify your logic using JSX and components, and you'll discover which patterns are best left alone. But before we get started, let's take a look at *why* React's approach is so unique...


React elements are JavaScript objects
-------------------------------------

When working with React, you'll often represent markup with JSX. Take the above snippet for instance (the one that apologizes to Dave). To render the same apology with JSX, you might write this:

```jsx
let readerName = "Dave"
let reactElement =
  <div>
    <h1>I'm Sorry, {readerName}.</h1>
    <p>I'm afraid I can't do that.</p>
  </div>

ReactDOM.render(reactElement, document.getElementById('root'))
```

At first glance, it may look like there's some HTML-in-JS hocus-pocus going on here. But the reality is much simpler: `reactElement` is just a plain-old JavaScript object.

When you compile JSX code, the compiler translates the JSX tags into calls to `React.createElement()` --- a function that returns plain old JavaScript objects. You can work these objects just as you'd work with any other objects. For example, you could explore the structure of the returned Element objects using `console.log()`.

*This example displays the compiled code at the bottom left, and the console output at the bottom right. If you edit the source at the top left, the other panes will automatically update.*

```jsx{unpersisted,defaultLeftPanel=transformedSource,defaultRightPanel=console,defaultIsLeftPanelSplit}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'

let readerName = "Dave"
let reactElement =
  <div>
    <h1>I'm Sorry, {readerName}.</h1>
    <p>I'm afraid I can't do that.</p>
  </div>

let h1Children = reactElement.props.children[0].props.children

console.log("h1 first child", h1Children[0])
console.log("h1 second child", h1Children[1])

ReactDOM.render(reactElement, document.getElementById('root'))
```

JSX tags become React Elements. React Elements are just JavaScript objects. And as a result, you can manipulate tags/elements using boring JavaScript features like `if` and `else`, `switch`.

<Aside>
<Details>

Want to figure out exactly what these Element objects are? Check out the free [Elements (are objects)](/courses/react-fundamentals/basics/elements-are-objects/) lesson from my [React fundamentals](/courses/react-fundamentals/) course.

</Details>
</Aside>


Approach #1: `if`/`else`
-----------------

When you return a JSX tag from a component function, what you're really returning is the object that was returned by the corresponding call to `React.createElement()`. JSX is just JavaScript... and like any other JavaScript code, you can add control statements!

For example, say that you're building a clone of this website. You've put together a `<Lesson>` component that renders a single lesson, but showing lessons to just anyone isn't going to work --- you want to fund more and better lessons! So you only want to render the lesson when the current user is authenticated...

<UnlessStatic>

<br />

<div>{props.callToAction}</div>

<br />

With access to the full guide, you'll learn all four approaches to conditional rendering, including:

- `if/else`
- `switch`
- The conditional operator
- The `&&` operator

You'll also discover:

- How to clean up switch statements by adding extra components.
- How JSX interpolation gives you a way to create inline if statements, like Vue's `v-if` directive.
- Three anti-patterns that you should avoid.

Finally, you'll test your new knowledge in the final exercise by implementing this Registration Wizard:

<Box />

To get immediate access to the guide, the exercise, and its solution, just click the big red button below!

<br />

<div>{props.callToAction}</div>

</UnlessStatic>

export function Box() {
  return <p style={{border: "5px solid #dae1f2", borderRadius: 10, padding: 0}}>
    <img src={registrationWizard} alt="Exercise demo" style={{margin: 0, display: 'block'}} />
  </p>
}