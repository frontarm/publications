import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet } from 'shared/documentHelpers'
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

When you compile JSX code, the compiler translates the JSX tags into calls to `React.createElement()` -- a function that returns plain old JavaScript objects. You can work these objects just as you'd work with any other objects. For example, you could explore the structure of the returned Element objects using `console.log()`.

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

Want to figure out exactly what these Element objects are? Check out the free [Elements (are objects)](/courses/learn-raw-react/basics/elements-are-objects/) lesson from my [React (without the buzzwords)](/courses/learn-raw-react/) course.

</Details>
</Aside>


Approach #1: `if`/`else`
-----------------

When you return a JSX tag from a component function, what you're really returning is the object that was returned by the corresponding call to `React.createElement()`. JSX is just JavaScript... and like any other JavaScript code, you can add control statements!

For example, say that you're building a clone of this website. You've put together a `<Lesson>` component that renders a single lesson, but showing lessons to just anyone isn't going to work -- you want to fund more and better lessons! So you only want to render the lesson when the current user is authenticated.

Let's say that your `<Lesson>` component receives an `isAuthenticated` prop. Bearing in mind that returning `null` from a component causes it to render *nothing*, you could implement the paywall with an `if` statement -- as in the following example. See it in action by setting `isAuthenticated` to `false` on line 17.

*If you're uncertain how JSX tags corresponds to Element objects, click the "Compiled" button at the editor's bottom left to see how the JSX tags are transformed into calls to `React.createElement()`.*

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'

function Lesson(props) {
  if (!props.isAuthenticated) {
    return null
  }

  // JSX tags are just objects, and like any other object, can be
  // returned from functions.
  return (
    <div>
      <h1>React (without the buzzwords)</h1>
      <p>In this course, you'll master React's fundamentals...</p>
    </div>
  )
}

ReactDOM.render(
  <Lesson isAuthenticated={true} />,
  document.getElementById('root')
)
```

This achieves a similar result to the earlier Vue example. It prevents the content from being rendered when `props.isAuthenticated` is falsy. And becuase custom components like `<Lesson>` don't add any extra DOM nodes, it does this all without adding any superflous markup.

<Aside>
<Reference title="truthy? falsy?">

*Truthy* and *Falsy* are actually [technical terms](/articles/truthy-equality-coercion-in-javascript/).

</Reference>
</Aside>

But while the above implementation does work, it isn't ideal. Showing logged-out readers a blank screen is... a little rude. Instead, let's show them a link to the login page. In fact, let's do this as an exercise!

**Your task is to update the example below to show a link to `/login` when `isAuthenticated` is falsy. The component should continue to show the content when the user is authenticated.**

*The editor below will save your code and re-render as you type. Once you're happy with your code, click the "solution" button along the bottom to compare your answer with mine!* 

```js{theme=dark}
///name:Conditional rendering exercise: if/else
///main.js
import React from 'react'
import ReactDOM from 'react-dom'

function Lesson(props) {
  if (!props.isAuthenticated) {
    return null
  }

  return (
    <div>
      <h1>React (without the buzzwords)</h1>
      <p>In this course, you'll master React's fundamentals...</p>
    </div>
  )
}

ReactDOM.render(
  <Lesson />,
  document.getElementById('root')
)
///solution:main.js
import React from 'react'
import ReactDOM from 'react-dom'

function Lesson(props) {
  if (props.isAuthenticated) {
    return (
      <div>
        <h1>React (without the buzzwords)</h1>
        <p>In this course, you'll master React's fundamentals...</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>I'm Sorry, Dave.</h1>
        <p>I'm afraid you must <a href="/login">login</a> first.</p>
      </div>
    )
  }
}

