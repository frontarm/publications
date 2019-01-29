import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet, UnlessStatic } from 'shared/documentHelpers'

Earlier this year, the React team introduced an improved context API. The new API made a big splash: it looks nicer, uses render functions, and to top it all off, it's finally *official*. But one of the most important changes is hidden under the hood.

Until the new context API was released, React made it difficult to use context with `PureComponent` or `shouldComponentUpdate`. To solve this problem, many developers turned to state management tools like Redux. But with the recent update, context now works great with `PureComponent` and `shouldComponentUpdate`. So people have been asking the question: [does context replace Redux?](/articles/when-context-replaces-redux)

To cut a long story short, context *can* replace Redux, but it won't do everything that Redux does. In particular, it won't perform any of the optimizations that Redux gives you for free. So before you replace Redux with context, there's a thing or two that you should know about performance.


Oops, I re-rendered the entire app
--------------

<Aside>
<Reference title="Context API Reference">

This guide assumes that you already know the basics of the new context API. If you'd like to brush up on the basics, see React's official [documentation](https://reactjs.org/docs/context.html).

</Reference>
</Aside>

One thing about data provided by context is that it's usually global; you want it to be available *everywhere*. This means that your `<Context.Provider>` components will be near the top of your component tree. And if you're not careful, this can cause your *entire app* to re-render over and over again -- a performance nightmare.

To get some intuition for this, let's do a quiz.

The editor below contains a demo of a small app that uses context to implement push-state routing. Within the app, I've added six components that log messages to the console whenever they're rendered.

**Your task is to decide which of these `console.log()` statements will be executed when you click each of the two links.**

Once you've decided on your answer, click the "Home" and "Browse" links to check!

*You can click the fullscreen icon at the top right of the editor to make it easier to scroll within the code.*

```js{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'

// This component logs a message to the console each time
// it is rendered or re-rendered.
function Log(props) {
  console.log(`rendering "${props.name}"`)
  return null
}

const NavigationContext = React.createContext()

export class App extends React.Component {
  constructor(props) {
    super(props)

    // Store the `navigation` object in component state
    this.state = {
      pathname: window.location.pathname,
      navigate: this.navigate,
    }

    // Handle the user clicking the `back` and `forward` buttons
    window.onpopstate = () => {
      this.setState({ pathname: window.location.pathname })
    }
  }

  render() {
    return (
      <NavigationContext.Provider value={this.state}>
        <Log name="NavigationProvider" />
        <AppLayout>
          <Log name="AppLayout" />
          <Route href="/">
            <Log name="home Route" />
            <h1>Welcome to Frontend Armory!</h1>
          </Route>
          <Route href="/browse/">
            <Log name="browse Route" />
            <h1>Browse courses and guides</h1>
          </Route>
        </AppLayout>
      </NavigationContext.Provider>
    )
  }

  // The navigation's `navigate` method updates `navigation` object, and uses
  // the browser's `pushState` method to change the window's URL.
  navigate = (pathname) => {
    this.setState({ pathname })

    // Update the URL within the browser's history
    window.history.pushState(null, null, pathname)
  }
}

export class AppLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <nav>
          <Link href="/" activeStyle={{color: 'red'}}>
            <Log name="home Link" />
            Home
          </Link>
          <Link href="/browse/" activeStyle={{color: 'red'}}>
            <Log name="browse Link" />
            Browse
          </Link>
        </nav>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

const Link = ({ activeStyle, ...props }) =>
  <NavigationContext.Consumer>
    {navigation =>
      <a
        {...props}
        // If the navigation context's `pathname` matches the link's
        // `href`, then show the active styles
        style={{
          ...props.style,
          ...(navigation.pathname === props.href ? activeStyle : {})
        }}
        // When the user clicks the link, handle it by calling
        // the `navigate` function that was passed in via context.
        onClick={(e) => {
          e.preventDefault()
          navigation.navigate(props.href)
        }}
      />
    }
  </NavigationContext.Consumer>

const Route = ({ children, href }) =>
  <NavigationContext.Consumer>
    {navigation => navigation.pathname === href ? children : null}
  </NavigationContext.Consumer>
///index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

As you can see, the answer is that:

<Spoiler>

<span style={{ fontSize: '20px' }}>Everything other than the unmounted route is re-rendered on each click!</span>

</Spoiler>

So what's going on here? 


Renders take time
-----------------

Whenever you click a `<Link>` component in the above example, the `navigate()` method of the `<App>` component will be called. This causes the `<App>` component's state to update, which in turn causes it to re-render, which will cause its children to re-render, which will cause the children of those children to re-render, and so on.

In the above example, you need to re-render the entire app just to update the `value` prop of the `<NavigationContext.Provider>` component. And while this app re-renders instantly, re-rendering even smaller real-world apps can cause a perceivable delay. You can get a feel for this by trying to use this form that renders a large list on each keystroke...

```js{unpersisted}
///App.js
import React from 'react'
import { TasksView } from './TasksView.js'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTask: "",
      tasks: props.defaultData
    }
  }

  render() {
    return (
      <TasksView
        newTask={this.state.newTask}
        tasks={this.state.tasks}
        onChangeNewTask={(newTask) => {
          this.setState({ newTask })
        }}
        onSubmitNewTask={() => {
          this.setState(state => ({
            newTask: '',
            tasks: [{ name: state.newTask }].concat(state.tasks)
          }))
        }}
      />
    )
  }
}
///TasksView.js
import React from 'react'

