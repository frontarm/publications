export { breadboardHelpers } from './breadboardHelpers.js'

When React first appeared on the scene, it was seen as a view library. It said so on the website: *"the V in MVC"*! But with the growth of [render props](https://reactjs.org/docs/render-props.html), the view isn't the whole story anymore. In fact, some components don't reference the DOM *at all*!

As it happens, many of these non-view components tend to follow the same pattern, which I've dubbed the **controller component** pattern. They:

- Expect to receive a **render function** via their `children` prop
- Pass an **output object** to that render function with state and actions
- Don't create any markup elements
- Don't pass store any elements on the output object
- Don't use any styles
- Are tasked with managing data and state

## Controller components

There are a number of well-known controller components -- you may have already used some! The `<Consumer>` component in React's [Context API](https://reactjs.org/docs/context.html#consumer) is a controller component, as is the `<Route>` component in [react-router 4](https://reacttraining.com/react-router/web/api/Route/children-func).

Here's how a controller component would typically be used:

```js
render() {
  return (
    <AuthController>
      {output =>
        // Each time the output changes, this function will be
        // called to get the controller's new children.
        <div>{output.name}</div>
      }
    </AuthController>
  )
}
```

If you're familiar with the distinction between [presentation and container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) components -- controller components are like *renderless containers*. They manage data and behavior, but instead of passing it to other containers or presentation components within `render()`, they just pass it to the `children()` function.

## Why controllers?

There are two main reasons that I've seen for creating controller components:

1. To decouple state from presentation, so that a component's state can be stored even while not displayed to the user
2. To facilitate re-use of business logic

It turns out that these are often two facets of the same coin. To understand why, consider the following fact about component state: **unmounting a component makes its state disappear**.

## Oh state, please don't go!

What if you *want* the state to stick around for next time the component is displayed?

<img alt="My state disappeared with my component" src={require('./disappearing-state.png')} />

For a concrete example, let's say that you've been tasked with building an app with two tabs. And one of these tabs must contain a sortable `<Table />`.

Your first instinct may be to handle the sorting and filtering within the `Table` component itself. And this works great -- until the user switches tabs, *unmounting* the table component. When the user navigates back to the first tab, *her filters have disappeared!*

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Panel, Tab, Tabs } from 'react-bootstrap'
import { tameImpalaSingles } from './perthBands.js'
import { DataTable } from './DataTable.js'