ReactDOM.render(
  <Lesson />,
  document.getElementById('root')
)
```


Interpolation vs. `return`
--------------------------

Conditional rendering with `if`/`else` is a powerful feature. Along with the ability to define custom components, it can be used to implement any conditional rendering logic that you need. *But it doesn't always make it easy to do so.*

To understand the limitations of `if`/`else` as used above, consider how you'd go about extending the `<Lesson>` component. Let's say that you want it to display a header and a menu *regardless* of whether the user is authenticated, along with some sample content and a signup button if the user isn't registered. There are a few ways you could approach this.

### 1. Repeated markup

One option would be to repeat the common markup in both the `if` and the `else` clause.

```js
function Lesson(props) {
  if (props.isAuthenticated) {
    return (
      <div>
        <Header title={props.title} />
        <Sidebar outline={props.outline} />
        <Content document={props.contentDocument} />
      </div>
    )
  }
  else {
    return (
      <div>
        <Header title={props.title} />
        <Sidebar outline={props.outline} />
        <Content document={props.sampleDocument} />
        <Banner />
      </div>
    )
  }
}
```

But this is long-winded, prone to error, and... kinda shitty, really. Don't do this. There are better options.


### 2. A separate component

To eliminate repetition, you could extract the parts that depend on the user's authentication state into a new child component.

<Aside>
<Reference title="Fragments">

The `<React.Fragment>` element is a special component that can be used to return a list of children, without requiring a wrapper element within the DOM, and without requiring `key` props (as you need when returning arrays of elements).

For more details, see the [React documentation &raquo;](https://reactjs.org/docs/fragments.html)

</Reference>
</Aside>

```js
function Lesson(props) {
  let lesson = props.lesson

  return (
    <div>
      <Header title={props.lesson.title} />
      <Sidebar outline={props.lesson.outline} />
      <LessonBody
        lesson={props.lesson}
        isAuthenticated={props.isAuthenticated}
      />
    </div>
  )
}

function LessonBody(props) {
  if (props.isAuthenticated) {
    return <Content document={props.lesson.document} />
  }
  else {
    return (
      <React.Fragment>
        <Content document={props.lesson.sampleDocument} />
        <Banner />
      </React.Fragment>
    )
  }
}
```

While this removes the repetition, it introduces a lot of boilerplate and makes the code harder to follow. This pattern *can* be useful, but you'll usually want to follow the third approach.


### 3. Interpolation

JSX allows you to interpolate variables with it's curly brace `{}` syntax.

```js
let welcomeMessage = <h1>Welcome, {user.name}!</h1>
```

This is often used to interpolate names and numbers. But JSX isn't limited to textual content; it also let's you interpolate "empty" variables like `null` and `undefined`, and even lets you interpolate tags and element objects!

But how does this work? Recall that JSX tags are translated to calls to `React.createElement()`, and children -- including text, tags and interpolated variables -- are just mapped to the third and subsequent arguments. Interpolated variables can act as text, tags, or be ignored completely depending on their contents!

You can get a feel for this by playing with the value of `readerName` in the example below. Try wrapping it in a `<marquee>` tag, changing it to `0`, and then setting it to `null`.

*If you're still getting used to JSX, take a look at how the interpolated variable is added as an argument to `React.createElement()` in the bottom left panel.*

```jsx{unpersisted,defaultLeftPanel=transformedSource,defaultIsLeftPanelSplit}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'

let readerName = "to the Hotel California"
let welcomeMessage =
  <h1>
    <em>Welcome</em>, {readerName}!
  </h1>

ReactDOM.render(
  welcomeMessage,
  document.getElementById('root')
)
```

But what does all this have to do with conditional rendering? Well, the value of a variable can be decided using `if`, `else` and JavaScript's other goodies -- and then interpolated into your JSX! And with this in mind, it's time for an exercise.

**Your task is to prevent the `<Banner />` element from being shown to authenticated users, without using any tag twice or creating any further components.**

```js{theme=dark}
///name:Conditional rendering exercise: interpolation
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Header, Sidebar, Content, Banner } from './layout.js'
import { lesson } from './lesson.js'

function Lesson(props) {
  let lesson = props.lesson
  let document = props.lesson.document
  if (!props.isAuthenticated) {
    document = props.lesson.sampleDocument
  }

  return (
    <div>
      <Header title={props.lesson.title} />
      <Sidebar outline={props.lesson.outline} />
      <Content document={document} />
      <Banner />
    </div>
  )
}

ReactDOM.render(
  <Lesson lesson={lesson} isAuthenticated={true} />,
  document.getElementById('root')
)
///solution:main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Header, Sidebar, Content, Banner } from './layout.js'
import { lesson } from './lesson.js'

function Lesson(props) {
  let lesson = props.lesson
  let document = props.lesson.document
  let banner
  if (!props.isAuthenticated) {
    document = props.lesson.sampleDocument
    banner = <Banner />
  }

  return (
    <div>
      <Header title={props.lesson.title} />
      <Sidebar outline={props.lesson.outline} />
      <Content document={document} />
      {banner}
    </div>
  )
}

