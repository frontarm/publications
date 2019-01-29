import { Housekeeping, Spoiler, Important, InlineSubscribe, Caution, Reference, Story, Details } from 'shared/documentHelpers'
export { breadboardHelpers } from './breadboardHelpers'


JSX is just a tool that converts files like this:

```js
let element =
  <div className='test'>
    Hello, world!
  </div>
```

Into files like this:

```js
let element =
  React.createElement(
    'div',
    { className: 'test' },
    "Hello, world!"
  )
```

JSX is *not* a special way to embed HTML in JavaScript. All JSX does is replace a file's `<tags>` with equivalent calls to `React.createElement()`, using 6 rules.

This cheatsheet demonstrates the 6 rules of JSX with live examples. Get a feel for them by playing with the examples below, and seeing how the compiled output changes. If you want to reset to the initial example, just click the "..." icon, then hit "reset".

*For a printable reference, see the [PDF cheatsheet](/toolbox/react-cheatsheets/#JSX)!*


## `<tags>` are elements

JSX `<tags>` map to calls to `React.createElement()`.

Use `<lowercase />` tags when you need a DOM elements, and `<Capitalized />` tags for component elements.

```jsx{unpersisted,defaultLeftPanel=transformedSource,defaultIsLeftPanelSplit}
///index.js
// Use `<lowercase />` tags for DOM elements
let domElement = <h1>Hello, world</h1>

// And use `<Capitalized />` tags for component elements.
let HelloWorld = () => domElement
let helloWorldElement = <HelloWorld /> 

ReactDOM.render(helloWorldElement, document.getElementById('root'))
///helper:index.html
```


## JSX children become child elements

The children of a JSX tag map to the third and subsequent arguments of `React.createElement()`, i.e. they become the element's `props.children`.

JSX children can be text, elements, or a mix of both.

```jsx{unpersisted,defaultLeftPanel=transformedSource,defaultIsLeftPanelSplit}
///index.js
// Children can be text.
let textChildren = <p>What good is a phone call...</p>

// Children can be elements.
let elementChildren = <p><em>If you're unable...</em></p>

// Or they can be a mix of both.
let mixedChildren = <p>To <strong>speak?</strong></p>

ReactDOM.render(
  React.createElement(
    'div',
    null,
    textChildren,
    elementChildren,
    mixedChildren,
  ),
  document.getElementById('root')
)
///helper:index.html
```


## Attributes are `props`

- Use `""` quotes when your `props` are strings
- Use `{}` braces when your `props` are literals or variables
- And use bare attribute names to indicate a value of `true`.

```jsx{unpersisted,defaultLeftPanel=transformedSource,defaultIsLeftPanelSplit}
///index.js
let form =
  <form>
    <input value="Test 1" tabIndex={3} />
    <input
      // The `value` prop will have the string value `"Test"`
      value="Test 2"

      // The `tabIndex` prop will have the number value `2`
      tabIndex={2}

      // The `autoFocus` prop will have the boolean value `true`, but
      // I've disabled it to prevent the page starting in this example ;)
      /* autoFocus */
    />
    <input value="Test 3" tabIndex={1} />
  </form>
  
ReactDOM.render(form, document.getElementById('root'))
///helper:index.html
```


## `{}` interpolates children

When a pair of `{}` braces is encountered within a JSX element, it's value will be interpolated in as a child.

You can interpolate anything that can be passed as an element's children, including text, elements, or even arrays

```jsx{unpersisted,defaultLeftPanel=transformedSource,defaultIsLeftPanelSplit}
///index.js
let Hello = (props) => <div>Hello, {props.to}</div>

let hellosElement =
  <div>
    <Hello to="World!" />
    <Hello to={<strong style={{color: '#61dafb'}}>React!</strong>} />
    <Hello to={[<em>Mum</em>, " and ", <em>Dad</em>]} />
  </div>
  
ReactDOM.render(hellosElement, document.getElementById('root'))
///helper:index.html
```


## Empty `<>` tags

A pair of empty `<>` and `</>` tags get's turned into a `React.Fragment` element, i.e. an element that doesn't map to DOM nodes.

Fragments are useful for returning multiple cells or list items from a component.

```jsx{unpersisted,defaultLeftPanel=transformedSource,defaultIsLeftPanelSplit}
///index.js
let ListItemsComponent = () =>
  <>
    <li>Item 1</li>
    <li>Item 2</li>
  </>

let listElement =
  <ul>
    <ListItemsComponent />
  </ul>

ReactDOM.render(listElement, document.getElementById('root'))
///helper:index.html
```


## `{...object}` acts like `Object.assign()`

Passing `{...object}` as an attribute will add *all* of the properties of the object as separate attributes. It's a bit calling `Object.assign()` on the props that you'll pass to `createElement()`.

Combining JSX's `{...object}` with destructuring assignment and rest parameters is a great way to pass through some of an element's props to a child.

```jsx{unpersisted,defaultLeftPanel=transformedSource,defaultIsLeftPanelSplit}
///index.js
const Panel = ({ active, style, ...other }) =>
  <div
    style={{
      ...style,
      color: active ? 'red' : undefined,
    }}
    {...other}
  />

let element =
  <Panel active>
    Active!
  </Panel>
  
ReactDOM.render(element, document.getElementById('root'))
///helper:index.html
```
