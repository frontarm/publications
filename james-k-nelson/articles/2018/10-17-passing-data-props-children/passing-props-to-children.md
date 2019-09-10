import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet } from 'shared/documentHelpers'
import { NavLink } from 'react-navi'
export { breadboardHelpers } from './breadboard-helpers.js'

One of React's most useful features is the ability for components to receive and render child elements. It makes it ridiculously easy to create reusable components. Just wrap `props.children` with some markup or behavior, and presto.

```jsx
const Panel = (props) =>
  <div className="Panel">
    {props.children}
  </div>
```

There is, however, one major limitation to this pattern: `props.children` must be rendered as-is. **What if you want the component to pass its *own* props to those children?**

For example, what if you're building a `<Link>` component, and you want its children to have access to an `active` prop that indicates whether the link points to the current page?

```jsx
<Link href="/browse/">
  <span className={active ? "active" : "inactive"}>Browse</span>
</Link>
```

Or what if you're building a `<List>`, and you want to automatically add some classes to the components children?

```jsx
<List>
  <Item className="top" />
  <Item className="bottom" />
</List>
```

As it turns out, there are a couple ways to achieve this:

- You can pass a **render function** to your component in place of its children.
- You can merge new props into the elements passed to `props.children` by **cloning** them.

Both approaches have their advantages and disadvantages, so let's go over them one at a time before discussing how they compare.


Render functions
----------------

One of the neat things about JSX is that its elements are just JavaScript objects. This means that a JSX element's `props` and `children` can be anything that you could place in a JavaScript variable -- they can be strings, other element objects, *or even functions*.

The simplest way to use a function as an element's `children` is to interpolate an arrow function with JSX. This pattern is often called passing a **render function**. Here's an example:

```jsx
// Display a link, whose style changes depending on whether the
// link points to the window's current location.
<Link href='/browse'>
  {isActive => (
    <span style={{ color: isActive ? 'red' : 'black' }}>
      Browse
    </span>
  )}
</Link>
```

<Aside>
<Details title="Passing data to descendants">

While render functions allow components to pass data to their immediate children, React's [context API](https://reactjs.org/docs/context.html) lets components pass data to deeply nested descendants. In fact, the context API itself uses render functions.

</Details>
</Aside>

In the above example, the `<Link>` component will receive a `children` function that expects to be called with a single argument: `isActive`. The component can then call the function whenever the user navigates, and then return the result from its own `render()` function.

Here's an example of what this might look like if the `<Link>` element receives the window's current location via [context](/articles/when-context-replaces-redux/) (which itself uses a render function):

```jsx
export const Link = (props) =>
  <LocationContext.Consumer>
    {location =>
      <a {...props}>
        {
          // Call the render function to get the `<a>` tag's children.
          props.children(location.pathname === props.href)
        }
      </a>
    }
  </LocationContext.Consumer>
```

<Aside>
<Details title="It can also be called...">

The term *render function* is also used when passing a function to the `render` prop -- as opposed to the `children` prop.

This pattern is also sometimes referred to as a *render prop*.

</Details>
</Aside>

**Render functions are typically used when the children that are passed to a component may utilize some state that is contained *within* that component.** But render functions aren't always the perfect solution. In cases where you need to squeeze every last drop of performance out of a component, or when a function just *feels* wrong, then cloning can come in handy.


Cloning children
----------------

While it's certainly possible to pass a function as an element's `children` prop, it's *far* more common to pass JSX elements. And given that JSX elements are actually plain old JavaScript objects, it follows that the component that receives those elements should be able to pass in data by *updating* props.

Unfortunately, attempting to set an element's `props` will cause an error.

```jsx{unpersisted,defaultRightPanel=console,defaultIsRightPanelMaximized}
import React from 'react'

// Create an element object and assign it to `element`
let element = <div>Hello, world!</div>

// Log the value of the `children` prop
console.log(element.props.children)

// Oh no! This doesn't work.
element.props.className = "active"
```