ReactDOM.render(
  <Lesson lesson={lesson} isAuthenticated={true} />,
  document.getElementById('root')
)
///helper:layout.js
///helper:lesson.js
///helper:style.css
```

**React is just JavaScript.** Conditional rendering is just JavaScript too, once you look past the JSX tags. And as it happens, `if`/`else` isn't the only way to perform conditional logic with JavaScript...


Approach #2: `switch`
---------------------

<Aside>
<Reference title='The "switch" statement'>

If you need to review how JavaScript's `switch` statement works, take a look at [MDN's guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch).

</Reference>
</Aside>

When you've got a lot of different options to handle, writing `if` conditions for each of them can be tedious. Luckily, JavaScript's `switch` statement makes it easy to build components that handle many different scenarios.

Switch statements are a particularly good way to implement components whose output varies with the status of some state machine. For example, let's say that you've been asked to build an Install Wizard using React. If you're not old enough to remember install wizards, the idea was that you were presented with 10 or 20 meaningless screens, where on each screen you'd need to press "Next" to get to the next one, to prove that you really actually did want to use that software.

So let's say that you've decided to create an `<View>` component that receives a `currentStep` prop. You could implement it using a `switch` statement!

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Step1, Step2, Step3, Complete, Controller } from './wizard.js'

function View(props) {
  switch (props.currentStep) {
    case 1:
      return <Step1 onClickNext={props.onClickNext} />
    case 2:
      return <Step2 onClickNext={props.onClickNext} />
    case 3:
      return <Step3 onClickNext={props.onClickNext} />
    default:
      return <Complete />
  }
}

ReactDOM.render(
  <Controller>
    {({ currentStep, onClickNext }) =>
      <View currentStep={currentStep} onClickNext={onClickNext} />
    }
  </Controller>,
  document.getElementById('root')
)
///wizard.js
import React from 'react'

export const Step1 = (props) =>
  <div>
    <h2>Setup React 95 - Step 1</h2>
    <p><strong>React 95</strong> gives you access to an extension to JavaScript called <strong>JSX</strong></p>
    <p>Would you like to try <strong>JSX</strong>?</p>
    <button onClick={props.onClickNext}>OK!</button>
  </div>

export const Step2 = (props) =>
  <div>
    <h2>Setup React 95 - Step 2</h2>
    <p><strong>React 95</strong> includes the new <strong>npm</strong> tool, giving you access to useful packages like <strong>left-pad</strong> and <strong>coffeescript</strong>.</p>
    <p>NPM requires at least a Pentium 2 200mhz with 64mb of RAM. Do you want to install NPM?</p>
    <button onClick={props.onClickNext}>My computer meets NPM's requirements.</button>
  </div>
  
export const Step3 = (props) =>
  <div>
    <h2>Setup React 95 - Step 3</h2>
    <p><strong>React 95</strong> is optimized for Netscape Navigator 4 and Internet Explorer 4, giving you access to an array of modern debug tools like <code>alert()</code> and <code>confirm()</code>.</p>
    <p>Let's get started.</p>
    <button onClick={props.onClickNext}>Install</button>
  </div>
 
export const Complete = (props) =>
  <div>
    <h2>React 95 is installed!</h2>
    <p>See you next at the next release!</p>
  </div>

export class Controller extends React.Component {
  constructor() {
    super()
    this.state = {
      currentStep: 1,
    }
    this.next = this.next.bind(this)
  }

  render() {
    return this.props.children({
      onClickNext: this.next,
      currentStep: this.state.currentStep
    })
  }
  
  next() {
    this.setState(state => ({
      currentStep: state.currentStep + 1
    }))
  }
}
///style.css
body {
  margin: 0;
  font-family: Lato, sans-serif;
}
h2 {
  padding: 1rem;
  margin: 0 0 1rem;
  background-color: #61dafb;
  color: white;
}
p {
  padding: 0.25rem 1rem;
}
button {
  margin: 1rem;
  font-size: 1rem;
  background-color: white;
  border: 2px solid #61dafb;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
}
```

<Reference title="Controllers">

If you're unsure how the `<InstallWizardController>` element in the above example provides `currentStep` and `onClickNext` to the `<InstallWizardView>` element, you can learn the details at my guide to [The Controller Component Pattern &raquo;](/articles/controller-components/)

</Reference>

Switches work great when you have a component that returns a completely different result for each case, as in the above example. This is because you can `return` an element within the switch, eliminating the need for separate `break` statements.

