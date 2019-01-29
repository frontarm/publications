import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet, UnlessStatic } from 'shared/documentHelpers'

The React context API is one of the major forces behind the most useful packages in the React ecosystem. It's used everywhere from [theming](https://github.com/emotion-js/emotion/blob/master/packages/emotion-theming/src/theme-provider.js), to [navigation](https://github.com/frontarm/navi/blob/master/packages/react-navi/src/NavProvider.tsx), to [graphql tooling](https://github.com/apollographql/react-apollo/blob/master/src/ApolloProvider.tsx). And being as important as it is, you may have heard that the context API recently received a major update.

Starting with React 16.3, the context API involves the use of two special components: `<Provider>` and `<Consumer>`. And if one of these names sounds familiar, it's because Redux *also* supplies a `<Provider>` component. In fact, the Redux and React providers both do roughly the *same thing*. So in a way, context can replace Redux.

But wait a moment. Redux's `<Provider>` component has actually [made use of context](https://github.com/reduxjs/redux/blob/8bc14659780c044baac1432845fe1e4ca5123a8d/src/redux/connect.js) since 2015, when Redux was first released. And this raises the question: **if Redux has been using context all along, how can context replace Redux?**


The rumors of Redux's demise have been greatly exaggerated
----------------------------------------------------------

Of all of Redux's features, its `connect()` function is arguably the most frequently used. Along with the `<Provider>` component, `connect()` lets you pass global state to any component in your application, *without* manually passing that data via props.

Of course, Redux isn't the only way to provide data to your components. React's context API does basically the same thing; it lets you pass global state down the component tree without passing it through props at every level. *But that's all it does.*

In contrast, Redux provides a whole toolkit for managing state:

- It comes with a time traveling debugger
- It provides a middleware API, giving you access to tools like redux-sagas
- Its React bindings prevent many unnecessary renders

As you can see, context is *not* a replacement for Redux. Context won't give you time traveling debugging, configurable middleware, or anything more than a way to get data from one place to another. If you want a tool to help you manage your state, then Redux is a great choice.

But what if *don't* want middleware support or time traveling debugging? **Should you still use Redux just to take advantage of its ability to prevent unnecessary renders?**

Up until React's new context API was released, it wouldn't have been all that controversial to say *"just use Redux."* But a small change to how context works has reignited the debate.


Big changes, small changes
--------------------------

React's new context API changed a *lot* of stuff.

<Aside>
<Reference title="Context API Reference">

To learn how to use the new Context API, see React's official [documentation](https://reactjs.org/docs/context.html).

</Reference>
</Aside>

- It decoupled context from components; removing the need for the `getChildContext()` method, or the `this.context` property.
- It added the `React.createContext()` function, and the associated `<Context.Provider>` and `<Context.Consumer>` components.
- It made the API *official*.

Changes this big are guaranteed to cause some excitement. But while they certainly made a splash, they didn't fundamentally change what context *does*. The new API, like the old API, just gives you a way to provide data to a component's descendants.

However, amongst the API differences, there was a smaller, less obvious change: **the new context API always propagates updates, even past `shouldComponentUpdate()` or `PureComponent`.**

It turns out that this seemingly insignificant change *vastly* simplifies the task of writing performant apps without Redux. Let's dive into an example to learn how.


Context and shouldComponentUpdate
---------------------------------

When a React component is rendered, just as the `props` of its child components will be updated, so will the context available to its descendants. Context, like props, is just something that you can render -- with one exception.

With React's old context API, React decided whether to re-render a child *solely* based on the component's props and state. It didn't take changes in context into account. This meant that if a component extended `PureComponent` or implemented `shouldComponentUpdate`, the context in the component and its children would sometimes get out of date.

To see this in action, let's take a look at a demo of a simple context-based router. As you click the links in the below example, the context updates, and the page re-renders. Try clicking the links for yourself, just to make sure that it all works. And then let's do an experiment.

**What happens if you change the `AppLayout` component to extend `React.PureComponent` instead of `React.Component`?** Go ahead and try changing it. Once you've made the change, click a few links and see what happens.

*You can try this example for yourself with create-react-app -- just copy `App.js` and `Navigation.js` into the `src` directory of a new project.*

