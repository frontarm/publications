import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet } from 'shared/documentHelpers'

So you've probably noticed the recent rise of **headless components** -- i.e. components that facilitate the reuse of control logic by delegating their presentation to a render prop.

There's a good reason that headless components have become so popular - they're super practical. And context makes them *even better*, because it solves one weakness that can make you pull your hair out...


Consider `<Link>`
-----------------

If you don't mind feeling frustrated for a very short moment, take a look at this headless `<Link>` component. Its render function's `props` object provides all of the state that you need to render the `<a>` tag. But it still leaves *you* with the task of picking and placing that state onto the `<a>` tag, as if you were some kind of factory robot.

```js
<Link href="/browse" render={props =>
  <a {???} style={getStyle(props.active)}>
    Browse
  </a>
}>
```

Of course, there are ways of getting around this. One common approach is to provide an `aProps` prop, which can be spread onto the `<a>` tag:

```js
<Link href="/browse" render={props =>
  <a {...props.aProps} style={getStyle(props.active)}>
    Browse
  </a>
}>
```

But this has it's own issues:

- This pattern works when your headless component should render a *single* `<a>` tag, but what if your render function should render *multiple* `<a>` tags? Things rapidly get confusing.
- What if `aProps` contains a `style` prop? The render function would need to manually merge it in, creating a lot of work, not to mention opening the possibility of buggy code that fails to do so.
- The `aProps` object will certainly have some events handlers -- but *which* event handlers? Not knowing means that merging any of your own handlers in will be a PITA.

And that's all before I mention the most problematic issue of all:

- **It doesn't truly separate the concerns.** The render function shouldn't need to know that the `<Link>` control requires an `<a>` tag with specific props!


True separation of concerns
---------------------------

In a happy dreamy world, the `render()` function would have access to some sort of `<Anchor>` component that can be used *without* knowledge of its internals. This `<Anchor>` component would know how to merge in any styles, handlers, etc. And it might look something like this:

```js
<Link href="/browse" render={props =>
  <Link.Anchor style={getStyle(props.active)}>
    Browse
  </Link.Anchor>
}>
```

In fact, this API is not only *possible* (thanks to context) -- it's also already available in a package that I'll be announcing next week(ish). If you'd like to try it, [join Frontend Armory](/members/register/) to stay in the loop! But it seems that I've gone on a bit of a tangent... so let's get back on topic and take a look at how you'd build this `<Link>` component by yourself.


Compound headless components, with React Context
------------------------------------------------

To implement this design, you're first going to need some components:

- You'll (obviously) need a `<Link>` component.
- You'll also need a `<Link.Anchor>` component. I'd usually call this component `<LinkAnchor>`, and then just assign it to a `static Anchor` property on the `<Link>` component.
- Finally, you'll need a Context object to pass data between the `<Link>` and `<LinkAnchor>` components.

Let's go through these in more detail, starting with the Context object. 


### 1. Create a context

Creating a context is simple. Just call `React.createContext().`

```jsx
const LinkContext = React.createContext({
  href: '',
  onClick: () => {},
})
```

The object I've passed into `createContext` contains the default value that Consumers will use if no Provider is available. Of course, this should never happen for a `<Link>` component. But nonetheless, it's a great way to document the context's expected value.


### 2. Create a child component

The `<LinkAnchor>` component has two jobs. First, it needs to pull its parent `<Link>` component's `href` and `onClick` out of context. Then, it needs to merge that state with any props passed in from the render function itself, and apply them to the `<a>` tag.

Here's what this might look like in practice:

<Aside>
<Details>

This component would probably look pettier with React's proposed [useContext() hook](https://reactjs.org/docs/hooks-reference.html#usecontext).

If you're looking for a way to try hooks, try refactoring the `<LinkAnchor>` component in the live editor at the bottom of this page. The editor uses an alpha version of React, so hooks will work -- just don't try this in production!

</Details>
</Aside>

```jsx
const LinkAnchor = props => (
  <LinkContext.Consumer>
    {linkContext =>
      <a
        // Spread any props passed to `<Link.Anchor>` onto the `<a>`
        {...props}

        // Set the `href` from context 
        href={linkContext.href}

        // Call *both* onClick handlers, if they exist
        onClick={event => {
          if (props.onClick) {
            props.onClick(event)
            if (!event.defaultPrevented) {
              linkContext.onClick(event)
            }
          }
        }}
      />
    }
  </LinkContext.Consumer>
)
```

You might have noticed the long-winded `onClick` handler in the above example -- what's with *that?* The comment gives you a clue: if `props.onClick` and `linkContext.onClick` both exist, then they both need to be called -- *unless the first caller calls `event.preventDefault()`*. And that's why I only call `linkContext.onClick` if `event.defaultPrevented` isn't true.