However, switches don't work so great with interpolation; the extra `break` statements introduce a lot of boilerplate, and room for error.

```js
function InstallWizardView(props) {
  let stepContent
  switch (props.currentStep) {
    case 1:
      stepContent = <Step1 onClickNext={props.onClickNext} />
      break
    case 2:
      stepContent = <Step2 onClickNext={props.onClickNext} />
      break
    case 3:
      stepContent = <Step3 onClickNext={props.onClickNext} />
      break
    default:
      stepContent = <Complete />
  }

  return (
    <div>
      <header>
        <h2>Step {props.currentStep}</h2>
      </header>
      {stepContent}
    </div>
  )
}
```

This is one of the few cases where it can make sense to create a child component specifically to handle conditional rendering. For example, here's how you'd refactor the above component.

```js
function StepContent(props) {
  switch (props.currentStep) {
    case 1: return <Step1 onClickNext={props.onClickNext} />
    case 2: return <Step2 onClickNext={props.onClickNext} />
    case 3: return <Step3 onClickNext={props.onClickNext} />
    default: return <Complete />
  }
}

function InstallWizardView(props) {
  return (
    <div>
      <header>
        <h2>Step {props.currentStep}</h2>
      </header>
      <StepContent currentStep={props.currentStep} />
    </div>
  )
}
```

Approach #3: The Conditional Operator
---------------------------------

<Aside>
<Reference title="Conditional Operator">