```js{unpersisted}
///App.js
import React from 'react'
import { NavigationProvider, Link, Route } from './Navigation.js'

export class App extends React.Component {
  render() {
    return (
      <NavigationProvider>
        <AppLayout>
          <Route href="/">
            <h1>Welcome to Frontend Armory!</h1>
          </Route>
          <Route href="/browse/">
            <h1>Browse courses and guides</h1>
          </Route>
        </AppLayout>
      </NavigationProvider>
    )
  }
}

export class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link href="/" activeStyle={{color: 'red'}}>
            Home
          </Link>
          <Link href="/browse/" activeStyle={{color: 'red'}}>
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
import PropTypes from 'prop-types'

export class NavigationProvider extends React.Component {
  static childContextTypes = {
    navigation: PropTypes.object
  }

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

  getChildContext() {
    return {
      navigation: this.state,
    }
  }

  render() {
    return this.props.children
  }

  // The navigation's `navigate` method updates `navigation` object, and uses
  // the browser's `pushState` method to change the window's URL.
  navigate = (pathname) => {
    this.setState({ pathname })

    // Update the URL within the browser's history
    window.history.pushState(null, null, pathname)
  }
}

class NavigationConsumer extends React.Component {
  static contextTypes = {
    navigation: PropTypes.object,
  }

  render() {
    return this.props.children(this.context.navigation)
  }
}

export const Link = ({ activeStyle, ...props }) =>
  <NavigationConsumer>
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
  </NavigationConsumer>

export const Route = ({ children, href }) =>
  <NavigationConsumer>
    {navigation => navigation.pathname === href ? children : null}
  </NavigationConsumer>
///index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

Whenever you click a `<Link>` component in the above example, the `navigate()` method of the app's `<NavigationProvider>` component will be called. This causes the `<NavigationProvider>` component's state to update, which in turn causes it to re-render.

By default, re-rendering a React component will cause its children to re-render, which will cause the children of those children to re-render, and so on. This means that clicking a link will re-render the entire app, with the `<Link>` and `<Route>` components picking up the new context in the process.

However, components that extends `PureComponent` are special; they only re-render if their `state` or `props` have changed from the previous render. The `<AppLayout>` component in the above example has neither `props` nor `state`, so switching it to `PureComponent` means that it will *never* re-render -- even if the context changes!


Renders aren't free.
--------------------

Before React introduced its new context API, you had to make a choice: do you want to be able to tune your app's performance with `PureComponent` and `shouldComponentUpdate()`, or do you want the convenience of being able to provide global state via context? *You couldn't have both.* And given the constraints, the choice was clear: *performance won hands down*.

The thing is, most real world apps do actually need a little performance tuning. But the old context API not only made it impossible to reliably use `PureComponent` and `shouldComponentUpdate()`, **it also exacerbated the problem by requiring that the *entire app* be re-rendered each time that *any* global state changed**!

Even in smaller apps, re-rendering the entire app can cause a perceivable delay. But don't take my word for it -- just try typing in this form that re-renders a large list on each keystroke...

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

Unless you *want* to piss off your users, using the old context API to provide application state from the top of the app is just not a design decision that you'd want to make.

*But wait a minute.* Doesn't Redux *also* put a `<Provider>` at the top of the app?


Values vs. Observables
----------------------

Many of React's most useful packages require that you place some sort of provider component at the top of your component tree. 

- Redux requires that any components that use its `connect()` function are nested within a `<Provider>`.
- Apollo requires that you use an `<ApolloProvider>`.
- React-router provides context via its `<Router>` component.

There's something special about all of these libraries: even though they use the old context API, they *still* work with `shouldComponentUpdate()` and `PureComponent`.

**Do you know what the special sauce is that allows these libraries to use the old context API with `shouldComponentUpdate()`?** Have a think about it, and then check your answer below.

<Spoiler>

These libraries don't actually use context to propagate the latest state! Instead, they use context to provide **observables** --- objects that contain a function that can be used to [subscribe](https://github.com/facebook/react/tree/master/packages/create-subscription) to the latest state.

</Spoiler>

Before the new context API was released, the only way to performantly and reliably access global state was to create subscriptions in each consumer component. This was hard to get right and a lot of work. Of course, you could escape a lot of that work by storing your state with Redux and then accessing it with `connect()`, just as in the following example.

```js{unpersisted}
///App.js
import React from 'react'
import { Provider } from 'react-redux'
import { Link, Route } from './Navigation.js'
import { store } from './store.js'

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppLayout>
          <Route href="/">
            <h1>Welcome to Frontend Armory!</h1>
          </Route>
          <Route href="/browse/">
            <h1>Browse courses and guides</h1>
          </Route>
        </AppLayout>
      </Provider>
    )
  }
}

