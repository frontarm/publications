import { Housekeeping, Spoiler, Important, InlineSubscribe, Caution, Reference, Story, Details } from 'shared/documentHelpers'
export { breadboardHelpers } from './breadboardHelpers'

This cheatsheet contains live examples of a number of common React events. You can learn more about events in the [Event handlers](/courses/react-fundamentals/events-state-effects/event-handlers/) lesson of my [React fundamentals course](/courses/react-fundamentals/).

## Keyboard

Keyboard events can be used with any focusable element. This includes HTML form elements, as well as any element with a `tabIndex` property.

&bullet; `onKeyDown` is called when a key is depressed<br />
&bullet; `onKeyPress` is called after the key is released, but before `onKeyUp` is triggered<br />
&bullet; `onKeyUp` is called last, after the key is pressed

### Event object summary

To check the key that was pressed, use the `key` property. This holds a string that represents the key.

The `altKey`, `ctrlKey`, `metaKey` and `shiftKey` properties let you check if a modifier key was depressed at the time of the event. These are all booleans.

A numeric `keyCode` property is also available, but try to avoid this as it will make your code harder to read.

### Examples

#### Order of events and available properties

```jsx{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'

function handler(event) {
  console.log({
    key: event.key,
    keyCode: event.keyCode,
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    shiftKey: event.shiftKey,
  })
}

export const App = () =>
  <input
    placeholder='Hit a key...'
    onKeyDown={handler}
    onKeyPress={handler}
    onKeyUp={handler}
  />
///helper:index.js
```

#### Keyboard events on non-form elements

```jsx{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'

export const App = () =>
  <div>
    <p tabIndex={-1}
       style={{ backgroundColor: 'lightgreen' }}
       onKeyDown={event => console.log(event.key)}>
      Click to focus, then hit a key.
    </p>
    
    <p style={{ backgroundColor: 'pink' }}
       onKeyDown={event => console.log(event.keyCode)}>
      No tabIndex means no keyboard events
    </p>
  </div>
///helper:index.js
```

## Focus

&bullet; `onBlur` is called when a control loses focus<br />
&bullet; `onFocus` is called when a control receives focus

When switching between elements, `onBlur` will always be called before `onFocus`.

### Event object summary

It is probably best to avoid the event object for focus events, as browser support for the underlying events varies significantly. In particular, the `preventDefault()` method will not work reliably.

### Example

See how focus and blur events are fired by clicking on a button, and using the Tab or shift-Tab key combinations to navigate between them.

```jsx{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'

export const App = () => 
  <div>
    <button onFocus={() => console.log('focussed button 1')}
            onBlur={() => console.log('blurred button 1')}>
      Button 1
    </button>
    <br />
    <button onFocus={() => console.log('focussed button 2')}
            onBlur={() => console.log('blurred button 2')}>
      Button 2
    </button>
  </div>
///helper:index.js
```

## Form

&bullet; `onChange` is called when the user changes the value in a form control.<br />
&bullet; `onInput` is identical to `onChange`. Prefer `onChange` where possible.<br />
&bullet; `onSubmit` is a special prop for `<form>` elements that is called when a `<button type='submit'>` is pressed, or when the user hits the *return* key within a field.

### Event object summary

For `onChange`, the `event.target` object allows you to acces the control
's [DOM node](https://developer.mozilla.org/en/docs/Web/API/Node). You can then use `event.target.value` to get the new value that was entered into the control.

The `event.preventDefault()` method allows you to prevent default behavior. When used within `onSubmit`, this will prevent the browser from navigating to a new page. When used within `onChange`, it will prevent whatever character was entered from being added to the control.

### Examples

#### Modifying user input

```jsx{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'

export class App extends React.Component {
  state = {
    value: '',
  }

  render() {
    return (
      <input
        value={'$'+this.state.value}
        onChange={event => {
          console.log(
            'event target value:',
            event.target.value
          )

          this.setState({
            value: event.target.value.replace(/^\$/, '')
          })
        }}
      />
    )
  }
}
///helper:index.js
```

#### Preventing navigation on form submission

```jsx{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'

export const App = () =>
  // Without `event.preventDefault()`, pressing submit will
  // cause the browser to reload the page.
  <form onSubmit={event => {
    event.preventDefault();
    console.log('submitted')
  }}>
    <input placeholder='Press enter to submit' /><br />
    <button type='submit'>Submit</button>
  </form>
///helper:index.js
```

## Mouse

&bullet; `onClick`: a mouse button was pressed and released. Called before `onMouseUp`. <br />
&bullet; `onContextMenu`: the right mouse button was pressed.<br />
&bullet; `onDoubleClick`<br />
&bullet; `onMouseDown`: a mouse button is depressed<br />
&bullet; `onMouseEnter`: the mouse moves over an element or its children<br />
&bullet; `onMouseLeave`: the mouse leaves an element <br />
&bullet; `onMouseMove` <br />
&bullet; `onMouseOut`: the mouse moves off of an element, or onto one of its children <br />
&bullet; `onMouseOver`: the mouse moves directly over an element <br />
&bullet; `onMouseUp`: a mouse button was released