export function TasksView(props) {
  const { newTask, tasks, onChangeNewTask, onSubmitNewTask } = props

  return (
    <div>
      <form onSubmit={event => {
        event.preventDefault()
        onSubmitNewTask()
      }}>
        <h2>Add Task</h2>
        <label>
          <span>Task</span>
          <br />
          <input
            value={newTask}
            onChange={event => onChangeNewTask(event.target.value)}
          />
        </label>
        <button>
          Add
        </button>
      </form>
      <section>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task, i) =>
            <li key={i}>
              {task.name}
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}
///index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

var data = []
for (let i = 0; i < 10000; i++) {
  data.push({
    name: `Task ${i + 1}`,
  })
}

ReactDOM.render(
  <App defaultData={data} />,
  document.getElementById("root")
)
```

Now it should be said that causing a delay after some action isn’t a problem in and of itself. Users will *expect* a delay after they click a link -- so the above pattern would be fine if you only want to provide *navigation* state via context.

But what if you want to provide *all* the state via context?


To render or not to render
--------------------------

The new context API's `<Context.Provider>` components is a bit smarter about re-rendering than your average component. In fact, there is only a single scenario in which it will re-render its children:

**`<Context.Provider>` will only re-render if its `children` prop does not share reference equality with its previous `children` prop.**

Notably, `<Context.Provider>` *will not* re-render if its `value` changes while its `children` stay the same. In this case, only the associated `<Context.Consumer>` components will re-render. This makes it possible to update a context's consumers *without* requiring that the entire app be re-rendered.

But wait a minute... in the first example, the provider's children *did* stay the same, right? After all, there's no interpolated content or props within this provider's children?

```jsx
<NavigationContext.Provider value={this.state}>
  <Log name="NavigationProvider" />
  <AppLayout>
    <Log name="AppLayout" />
    <Route href="/">
      <Log name="home Route" />
      <h1>Welcome to Frontend Armory!</h1>
    </Route>
    <Route href="/browse/">
      <Log name="browse Route" />
      <h1>Browse courses and guides</h1>
    </Route>
  </AppLayout>