class App extends React.Component {
  render() {
    return (
      <Panel>
        <Tabs id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Tame Impala" unmountOnExit>
            <DataTable
              columns={[
                { key: 'Single', title: 'Single' },
                { key: 'Year', title: 'Year' },
              ]}
              rows={tameImpalaSingles}
            />
          </Tab>
          <Tab eventKey={2} title="Tab 2" unmountOnExit>
            Tab 2 content
          </Tab>
        </Tabs>
      </Panel>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///DataTable.js
import React from 'react'
import { Table } from 'react-bootstrap'

export class DataTable extends React.Component {
  constructor() {
    super()
    
    this.state = {
      order: 'Single',
      ascending: true,
    }
  }
  
  toggleOrder(key) {
    if (this.state.order === key) {
      this.setState({
        ascending: !this.state.ascending
      })
    }
    else {
      this.setState({
        order: key,
        ascending: true,
      })
    }
  }

  render() {
    let { columns, rows } = this.props
    let { order, ascending } = this.state
  
    let sortedRows =
      order
        ? rows
            .slice(0)
            .sort((x, y) => String(x[order]).localeCompare(String(y[order])))
        : rows
    
    if (!ascending) {
      sortedRows.reverse()
    }
    
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            {columns.map(column =>
              <th
                key={column.key}
                onClick={() => this.toggleOrder(column.key)}>
                {column.title}
                {
                  column.key === this.state.order &&
                  (this.state.ascending ? "▲" : "▼")
                }
              </th>  
            )}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) =>
            <tr key={i}>
              {columns.map(column =>
                 <td key={column.key}>{row[column.key]}</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}
///helper:perthBands.js
///helper:styles.css
///helper:index.html
```

In order to keep the user's input around after the table has been unmounted, you'll need to move the state into a component at a high enough level that it *isn't* unmounted when the user switches tabs -- and then pass it down via `props`. Within the React community, this process is often called "lifting state up".

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Panel, Tab, Tabs } from 'react-bootstrap'
import { tameImpalaSingles } from './perthBands.js'
import { DataTable } from './DataTable.js'

class App extends React.Component {
  constructor() {
    super()
    
    this.state = {
      order: 'Single',
      ascending: true,
    }
  }
  
  toggleOrder = (key) => {
    if (this.state.order === key) {
      this.setState({
        ascending: !this.state.ascending
      })
    }
    else {
      this.setState({
        order: key,
        ascending: true,
      })
    }
  }

  render() {
    return (
      <Panel>
        <Tabs id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Tame Impala" unmountOnExit>
            <DataTable
              columns={[
                { key: 'Single', title: 'Single' },
                { key: 'Year', title: 'Year' },
              ]}
              rows={tameImpalaSingles}
              order={this.state.order}
              ascending={this.state.ascending}
              onToggleOrder={this.toggleOrder}
            />
          </Tab>
          <Tab eventKey={2} title="Tab 2" unmountOnExit>
            Tab 2 content
          </Tab>
        </Tabs>
      </Panel>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///DataTable.js
import React from 'react'
import { Table } from 'react-bootstrap'

export class DataTable extends React.Component {
  render() {
    let { columns, rows, order, ascending, onToggleOrder } = this.props
  
    let sortedRows =
      order
        ? rows
            .slice(0)
            .sort((x, y) => String(x[order]).localeCompare(String(y[order])))
        : rows
    
    if (!ascending) {
      sortedRows.reverse()
    }
    
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            {columns.map(column =>
              <th
                key={column.key}
                onClick={() => onToggleOrder(column.key)}>
                {column.title}
                {
                  column.key === order &&
                  (ascending ? "▲" : "▼")
                }
              </th>  
            )}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) =>
            <tr key={i}>
              {columns.map(column =>
                 <td key={column.key}>{row[column.key]}</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}
///helper:perthBands.js
///helper:styles.css
///helper:index.html
```

Problem solved, right? Lifting up state is a fine solution in a small demo like this. But imagine for a moment that you're working on a real-world app, with *lots* of tables, *lots* of charts, and one massive component somewhere that handles all of this... or actually, don't imagine that. It'll probably give you nightmares.

## Structured vs unstructured state

One of the hidden benefits of storing state close to where it is used is that it gives you well structured state for free. *Your component state has the same structure as your component tree*. But once you start lifting state up... that structure disappears.

This dichotomy between ephemeral, structured state and enduring, unstructured state is the reason for all the consternation about "state management" within the React community. As apps grow, more state needs to be lifted up, and things started to get crowded. Cue tools for structuring state.

As you may have guessed, Redux is one approach to structuring state. And for truly top-level state -- things like cached requests or drag-and-drop state -- it's a great solution. But Redux presents its own problems, and forces you to leave everything you know about React at the door. If you just want to store some filters, it's overkill.

A simpler way to manage your table's state is to output it from a controller component, and pass it down to the `<Table />` element via props. Here's how:

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Panel, Tab, Tabs } from 'react-bootstrap'
import { tameImpalaSingles } from './perthBands.js'
import { DataTable, OrderController } from './DataTable.js'

class App extends React.Component {
  render() {
    return (
      <OrderController defaultOrder='Year'>
        {orderSnapshot =>
          <Panel>
            <Tabs id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Tame Impala" unmountOnExit>
                <DataTable
                  columns={[
                    { key: 'Single', title: 'Single' },
                    { key: 'Year', title: 'Year' },
                  ]}
                  rows={tameImpalaSingles}
                  order={orderSnapshot.order}
                  ascending={orderSnapshot.ascending}
                  onToggleOrder={orderSnapshot.toggleOrder}
                />
              </Tab>
              <Tab eventKey={2} title="Tab 2" unmountOnExit>
                Tab 2 content
              </Tab>
            </Tabs>
          </Panel>
        }
      </OrderController>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///helper:DataTable.js
///helper:perthBands.js
///helper:styles.css
///helper:index.html
```

## Reusing controllers

Moving your component's logic into a controller component has the bonus of making it more reusable.

To continue with the table example, imagine that your task has suddenly changed <small>(as tasks inevitably do)</small>, and now you need *two* tables -- and one of them should *always* have the *"TODO"* filter.

Because your table's logic is all bundled up in a component, reusing it is simple as adding another instance of that component. And because the state is all exposed on the output object, adding the extra *"TODO"* filter is simple!

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Panel, Tab, Tabs } from 'react-bootstrap'
import { tameImpalaSingles, methylEthylAlbums } from './perthBands.js'
import { DataTable, OrderController } from './DataTable.js'

class App extends React.Component {
  render() {
    return (
      <OrderController defaultOrder='Year'>
        {tameImpalaOrderSnapshot =>
          <OrderController defaultOrder='Album'>
            {methylEthylOrderSnapshot =>
              <Panel>
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="Tame Impala" unmountOnExit>
                    <DataTable
                      columns={[
                        { key: 'Single', title: 'Single' },
                        { key: 'Year', title: 'Year' },
                      ]}
                      rows={tameImpalaSingles}
                      order={tameImpalaOrderSnapshot.order}
                      ascending={tameImpalaOrderSnapshot.ascending}
                      onToggleOrder={tameImpalaOrderSnapshot.toggleOrder}
                    />
                  </Tab>
                  <Tab eventKey={2} title="Methyl Ethyl" unmountOnExit>
                    <DataTable
                      columns={[
                        { key: 'Album', title: 'Album' },
                        { key: 'Year', title: 'Year' },
                      ]}
                      rows={methylEthylAlbums}
                      order={methylEthylOrderSnapshot.order}
                      ascending={methylEthylOrderSnapshot.ascending}
                      onToggleOrder={methylEthylOrderSnapshot.toggleOrder}
                    />
                  </Tab>
                </Tabs>
              </Panel>
            }
          </OrderController>
        }
      </OrderController>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///helper:DataTable.js
///helper:perthBands.js
///helper:styles.css
///helper:index.html
```

## Controller mountains

As you start to use more controllers, you'll soon run into a problem reminiscent of callback pyramids. I like to call these **controller mountains**. In fact, if you've been using the Context API, you may have already created a controller mountain or two!

<img alt="Mountains of callbacks are very bad" src={require('./mountains-of-callbacks.png')} />

Luckily, controller mountains are easily dealt with using the `<Combine>` component from the [react-controllers](https://github.com/jamesknelson/react-controllers) package. This component expects that each of its props is a function that returns a controller element:

```js
children => <Controller props='can' be='anything' children={children} />
```

It then threads the outputs of each controller into the output of its own `children` function. For example, here's how you'd combine the two controllers in the above Table example:

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Panel, Tab, Tabs } from 'react-bootstrap'
import { Combine } from 'react-controllers'
import { tameImpalaSingles, methylEthylAlbums } from './perthBands.js'
import { DataTable, OrderController } from './DataTable.js'

class App extends React.Component {
  render() {
    return (
      <Combine
        tameImpala={children =>
          <OrderController defaultOrder='Year' children={children} />
        }
        methylEthyl={children =>
          <OrderController defaultOrder='Album' children={children} />
        }
      >
        {orderSnapshots =>
          <Panel>
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Tame Impala" unmountOnExit>
                <DataTable
                  columns={[
                    { key: 'Single', title: 'Single' },
                    { key: 'Year', title: 'Year' },
                  ]}
                  rows={tameImpalaSingles}
                  order={orderSnapshots.tameImpala.order}
                  ascending={orderSnapshots.tameImpala.ascending}
                  onToggleOrder={orderSnapshots.tameImpala.toggleOrder}
                />
              </Tab>
              <Tab eventKey={2} title="Methyl Ethyl" unmountOnExit>
                <DataTable
                  columns={[
                    { key: 'Album', title: 'Album' },
                    { key: 'Year', title: 'Year' },
                  ]}
                  rows={methylEthylAlbums}
                  order={orderSnapshots.methylEthyl.order}
                  ascending={orderSnapshots.methylEthyl.ascending}
                  onToggleOrder={orderSnapshots.methylEthyl.toggleOrder}
                />
              </Tab>
            </Tabs>
          </Panel>
        }
      </Combine>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///helper:DataTable.js
///helper:perthBands.js
///helper:styles.css
///helper:index.html
```


## A word of warning

Controllers are incredibly useful. Combined with the Context API, they can go a long way to structuring your higher-level state. However, controllers do have an Achilles heel: they're a footgun when combined with `shouldComponentUpdate` or `PureComponent`. To experience this first-hand, try figuring out why the "Increase counter 1" button doesn't work in this example, while the "Increase counter 2" button does:

```js{unpersisted}
///main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { CounterController } from './CounterController.js'

class App extends React.Component {
  render() {
    return (
      <CounterController>
        {counter1 =>
          <CounterController>
            {counter2 =>
              <p>
                <button onClick={counter1.increase}>
                  Increase counter 1 ({counter1.count})
                </button>
                <button onClick={counter2.increase}>
                  Increase counter 2 ({counter2.count})
                </button>
              </p>
            }
          </CounterController>
        }
      </CounterController>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
///CounterController.js
import React from 'react'

export class CounterController extends React.Component {
  constructor() {
    super()
    
    this.state = { count: 0 }
  }
  
  increase = () => {
    this.setState(state => ({ count: state.count+1 }))
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.count !== this.state.count
  }
  
  render() {
    return this.props.children({
      count: this.state.count,
      increase: this.increase,
    })
  }
}
```

Because controllers are just plain old React components, they're re-rendered each time their parent is called. And because the result of their `children()` function is returned from `render()`, the `children()` function won't be called if `shouldComponentUpdate()` returns false -- *even if the parent has passed something new into `children`!*.

**You should never, ever use `shouldComponentUpdate()` or `PureComponent` with a controller**.

Controllers can be hard to optimize, and putting controllers near the top of a large application can cause performance problems. But in small apps, you'll have new problems. And even in large apps, a few well-placed controllers aren't going to send you to performance hell.

> Premature optimization is the root of all evil.
>
> -- <cite>Donald Knuth</cite>

Of course, you don't need to build your entire app from controllers to benefit from improved reusability and code clarity. And since you'll be using the Context API one way or another, learning the ins and out of controllers can only be a good thing!

That's it for this episode of *React Render Props Patterns*, but stay tuned for the more...