To learn more about the conditional operator itself, [see MDN &raquo;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

</Reference>
</Aside>

JavaScript's conditional operator is a little like a shorthand `if`/`else` statement, but with one crucial difference: *it's an expression, not a statement*.

```js
ifTrue ? thenA : elseB
```

What this means is that unlike `if`/`else`, you can use the conditional operator wherever you can use a variable. For example, you can conditionally:

- Return different elements from a function component
- Assign different values to a variable
- Interpolate different values into a JSX tag

For example, here's how you'd refactor the `<Lesson>` component from earlier on to use the conditional operator:

```jsx{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Header, Sidebar, Content, Banner } from './layout.js'
import { lesson } from './lesson.js'

function Lesson(props) {
  let isAuthenticated = props.isAuthenticated
  let lesson = props.lesson
  let document = isAuthenticated ? lesson.document : lesson.sampleDocument

  return (
    <div>
      <Header title={props.lesson.title} />
      <Sidebar outline={props.lesson.outline} />
      <Content document={document} />
      {isAuthenticated ? null : <Banner />}
    </div>
  )
}

ReactDOM.render(
  <Lesson lesson={lesson} isAuthenticated />,
  document.getElementById('root')
)
///helper:layout.js
///helper:lesson.js
///helper:style.css
```

Let's practice with an exercise.

**Your task is to rewrite the following component without using an `if`/`else` statement.**

```js{theme=dark}
///name:Conditional rendering exercise: the conditional operator
///main.js
import React from 'react'
import ReactDOM from 'react-dom'

function Lesson(props) {
  if (props.isAuthenticated) {
    return (
      <div>
        <h1>React (without the buzzwords)</h1>
        <p>In this course, you'll master React's fundamentals...</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>I'm Sorry, Dave.</h1>
        <p>I'm afraid you must <a href="/login">login</a> first.</p>
      </div>
    )
  }
}

ReactDOM.render(
  <Lesson />,
  document.getElementById('root')
)
///solution:main.js
import React from 'react'
import ReactDOM from 'react-dom'

function Lesson(props) {
  return props.isAuthenticated ? (
    <div>
      <h1>React (without the buzzwords)</h1>
      <p>In this course, you'll master React's fundamentals...</p>
    </div>
  ) : (
    <div>
      <h1>I'm Sorry, Dave.</h1>
      <p>I'm afraid you must <a href="/login">login</a> first.</p>
    </div>
  )
}

ReactDOM.render(
  <Lesson />,
  document.getElementById('root')
)
```

<Details title="Why wrap the tags with parentheses?">

The above example would work just as well without the parentheses, so why add them?

My reason is pretty silly, actually. [Prettier](https://github.com/prettier/prettier), the popular JavaScript code formatter, adds parentheses for some reason. I'm just following the crowd.

</Details>


Approach #4: The `&&` Operator
------------------------------

One of the nice things about JavaScript's crazy typing is that it makes the `&&` operator more useful than it might at first appear.

To demonstrate, let's do a quick quiz. **What do you think the values of `x`, `y` and `z` are in the below snippet?** Uncomment the `console.log()` statements below to check your answers.

```js{unpersisted,defaultRightPanel=console,defaultIsRightPanelMaximized}
let x = 0 && "1"
let y = true && false
let z = { name: "Abraham" } && { name: "Lincoln" }

// console.log(x)
// console.log(y)
// console.log(z)
```

The thing about JavaScript's `&&` operator is that it doesn't always evaluate to a boolean. Instead, it evaluates to one of two things:

- When the left-hand side is *falsy*, it evaluates to the *left-hand side's value*
- Otherwise, it evaluates to the *right-hand side's value*

<Aside>
<Story title="Debugging guards">

The `||` operator can also be used as a guard, where the right hand side will be used if the left hand side is falsy.

You can use this add log statements to arrow functions when debugging. Because `console.log()` always returns undefined, you can add a log statement like so:

```js
const MyComponent = (props) =>
  console.log(props) ||
  <div>
    The component's content
  </div>
```

</Story>
</Aside>

This means that you can use it as a **guard**; you can use it to only render an element when a condition is true. For example, here's how you'd set a variable to `<CallToAction />`, but only when `isAuthenticated` is truthy:

```js
// If `!isAuthenticated` is falsy, `<Signup />` will be assigned
// to `signup`. Otherwise, `!isAuthenticated` will be assigned
// instead.
let signup = !isAuthenticated && <Signup />
```

In fact, you can embed `&&` expressions directly in JSX via interpolation. This gives you something a lot like Vue's `v-if` directive. So to revisit the first snippet from this guide...

```js
<div v-if="isGuest">
  <h1>I'm Sorry, Dave.</h1>
  <p>I'm afraid I can't do that.</p>
</div>
```

Here's how you'd rewrite it React style. Try changing `isGuest` to `false` to confirm that it works:

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'

let isGuest = true
let element =
  isGuest &&
  <div>
    <h1>I'm Sorry, Dave.</h1>
    <p>I'm afraid I can't do that.</p>
  </div>

ReactDOM.render(
  element,
  document.getElementById('root')
)
```

And with that, you've covered all four approaches to conditional rendering with React! Congratulations!


Anti-Patterns
-------------

As you've seen, conditional rendering with React is just a matter of deciding which element object to return. And because of this, you have the full power of JavaScript at your disposal to shoot yourself in the foot.


### `someNumber && ...`

Recall the first question from the quiz on the `&&` operator: *"what is the value of `x`?"*

```jsx
let x = 0 && "1"
```

As you saw earlier, the value of `x` is `0`. And there's something special about `0`: it's the only falsy value that JSX renders as text. Behold:

```js{unpersisted}
import React from 'react'
import ReactDOM from 'react-dom'

let bottlesOfBeer = 0 && "time to bring out the sake"

ReactDOM.render(
  <h1>
    Take one down and pass it around,&nbsp;
    {bottlesOfBeer} bottles of beer on the wall.
  </h1>,
  document.getElementById('root')
)
```

You'll want to avoid guarding on numbers, as it can cause random zeros to start appearing within your app.

One trick to avoid this is to coerce the left-hand side of your `&&` operator into a boolean by using the `!!` operator. To see this in action, try removing the `!!` operator from the below example.

```js{unpersisted}
import React from 'react'
import ReactDOM from 'react-dom'

let bottlesOfBeer = 0

ReactDOM.render(
  <div>
    { 
      !!bottlesOfBeer &&
      <h1>{bottlesOfBeer} bottles of beer on the wall.</h1>
    }
  </div>,
  document.getElementById('root')
)
```


### I heard you like Conditional operators so I put a Conditional operator in your Conditional operator

One of the things about conditional operators, is that you can put them in other conditional operators. This is a little hard to explain, so the best way to see why this is a bad idea is to look at this example.

```js
const Button = props =>
  props.status === 'busy' ?
    <InnerButton {...props} icon={<Icon spin name="spiral" />} /> :
  props.status === 'error' ?
    <InnerButton {...props} icon={<Icon name="error" />} /> :
  props.status === 'disabled ?
    <InnerButton {...props} disabled /> :
  <InnerButton {...props} />
```

This hypothetical component will render a `<Button>` element, and will pass in different props depending on the value of `props.status`. The component will work; it'll do exactly what it's supposed to. But imagine that you don't already know what it's supposed to do, and you're trying to figure it out... *yuck*.

Conditional operators are a great tool when used in moderation. Some people will tell you that you should *never* use a conditional operator inside another one. I'm a little more moderate, I think it depends on the situation. But try not to go overboard, or you might end up with a bit of a hangover.


### `<If>`, `<Only>`, `<Else>`, etc...

You might wonder why nobody has created an `<Only>` component that can be used to simplify conditional rendering. 

```jsx
<Only when={user}>
  <h1>Hi, {user.name}!</h1>
</Only>
```

But actually... [many](https://twitter.com/sag1v/status/1024636251494916096) [people](https://twitter.com/hnordt/status/1033938782645612544) have.

The reason that conditional components don't catch on is that they have some downsides that aren't immediately obvious. In particular, unlike JavaScript's `if` statement, *their children will be evaluated regardless of whether the condition is met*.

To understand why this is the case, let's take a look at the above example in a live editor.

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'

const Only = props => !!props.when && props.children

function WhatAHangover(props) {
  let user = props.user

  return (
    <Only when={user}>
      <h1>Good morning, {user.name}.</h1>
    </Only>
  )
}

let user = { name: "Dave" }

ReactDOM.render(
  <div>
    <WhatAHangover user={user} />
    <p>After sleeping on it I feel like maybe I can do that.</p>
  </div>,
  document.getElementById('root')
)
```

At first glance, this `<Only>` component seems to work great. So what's the problem?

Let me start by asking you a question: what do you think will happen if you set `user` to `null`? Have a think about it, then try it out in the above editor to see for yourself.

*Did you give it a shot? Then let's continue!*

The reason that setting `user` to `null` results in an error is that accessing `user.name` will throw an error if `user` is `null`. Remember, the children of `<Only>` are just arguments to a call to `React.createElement()`; they'll be evaluated *regardless* of the value of the `when` prop! If you're not convinced, click "compiled" and take a look.

In contrast, if you were to implement the same component using an `&&` guard, then the `<h1>` tag will not be evaulated unless `user` has a value. Try confirming this for yourself by changing `user` to `null` in the example below:

```js{unpersisted}
import React from 'react'
import ReactDOM from 'react-dom'

function WhatAHangover(props) {
  let user = props.user
  return user && <h1>Good morning, {user.name}.</h1>
}

ReactDOM.render(
  <div>
    <WhatAHangover user={{ name: 'Dave' }} />
    <p>After sleeping on it I feel like maybe I can do that.</p>
  </div>,
  document.getElementById('root')
)
```

I know I sound like a broken record, but **React is just JavaScript.** And once you get the hang of using JavaScript's operators and control flow statements, they're the most concise and powerful tools for deciding what to render that you'll find!


An Exercise
-----------

It's important to put what you've learned to practice. And that means it's time for an exercise!

In the editor below, I've started you off with some components that render a multi-step process:

- `Wizard` is the main component. It renders the header, footer, error messages, and current step's component.
- `NextButton` and `BackButton` and `FinishButton` let you navigate between steps.
- `ErrorMessages` displays an list of errors that are preventing you from continuing.
- `StepN` components are tasked with rendering each step.

**Your task is to display the correct components:**

- Use the `currentStep` prop to decide which step component to display.
- Don't display any error messages unless there *are* error messages.
- You should not render `<BackButton>` on the first step.
- You should render `<FinishButton>` instead of `<NextButton>` on the final step.

*Try to complete as much of this exercise as you without checking the solution. Once you're done or truly stuck, take a look to see how your code compares to mine!*

```jsx{theme=dark}
///name:Conditional rendering exercise
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { WizardController } from './controller.js'
import { Step1, Step2, Step3 } from './steps.js'
import * as Views from './views.js'

function Wizard(props) {
  const {
    currentStep,
    errorMessages,
    onClickBack,
    onClickNext,
    onClickFinish
  } = props

  return (
    <div className="Wizard">
      <Views.Header title="Registration Wizard" />
      <Step1 {...props} />
      <Views.Footer>
        <Views.ErrorMessages messages={errorMessages} />
        <Views.BackButton onClick={onClickBack} />
        <Views.NextButton onClick={onClickNext} />
      </Views.Footer>
    </div>
  )
}

Wizard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickFinish: PropTypes.func.isRequired,
}

ReactDOM.render(
  <WizardController>
    {wizardProps => <Wizard {...wizardProps} />}
  </WizardController>,
  document.getElementById('root')
)
///solution:main.js
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { WizardController } from './controller.js'
import { Step1, Step2, Step3 } from './steps.js'
import * as Views from './views.js'

function CurrentStep(props) {
  switch (props.currentStep) {
    case 1: return <Step1 {...props} />
    case 2: return <Step2 {...props} />
    case 3: return <Step3 {...props} />
  }
}

function Wizard(props) {
  const {
    currentStep,
    errorMessages,
    onClickBack,
    onClickNext,
    onClickFinish
  } = props

  return (
    <div className="Wizard">
      <Views.Header title="Registration Wizard" />
      <CurrentStep {...props} />
      <Views.Footer>
        {!!errorMessages.length &&
          <Views.ErrorMessages messages={errorMessages} />
        }
        {currentStep !== 1 &&
          <Views.BackButton onClick={onClickBack} />
        }
        {currentStep !== 3 ? (
          <Views.NextButton onClick={onClickNext} />
        ) : (
          <Views.FinishButton onClick={onClickFinish} />
        )}
      </Views.Footer>
    </div>
  )
}

Wizard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickFinish: PropTypes.func.isRequired,
}

ReactDOM.render(
  <WizardController>
    {wizardProps => <Wizard {...wizardProps} />}
  </WizardController>,
  document.getElementById('root')
)
///steps.js
import React from 'react'
import { Step } from './views.js'

export function Step1(props) {
  let { name, email } = props.value
  let onChange = props.onChange

  return (
    <Step onSubmit={props.onClickNext}>
      <p>
        May I ask your name and address?
      </p>
      <label>
        <span>Name:</span>
        <input
          value={name}
          onChange={e => onChange('name', e.target.value)}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type='email'
          value={email}
          onChange={e => onChange('email', e.target.value)}
        />
      </label>
    </Step>
  )
}

export function Step2(props) {
  let plan = props.value.plan
  let onChange = props.onChange

  return (
    <Step onSubmit={props.onClickNext}>
      <p>
        What plan would you like to join with?
      </p>
      <label>
        <input
          type='radio'
          checked={plan === 'yearly'}
          onClick={e => onChange('plan', 'yearly')}
        />
        Yearly
      </label>
      <label>
        <input
          type='radio'
          checked={plan === 'monthly'}
          onClick={e => onChange('plan', 'monthly')}
        />
        Monthly
      </label>
    </Step>
  )
}

export function Step3(props) {
  let newsletter = props.value.newsletter
  let onChange = props.onChange

  return (
    <Step onSubmit={props.onClickNext}>
      <p>
        What e-mails would you like to receive from us?
      </p>
      <label>
        <input
          type='radio'
          checked={newsletter === 'monthly'}
          onClick={e => onChange('newsletter', 'monthly')}
        />
        Monthly newsletter
      </label>
      <label>
        <input
          type='radio'
          checked={newsletter === 'special-offers'}
          onClick={e => onChange('newsletter', 'special-offers')}
        />
        Special offers only
      </label>
      <label>
        <input
          type='radio'
          checked={newsletter === 'none'}
          onClick={e => onChange('newsletter', 'none')}
        />
        Don't e-mail me
      </label>
    </Step>
  )
}
///views.js
import React from 'react'


export const Header = ({ title }) =>
  <div className='Header'>
    {title}
  </div>


export const ErrorMessages = ({ messages }) =>
  <div className='ErrorMessages'>
    <h2>You need to make some changes before continuing:</h2>
    <ul>
      {messages.map((message, i) =>
        <li key={i}>{messages}</li>
      )}
    </ul>
  </div>


export const Footer = ({ children }) =>
  <div className='Footer'>
    {children}
  </div>


export const BackButton = ({ onClick }) =>
  <button className="BackButton" onClick={onClick}>
    Back
  </button>


export const NextButton = ({ onClick }) =>
  <button className="NextButton" onClick={onClick}>
    Next
  </button>


export const FinishButton = ({ onClick }) =>
  <button className="FinishButton" onClick={onClick}>
    Finish!
  </button>


export class Step extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  render() {
    return (
      <form onSubmit={this.submitForm} className='Step'>
        {this.props.children}
      </form>
    )
  }

  submit(e) {
    e.preventDefault()
    this.props.onSubmit()
  }
}
///controller.js
import React from 'react'

export class WizardController extends React.Component {
  constructor() {
    super()
    this.state = {
      currentStep: 1,
      errorMessages: [],
      value: {
        name: '',
        email: '',
        plan: null,
        newsletter: null,
      }
    }
    this.change = this.change.bind(this)
    this.back = this.back.bind(this)
    this.next = this.next.bind(this)
    this.finish = this.finish.bind(this)
  }

  render() {
    return this.props.children({
      currentStep: this.state.currentStep,
      errorMessages: this.state.errorMessages,
      value: this.state.value,

      onChange: this.change,
      onClickBack: this.back,
      onClickNext: this.next,
      onClickFinish: this.finish,
    })
  }

  change(field, value) {
    this.setState(state => ({
      errorMessages: [],
      value: {
        ...state.value,
        [field]: value,
      },
    }))
  }

  back() {
    this.setState(state => ({
      currentStep: state.currentStep - (state.currentStep > 1 ? 1 : 0),
      errorMessages: [],
    }))
  }
  
  next() {
    this.setState(state => {
      let errorMessages = validate(state)
      return {
        currentStep: state.currentStep + (errorMessages.length ? 0 : 1),
        errorMessages: errorMessages,
      }
    })
  }

  finish() {
    let errorMessages = validate(this.state)
    if (errorMessages.length)  {
      this.setState({
        errorMessages,
      })
    }
    else {
      alert("Thanks for completing the registration process!")
    }
  }
}

function validate({ currentStep, value }) {
  let errorMessages = []
  if (currentStep === 1) {
    let missing = []
    if (!value.name) {
      missing.push('name')
    }
    if (!value.email) {
      missing.push('email')
    }
    if (missing.length > 0) {
      errorMessages.push(`Please enter your ${missing.join(" and ")}.`)
    }
  }
  if (currentStep === 2 && !value.plan) {
    errorMessages.push(`Please select your plan.`)
  }
  if (currentStep === 3 && !value.newsletter) {
    errorMessages.push(`Please select how you'd like to hear about new content.`)
  }
  return errorMessages
}
///styles.css
body {
  margin: 0;
  font-family: Lato, sans-serif;
}

