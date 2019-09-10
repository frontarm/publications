import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet } from 'shared/documentHelpers'

Conditional rendering with React is just a matter of deciding which element object to return. You can use `if` and `switch` statements, the conditional operator, and even the `&&` operator!

This gives you a lot of power -- I'll go into the details next week. The problem is that all of this power makes it easy to shoot yourself in the foot. Lucky for you, getting familiar with these 3 anti-patterns will help help you avoid most of the pain. I'll start with the issue I run into most...


## `someNumber && ...`

Let's do a little quiz on the `&&` operator: **what is the value of `x`?**

```jsx
let x = 0 && "1"
```

You can check your answer below:

<Spoiler>

The value of `x` is `0`

</Spoiler>

There's something special about `0`: it's the only falsy value that JSX renders as text. This makes it generally a bad thing to guard on it.

For example, say you're printing verses of "bottles of beer", but you don't want to print the last verse with "0" bottles of beer. You might attempt to handle this by prefixing the verse with `bottlesOfBeer &&`:

```js{unpersisted}
import React from 'react'
import ReactDOM from 'react-dom'

let bottlesOfBeer = 0

ReactDOM.render(
  bottlesOfBeer &&
  <h1>
    Take one down and pass it around,&nbsp;
    {bottlesOfBeer} bottles of beer on the wall.
  </h1>,
  document.getElementById('root')
)
```

Oops! A random `0` appeared in your app.

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

I run into this issue even after years of working with React. It's easy mistake to make. But knowing *why* a random `0` has appeared in your app can turn minutes of debugging into seconds.


## I heard you like Conditional operators so I put a Conditional operator in your Conditional operator

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


## `<If>`, `<Only>`, `<Else>`, etc...

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

In contrast, if you were to implement the same component using an `&&` guard, then the `<h1>` tag will not be evaluated unless `user` has a value. Try confirming this for yourself by changing `user` to `null` in the example below:

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

The great thing about React is that *it's just JavaScript*. And while this does give you room to do some silly things, it also gives you a ridiculous amount of power to render *exactly* what you want.

But how to put that power to use isn't always obvious. So if you'd like some help, here's a few suggestions:

- For more details on how to apply conditional rendering in practice, my guide to [Conditional Rendering with React](/articles/react-conditional-rendering/) covers the four main approaches, with exercises to test your understanding. 
- If you'd prefer to start learning React from the fundamentals, check out my complete [React fundamentals course](/courses/react-fundamentals/).

Thanks so much for reading this far! Since you're here, I have a question for *you*: Have you run into any other React footguns that I missed? Or is there anything else you'd like to hear more about? Let me know by tweeting [@james_k_nelson](https://twitter.com/james_k_nelson)!