It turns out that element objects are *immutable* objects. Once they've been created, you can't change them. But you *can* clone them -- and merge in updated props in the process. 

To clone an element, you'll need to use React's `cloneElement()` function.

```jsx
React.cloneElement(element, props, ...children)
```

The `cloneElement()` function returns a new element object with the same `type` and `props` as its first argument, but with the specified `props` and `children` merged over the top.

For example, here's how you'd use it to add a `className` prop to an existing element.

```jsx{unpersisted,defaultRightPanel=console,defaultIsRightPanelMaximized}
import React from 'react'

// Create an element object and assign it to `element`
let element = <div>Hello, world!</div>

// Create a clone of the element, adding in a new `className` prop
// in the process.
let elementWithClassName =
  React.cloneElement(element, { className: "active" })

// The new element has a `className`!
console.log("new className", elementWithClassName.props.className)
```

If you're comfortable with React's [createElement()](/courses/react-fundamentals/basics/elements-are-objects/) function, then `cloneElement()` will feel familiar -- the only difference is that it accepts an element in place of a `type`. Of course, given that you won't use `cloneElement()` all that often, you might want some help remembering it. And that's what my [printable React cheatsheet](/toolbox/react-cheatsheets/) is for -- its a free download! But I digress. So let's move on to an example.

<NavLink href="/toolbox/pdf-cheatsheets/">
  <img alt="Printable React cheatsheet" src={require("./react-cheatsheet-thumbnail.png")} />
</NavLink>


Cloning props onto `children`
-----------------------------

Suppose that you have a `<List>` component, and that you'd like it to add `top` and `bottom` CSS classes to the first and last children. Let's also say that when your list only has one child, it should add both classes to the child.

```jsx
<List>
  <div className="top bottom" />
</List>
```

In the case of a single child, this can be accomplished by cloning it and adding a `className` prop with the value `top bottom`, as so.

```jsx{unpersisted}
///App.js
import React from 'react'

const List = (props) => (
  <div className="List">
    {React.cloneElement(props.children, { className: "top bottom" })}
  </div>
)

export const App = () =>
  <List>
    <div>Tame Impala</div>
  </List>
///index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///helper:styles.css
```

But while this works when `<List>` only receives a single child, it fails spectacularly when you you pass multiple children. You can check this for yourself -- just add a few more band names to the the list in the above example.


Manipulating `children`
-----------------------

Components never know what type of data their `children` prop will be. It could be an array, it could be an element, it could be text. It could be *anything*.