export class AppLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <nav>
          <Link href="/" activeStyle={{color: 'red'}}>
            Home
          </Link>
          <Link href="/browse/" activeStyle={{color: 'red'}}>
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
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ActionCreators } from './store.js'

export let Link = ({ activeStyle, pathname, navigate, ...props }) =>
  <a
    {...props}
    // If the navigation context's `pathname` matches the link's
    // `href`, then show the active styles
    style={{
      ...props.style,
      ...(pathname === props.href ? activeStyle : {})
    }}
    // When the user clicks the link, handle it by calling
    // the `navigate` function that was passed in via context.
    onClick={(e) => {
      e.preventDefault()
      navigate(props.href)
    }}
  />

// Pull the `<Link>` component's `pathname` and `navigate` props
// from the redux store
Link = connect(
  state => ({
    pathname: state.navigation.pathname,
  }),
  dispatch => ({
    navigate: (pathname) => dispatch(ActionCreators.navigate(pathname)),
  })
)(Link)


export let Route = ({ children, href, pathname }) =>
  pathname === href ? children : null

// Pull the `<Route>` component's `pathname` prop from the redux store
Route = connect(
  state => ({
    pathname: state.navigation.pathname,
  })
)(Route)
///store.js
import { createStore, combineReducers } from 'redux'

export const ActionCreators = {
  navigate(pathname, shouldPushState = true) {
    // Update the URL within the browser's history
    if (shouldPushState) {
      window.history.pushState(null, null, pathname)
    }

    return {
      type: 'NAVIGATE',
      pathname: pathname,
    }
  }
}

function navigationReducer(state = {}, action) {
  switch (action.type) {
  case 'NAVIGATE':
    return {
      pathname: action.pathname,
    }
  default:
    return state
  }
}

export let store = createStore(
  combineReducers({
    navigation: navigationReducer,
  }),
  { 
    navigation: {
      pathname: window.location.pathname
    }
  }
)

// Handle the user clicking the `back` and `forward` buttons
window.onpopstate = () => {
  let action = ActionCreators.navigate(window.location.pathname, false)
  store.dispatch(action)
}
///index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

While Redux is famous for its middleware and time traveling debugging, it feels to me that **Redux's *real* killer feature was its simple API for reliably and performantly observing state in a global store.**

But the new context API provides an *even simpler* alternative.


The new context API
-------------------

In contrast with React's old context API, the new API *just works*. The new `<Context.Consumer>` component will always re-render after its corresponding `<Context.Provider>` element's `value` prop has been updated -- even if there is a `PureComponent` or `shouldComponentUpdate()` in the way.

Here's what the navigation example would look like using the new context API *and* `PureComponent`. 

```js{unpersisted}
///App.js
import React from 'react'
import { NavigationProvider, Link, Route } from './Navigation.js'

export class App extends React.Component {
  render() {
    return (
      <NavigationProvider>
        <AppLayout>
          <Route href="/">
            <h1>Welcome to Frontend Armory!</h1>
          </Route>
          <Route href="/browse/">
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
            Home
          </Link>
          <Link href="/browse/" activeStyle={{color: 'red'}}>
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

The above example contains the least moving part of all three of my router implementations -- and it's all thanks to the new context API.

**If your main reason for using Redux is to performantly get data from A to B, then the new context API lets you build apps *without* Redux.**

Of course, context doesn't give you any conventions for structuring your state and actions. It doesn't give you Redux's wonderful dev tools. And while it *does* make performance optimization possible, it certainly doesn't do any of that optimization for you.

In fact, if you're using context, you'll want to keep an eye on performance -- without being careful, you can easily re-render the entire app on each update. To learn more, read my guide to [context and performance](/articles/react-context-performance).

By the way, if you haven't already, you can keep up to date with other new Frontend Armory content by getting a [free membership](/members/register/) -- it will also give you access to all of our [printable cheatsheets](/toolbox/)! And as always, if you have any questions, comments or feedback, let me know by tweeting at [@james_k_nelson](https://twitter.com/james_k_nelson), or emailing me at [james@frontarm.com](mailto:james@frontarm.com). I can't wait to hear from you, and thanks so much for reading!