### 3. Tie everything together

Now that you have a `<LinkAnchor>` component to render the actual `<a>` tag, all that `<Link>` needs to do is call the render function, and set up the context so that `<LinkAnchor>` has access to the correct state.

```jsx
export class Link extends React.Component {
  // Exporting `LinkAnchor` as a static variable on `<Link>` makes it clear
  // that `LinkAnchor` is only meant to be used in conjunction with `<Link>`.
  static Anchor = LinkAnchor

  render() {
    // This should contain any state that is needed to render the actual
    // `<a>` tag.
    let linkContext = {
      href: this.props.href,
      onClick: this.onClick,
    }

    // This should contain any props that the render function needs to
    // handle presentation.
    let rendererProps = {
      active: this.props.href === window.location.pathname
    }

    // The `<LinkContext.Provider>` passes `linkContext` to the
    // `<LinkContext.Consumer>` that is used in `<Link.Anchor>`.
    return (
      <LinkContext.Provider value={linkContext}>
        {this.props.render(rendererProps)}
      </LinkContext.Provider>
    )
  }

  onClick = (event) => {
    window.location = this.props.href
  }
}
```

Simple, huh? In fact, this example is a little *too* simple; other than the `active` boolean that is passed to the render function, this `<Link>` component doesn't really provide any extra features compared to a plain old `<a>` tag. But despite the simplicity, there's something really cool going on.

As it happens, the `<Link>` component that drives Frontend Armory has an identical API to this component. Of course, Frontend Armory's `<Link>` has many more features -- but any render function that you write for the simple example above will *also* work for the full featured `<Link>`.

And that's the beauty of context and headless components - they make separating presentation from logic *that* much easier.


A real-world example
--------------------

To finish off, it often helps to see how concepts are used in the real world. So here's a live editor with the full featured `<Link>` component that drives Frontend Armory -- in all of its not-cleaned-up-for-publication glory.

Just like the above example, this `<Link>` is a headless component that passes state to a `<Link.Anchor>` component via context. But unlike the above component, it has a default `render` prop that allows it to be used as a plain old `<a>` tag -- which makes it perfect for use with MDX.

*This might be a little easier to read if you put the editor into fullscreen with the button at its top right.*