Working with data of type "anything" is never fun. Luckily, React provides some tools to help on its [React.Children](https://reactjs.org/docs/react-api.html#reactchildren) object. In particular, the `React.Children.toArray()` function will come in handy for this example.

```js
// Always returns an array.
React.Children.toArray(children)
```

The `React.Children.toArray()` function does exactly what you'd imagine it does. You pass it a `children` prop, and it'll return an array. If `children` only contains one child, it'll *wrap* that child in an array, which you can then `slice()` and `concat()` like a ninja.

To put this all together, here's how you'd use `React.Children.toArray()` with `React.cloneElement()` to add `top` and `bottom` classes to the List component's children.

```jsx{unpersisted}
///App.js
import React from 'react'

const List = (props) => {
  let elements = React.Children.toArray(props.children)

  if (elements.length === 1) {
    elements = React.cloneElement(elements[0], { className: 'top bottom' })
  }
  else if (elements.length > 0) {
    let lastElement = elements[elements.length - 1]
    elements =
      [React.cloneElement(elements[0], { className: 'top' })]
        .concat(elements.slice(1, -1))
        .concat(React.cloneElement(lastElement, { className: 'bottom' }))
  }
  
  return (
    <div className="List">
      {elements}
    </div>
  )
}

export const App = () =>
  <List>
    <div>Tame Impala</div>
    <div>Kingswood</div>
    <div>Flight Facilities</div>
  </List>
///index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///helper:styles.css
```

The above example might not be pretty, but it works... most of the time.


Edge cases
----------

One of the problems with cloning children is that it can be pretty easy to get wrong. There are a lot of edge cases, and unlike with render functions, you'll need to take account of *all* of those edge cases within the component that does the cloning.

For example, if you were to add a `className` prop to the top or bottom `<div>` in the above demo, the `<List>` component would remove it in place of the `top` or `bottom` class. You can see this in the following example, where I've added the `highlight` class to the top two rows, but only the middle row is actually highlighted.

To fix this, you'll need to *append* a string to the `className` instead of replacing it. In fact, let's do this as an exercise!

**Your task is to ensure that the top and bottom elements of the list render with both their original class, as well as a `top` or `bottom` class.**

*Hint: as `React.cloneElement()` only knows how to replace props, you'll need to figure out how to build the new string by inspecting the original element.*

```jsx{unpersisted,theme=dark}
///App.js
import React from 'react'

const List = (props) => {
  let elements = React.Children.toArray(props.children)

  if (elements.length === 1) {
    elements = React.cloneElement(elements[0], { className: 'top bottom' })
  }
  else if (elements.length > 0) {
    let lastElement = elements[elements.length - 1]
    elements =
      [React.cloneElement(elements[0], { className: 'top' })]
        .concat(elements.slice(1, -1))
        .concat(React.cloneElement(lastElement, { className: 'bottom' }))
  }
  
  return (
    <div className="List">
      {elements}
    </div>
  )
}

export const App = () =>
  <List>
    <div className="highlight">Tame Impala</div>
    <div className="highlight">Kingswood</div>
    <div>Flight Facilities</div>
  </List>
///solution:App.js
import React from 'react'

const List = (props) => {
  let elements = React.Children.toArray(props.children)

  if (elements.length === 1) {
    let className = (elements[0].props.className || '') + ' top bottom'
    elements = React.cloneElement(elements[0], { className })
  }
  else if (elements.length > 0) {
    let lastElement = elements[elements.length - 1]
    let firstClassName = (elements[0].props.className || '') + ' top'
    let lastClassName = (lastElement.props.className || '') + ' bottom'
    elements =
      [React.cloneElement(elements[0], { className: firstClassName })]
        .concat(elements.slice(1, -1))
        .concat(React.cloneElement(lastElement, { className: lastClassName }))
  }
  
  return (
    <div className="List">
      {elements}
    </div>
  )
}

export const App = () =>
  <List>
    <div className="highlight">Tame Impala</div>
    <div className="highlight">Kingswood</div>
    <div>Flight Facilities</div>
  </List>
///index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///helper:styles.css
```

How'd you go? If you got stuck on this exercise, head on over to my [React fundamentals course](/courses/react-fundamentals/). It'll leave you as a master of React's element objects, and you can get started immediately!


Which approach should I take?
-----------------------------

The render function approach has recently grown in popularity. In fact, React itself now makes use of render props in its own context API, and provides [documentation](https://reactjs.org/docs/context.html) on the official website.

But why have render functions become so popular? There's a couple reasons:

- Render functions make it clear that data is being added to your children, while cloning hides the additional props within another component's implementation.
- As arrow functions have become more common in application code, render functions are becoming less exotic and easier to understand at first glance.

Of course, there are still situations in which cloning makes sense:

- If you want to add props to a list of child elements, cloning will probably be more readable than creating a list of render functions.
- When you need to squeeze every last drop of performance out of your code, cloning can be a lot faster than render functions.

So which should you use?

**My recommendation is to use render props where possible.** But you don't have to avoid `cloneElement()` completely -- its still a useful and effective tool when used in moderation.

---

Thanks so much for reading! If you've found this helpful, take a look at my complete [React fundamentals course](/courses/react-fundamentals/). It's packed full of live examples and exercises, and will help deepen your understanding of React's fundamentals, including:

- elements
- function components
- events
- hooks
- class components
- *and more*

You can try out the [first lessons and exercises](/courses/react-fundamentals/basics/one-file-react-app/) for free -- see you there!