label {
  display: block;
  margin-bottom: 0.5rem
}
label > span {
  font-weight: bold;
  font-size: 0.8rem;
  display: block;
}

.Header {
  background-color: #0f0035;
  color: white;
  padding: 1rem;
}

.ErrorMessages {
  background-color: #dd3c6f;
  color: white;
  text-align: left;
}
.ErrorMessages h2 {
  font-size: 0.9rem;
  padding: 1rem 1rem 0.5rem;
  margin: 0 0 0;
}
.ErrorMessages ul {
  font-size: 0.9rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
}

.Footer {
  background-color: #f0f4fc;
  margin-top: 1rem;
  text-align: right;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.Step {
  padding: 1rem;
}

button {
  position: relative;
  margin: 1rem 1rem 1rem 0;
  font-size: 1rem;
  background-color: white;
  padding: 0.5rem 1rem;
	border: none;
  font-weight: 600;
}
button:after {
	top: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(0, 0, 0, 0);
	border-width: 8px;
	margin-top: -8px;
}

.NextButton, .FinishButton {
  background-color: #12c8ba;
  color: white;
}
.NextButton:after {
	left: 100%;
	border-left-color: #12c8ba;
}

.BackButton {
  background-color: #5d5178;
  color: white;
}
.BackButton:after {
	left: -16px;
	border-right-color: #5d5178;
}
```


What's next?
------------

Now that you've learned all about conditional rendering, here's a few suggestions for what to study next.

- If you're at all unsure about how JSX elements translate to `React.createElement()`, have a play around with the [JSX Live Cheatsheet](/toolbox/jsx-live-cheatsheet/).


- If you'd like to know more about the `createElement()` function itself, and what element objects are, take a look at the [Elements are Objects](/courses/learn-raw-react/basics/elements-are-objects/) lesson from my course on [React (without the buzzwords)](/courses/learn-raw-react/).


- Lists and loops are closely related to conditional rendering. To learn more about them, see the [Lists and Loops](/courses/learn-raw-react/basics/lists-and-loops/) lesson from the same course.

Thanks so much for reading through this guide! And if you have any questions or comments, send me an email anytime at [james@frontarm.com](mailto:james@frontarm.com)!