```jsx{unpersisted,defaultRightPanel=console}
///Link.js
import React from 'react'
import * as Navi from 'navi'
import { NavConsumer } from 'react-navi'

export const LinkContext = React.createContext()

export const LinkAnchor = props => (
  <LinkContext.Consumer>
    {context => {
      let linkURL = context.url
      let handleClick = context.handleClick
      if (props.onClick) {
        handleClick = (event) => {
          props.onClick(event)
          if (!event.defaultPrevented) {
            context.handleClick(event)
          }
        }
      }

      return (
        <a
          id={context.id}
          lang={context.lang}
          ref={context.anchorRef}
          rel={context.rel}
          tabIndex={context.tabIndex}
          target={context.target}
          title={context.title}

          {...props}

          href={linkURL ? linkURL.href : context.href}
          onClick={handleClick}
        />
      )
    }}
  </LinkContext.Consumer>
)

export const Link = React.forwardRef((props, anchorRef) =>
  <NavConsumer>
    {context => <InnerLink {...props} context={context} anchorRef={anchorRef} />}
  </NavConsumer>
)

Link.Anchor = LinkAnchor

Link.defaultProps = {
  render: (props) => {
    let {
      active,
      activeClassName,
      activeStyle,
      children,
      className,
      hidden,
      style,
    } = props

    return (
      <LinkAnchor
        children={children}
        className={`${className || ''} ${(active && activeClassName) || ''}`}
        hidden={hidden}
        style={Object.assign({}, style, active ? activeStyle : {})}
      />
    )
  }
}

class InnerLink extends React.Component {
  constructor(props) {
    super(props)

    let url = this.getURL()
    if (url && url.pathname) {
      this.props.context.router.resolve(url, {
        withContent: !!props.precache,
        followRedirects: true,
      })
        .catch(() => {
          console.warn(
            `A <Link> referred to href "${url.pathname}", but the ` +
            `router could not find this path.`
          )
        })
    }
  }

  getURL()  {
    let href = this.props.href

    // If this is an external link, return undefined so that the native
    // response will be used.
    if (!href || typeof href === 'string' && (href.indexOf('://') !== -1 || href.indexOf('mailto:') === 0)) {
      return
    }

    return Navi.createURLDescriptor(href)
  }
  
  render() {
    let props = this.props
    let linkURL = this.getURL()
    let navigationURL = this.props.context.url
    let active = props.active !== undefined ? props.active : !!(
      linkURL &&
      (props.exact
        ? linkURL.pathname === navigationURL.pathname
        : navigationURL.pathname.indexOf(linkURL.pathname) === 0)
    )

    let context = {
      url: linkURL,
      handleClick: this.handleClick,

      ...props,

      href: typeof props.href === 'string' ? props.href : linkURL.href
    }

    return (
      <LinkContext.Provider value={context}>
        {props.render({
          active,
          activeClassName: props.activeClassName,
          activeStyle: props.activeStyle,
          children: props.children,
          className: props.className,
          disabled: props.disabled,
          tabIndex: props.tabIndex,
          hidden: props.hidden,
          href: linkURL ? linkURL.href : props.href,
          id: props.id,
          lang: props.lang,
          style: props.style,
          target: props.target,
          title: props.title,
          onClick: this.handleClick,
        })}
      </LinkContext.Provider>
    )
  }

  handleClick = (event) => {
    // Let the browser handle the event directly if:
    // - The user used the middle/right mouse button
    // - The user was holding a modifier key
    // - A `target` property is set (which may cause the browser to open the
    //   link in another tab)
    if (event.button === 0 &&
        !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) &&
        !this.props.target) {

      if (this.props.disabled) {
        event.preventDefault()
        return
      }

      if (this.props.onClick) {
        this.props.onClick(event)
      }
      
      let url = this.getURL()
      if (!event.defaultPrevented && url) {
        event.preventDefault()

        let currentURL = this.props.context.url
        let isSamePathname = url.pathname === currentURL.pathname
        if (!isSamePathname || url.hash !== currentURL.hash) {
          this.props.context.history.push(url)
        }
        else {
          // Don't keep pushing the same URL onto the history.
          this.props.context.history.replace(url)
        }
      }
    }
  }
}
///App.js
import React from 'react'
import { NavProvider, NavNotFoundBoundary, NavRoute } from 'react-navi'
import { Link } from './Link.js'

const LinkWithHighlight = (props) =>
  <Link {...props} exact render={({ active, children }) =>
    <Link.Anchor style={{ color: active ? 'red' : 'black' }}>
      {children}
    </Link.Anchor>
  } />

export function App(props) {
  return (
    <NavProvider navigation={props.navigation}>
      <nav>
        <LinkWithHighlight href='/'>Home</LinkWithHighlight>
        -
        <LinkWithHighlight href='/browse'>Browse</LinkWithHighlight>
        -
        <LinkWithHighlight href='/members'>Members</LinkWithHighlight>
        -
        <LinkWithHighlight href='/404'>404</LinkWithHighlight>
      </nav>
      <hr />
      <NavNotFoundBoundary render={() => <h1>404</h1>}>
        <NavRoute />
      </NavNotFoundBoundary>
    </NavProvider>
  )
}
///index.js
import * as Navi from 'navi'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'

const pages = Navi.createSwitch({
  paths: {
    '/': Navi.createPage({
      title: 'Home',
      importMDX: () =>
        <>
          <h1>Welcome</h1>
          <p>Isn't context wonderful?</p>
        </>
    }),
    '/browse': Navi.createPage({
      title: 'Browse',
      importMDX: () =>
        <>
          <h1>Browse</h1>
          <p>Through all of this example's routes within main.js</p>
        </>
    }),
    '/members': Navi.createPage({
      title: 'Members',
      importMDX: () =>
        <>
          <h1>Frontend Armory Members</h1>
          <p>Will get a bunch of new content on routing in November. If you're not already a member, sign up at the bottom of this page!</p>
        </>
    }),
  }
})

async function main() {
  const navigation = Navi.createBrowserNavigation({ pages })
  await navigation.getSteadyValue();
  ReactDOM.render(
    <App navigation={navigation} />,
    document.getElementById('root')
  )
}

main()
```

There's a lot going on in this `<Link>` that is out of the scope of this lesson. So if you're interested in hearing more about routing and context, create a free account to [get the monthly newsletter](/members/register/) and stay in the loop!

Thanks so much for reading -- I hope it's been helpful! If you have any questions or comments, or just want to discuss routing, get in touch by tweeting at [@james_k_nelson](https://twitter.com/james_k_nelson), or sending an e-mail to [james@frontarm.com](mailto:james@frontarm.com).

Finally, I want to say thank you to Adam Rackis, whose [tweet](https://twitter.com/AdamRackis/status/1052210572622786561) triggered a discussion on how to pass state to render props, and to Dan Abramov, who [suggested](https://twitter.com/dan_abramov/status/1052291335049363457) the new context API as a solution. I had another (messier) way of accomplishing this before context arrived, but context really is the perfect way to do it.