React's drag and drop events have access to the same event object properties as the mouse events. However, I'd recommend using [react-dnd](https://github.com/react-dnd/react-dnd) instead of using the raw events where possible. For reference, the drag/drop events are:

`onDrag` `onDragEnd`  `onDragEnter` `onDragExit` `onDragLeave` `onDragOver` `onDragStart` `onDrop`

### Event object summary

The `button` property holds a number that represents which mouse button was pressed. This will be `0` for the left button and `1` for the middle button. Theoretically, `2` represents the right button, but most browsers will not trigger any events other than `onContextMenu` when the right button is pressed.

The properties `altKey`, `ctrlKey`, `metaKey` and `shiftKey` allow you to check if a modifier key was pressed on your keyboard when the event was triggered, just like with keyboard events. These are all booleans.

The `preventDefault()` method can be used to cancel default click actions. For example, to prevent the browser from navigating when a link is clicked, you can call `event.preventDefault()` within an `<a>` element's `onClick` handler.

There are also a number of positioning properties:

&bullet; `clientX` and `clientY` contain the coordinates measured from the top left of the visible part of the page (regardless of the scroll position)<br />
&bullet; `pageX` and `pageY` contain the coordinates from the top of the page -- which may be currently off-screen due to scrolling.<br />
&bullet; `screenX` and `screenY` give the position within the entire screen.

### Examples

#### Visualizing mouse position

Hover your mouse over the preview area to see the values of the positioning properties.

```jsx{unpersisted}
///App.js
import React from 'react'

export class App extends React.Component {
  handleEvent(event, show) {
    // Clone the event, as React synthetic events are mutable and
    // will change before the `setState` reducer is called.
    let eventClone = Object.assign({}, event)

    this.setState(state => ({
      event: eventClone,
      show: show === undefined ? state.show : show,
    }))
  }

  render() {
    let { event = {}, show = false } = this.state || {}
    
    return (
      <div
        className='target'
        onMouseMove={(event) => this.handleEvent(event)}
        onMouseEnter={(event) => this.handleEvent(event, true)}
        onMouseLeave={(event) => this.handleEvent(event, false)}
      >
        { show &&
          <div style={{position:'fixed',top:event.clientY,left:event.clientX}}>
            clientX: {event.clientX}<br />
            clientY: {event.clientY}<br />
            pageX: {event.pageX}<br />
            pageY: {event.pageY}<br />
            screenX: {event.screenX}<br />
            screenY: {event.screenY}<br />
          </div>
        }
      </div>
    )
  }
}
///styles.css
.target {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background-color: beige;
}
///helper:index.js
```

#### Preventing navigation when links are clicked

Without `event.preventDefault()`, clicking the link in the preview pane would reload the page.

```jsx{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'

export const App = () => 
  <a onClick={e => e.preventDefault()}
     href='/404'>
    <code>event.preventDefault()</code> prevents navigation on
    <code> &lt;a&gt;</code> tags.
  </a>
///helper:index.js
```

#### Right mouse button events

Try left and right clicking the different buttons to see whether the events work.

```jsx{unpersisted,defaultRightPanel=console}
///App.js
import React from 'react'

function showButton(event) {
  event.preventDefault()
  console.log(event.button == 2 ? 'right' : 'not right')
}

export const App = () =>
  <div>
    <button onClick={showButton}
            onMouseUp={showButton}>
      Right button events don't work reliably with onClick or OnMouseUp
    </button><br/>
    <button onMouseDown={showButton}>
      preventDefault stops right button events from working with onMouseDown
    </button><br/>
    <button onContextMenu={showButton}>
      Only right button events work with onContextMenu
    </button>
  </div>
///helper:index.js
```

#### onMouseEnter/onMouseLeave vs. onMouseOver/onMouseOut

Note how `onMouseEnter` and `onMouseLeave` are only called when you move your mosue over the red box, while `onMouseOver` and `onMouseOut` are called when the mouse movers over the blue child too.

```jsx{unpersisted}
///App.js
import React from 'react'

export class App extends React.Component {
  state = {
    enter: 0,
    leave: 0,
    over: 0,
    out: 0,
  }

  render() {
    return (
      <div
        style={{width: 200, height: 200, backgroundColor: 'red'}}
        onMouseEnter={() =>
          this.setState(state => ({ enter: state.enter + 1 }))
        }
        onMouseLeave={() =>
          this.setState(state => ({ leave: state.leave + 1 }))
        }
        onMouseOver={() =>
          this.setState(state => ({ over: state.over + 1 }))
        }
        onMouseOut={() =>
          this.setState(state => ({ out: state.out + 1 }))
        }
      >
        Enter called {this.state.enter} times<br />
        Leave called {this.state.leave} times<br />
        Over called {this.state.over} times<br />
        Out called {this.state.out} times<br />
        <div style={{width: 100, height: 100, backgroundColor: 'blue'}} />
      </div>
    )
  }
}
///helper:index.js
```