</NavigationContext.Provider>
```

When I first saw the above example, it took me a while to realize that the above provider's children *do* actually change between renders. To understand why, you need to keep in mind how JSX works. So let me transform the above JSX to raw JavaScript:

```jsx
React.createElement(NavigationContext.Provider, { value: this.state },
  React.createElement(Log, { name: "NavigationProvider" }),
  React.createElement(AppLayout, null,
    React.createElement(Log, { name: "AppLayout" }),
    React.createElement(Route, { href: "/" },
      React.createElement(Log, { name: "home Route" }),
      React.createElement('h1', null, "Welcome to Frontend Armory!")
    ),
    React.createElement(Route, { href: "/browse/" },
      React.createElement(Log, { name: "browse Route" }),
      React.createElement('h1', null, "Browse courses and guides")
    ),
  )
)
```

JSX tags correspond to calls to `React.createElement()`, with each call creating a *new* element object. Thus when the `App` component creates a new provider element to hold the updated state, it also passes in a new `children` element. **No two values of the provider's `children` will ever be equal, so the children will be re-rendered on each state change.**


Preventing unnecessary renders
------------------------------

To ensure that the entire app isn't re-rendered on each context change, you'll need to keep the `children` props of your providers equal between renders. And luckily, this is surprisingly easy! All you'll need to do is move the state that you'll provide into a separate component, with the children passed into that component from above.

Or to put it simply, you just need to create a `<SomethingProvider>` component that doesn't except any props other than `children`.

Here's how you'd rewrite the logging example to follow this approach -- you can see the implementation of `<NavigationProvider>` by looking at the `Navigation.js` tab.

```js{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'
import { NavigationProvider, Link, Route } from './Navigation.js'

// This component logs a message to the console each time
// it is rendered or re-rendered.
function Log(props) {
  console.log(`rendering "${props.name}"`)
  return null
}

export class App extends React.Component {
  render() {
    return (
      <NavigationProvider>
        <Log name="NavigationProvider" />
        <AppLayout>
          <Log name="AppLayout" />
          <Route href="/">
            <Log name="home Route" />
            <h1>Welcome to Frontend Armory!</h1>
          </Route>
          <Route href="/browse/">
            <Log name="browse Route" />
            <h1>Browse courses and guides</h1>
          </Route>
        </AppLayout>
      </NavigationProvider>
    )
  }
}

export class AppLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <nav>
          <Link href="/" activeStyle={{color: 'red'}}>
            <Log name="home Link" />
            Home
          </Link>
          <Link href="/browse/" activeStyle={{color: 'red'}}>
            <Log name="browse Link" />
            Browse
          </Link>
        </nav>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}
///Navigation.js
import React from 'react'

const NavigationContext = React.createContext()

export class NavigationProvider extends React.Component {
  constructor(props) {
    super(props)

    // Store the `navigation` object in component state
    this.state = {
      pathname: window.location.pathname,
      navigate: this.navigate,
    }

    // Handle the user clicking the `back` and `forward` buttons
    window.onpopstate = () => {
      this.setState({ pathname: window.location.pathname })
    }
  }

  render() {
    return (
      <NavigationContext.Provider value={this.state}>
        {this.props.children}
      </NavigationContext.Provider>
    )
  }

  // The navigation's `navigate` method updates `navigation` object, and uses
  // the browser's `pushState` method to change the window's URL.
  navigate = (pathname) => {
    this.setState({ pathname })

    // Update the URL within the browser's history
    window.history.pushState(null, null, pathname)
  }
}

export const Link = ({ activeStyle, ...props }) =>
  <NavigationContext.Consumer>
    {navigation =>
      <a
        {...props}
        // If the navigation context's `pathname` matches the link's
        // `href`, then show the active styles
        style={{
          ...props.style,
          ...(navigation.pathname === props.href ? activeStyle : {})
        }}
        // When the user clicks the link, handle it by calling
        // the `navigate` function that was passed in via context.
        onClick={(e) => {
          e.preventDefault()
          navigation.navigate(props.href)
        }}
      />
    }
  </NavigationContext.Consumer>

export const Route = ({ children, href }) =>
  <NavigationContext.Consumer>
    {navigation => navigation.pathname === href ? children : null}
  </NavigationContext.Consumer>
///index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

In the above example, the element that represents the provider's content is only ever created once -- which you can confirm by adding a `console.log()` to the `App` component's `render()` method. This element is passed to the `<NavigationProvider>` component as its `children` prop, and then re-used on subsequent renders, ensuring that the app is never unnecessarily re-rendered -- just as if you were using Redux!

*If you haven't already, keep up to date with the latest Frontend Armory content by getting a [free membership](/members/register/) -- it will also give you access to all of our [printable cheatsheets](/toolbox/)! And as always, if you have any questions, comments or feedback, let me know by tweeting at [@james_k_nelson](https://twitter.com/james_k_nelson), or emailing me at [james@frontarm.com](mailto:james@frontarm.com). I can't wait to hear from you, and thanks so much for reading!*
