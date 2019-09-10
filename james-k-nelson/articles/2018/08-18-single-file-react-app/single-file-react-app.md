import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Comment } from 'shared/documentHelpers'

Have you worked with JavaScript, CSS and HTML before? Great! That means you can create a React app. And all it takes is three steps, starting with...

## Step 1 - create a file

Create a new file called `index.html` somewhere on your computer, and copy this HTML into it:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I'm a React app!</title>
  </head>
  <body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@16.4.1/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16.4.1/umd/react-dom.production.min.js"></script>
  </body>
</html>
```

This HTML file has two jobs – it creates the `root` div that will contain your app's markup, and it loads React itself with two `<script>` tags.

Once you've created this file, let’s move on to...

## Step 2 - add a script

With your new file open in a text editor, add an empty `<script></script>` tag between the second `</script>` tag and the closing `</body>` tag. Then, type out the following code inside the new `<script>` tags.

<Housekeeping title='Why type it out instead of copy and paste?'>
Typing forces you to process each of the individual commands, drilling them into your head in the process – while copying and pasting just gives you a short feeling of cleverness and a shot of dopamine. And if you just want dopamine, quit reading and play flappy bird or something.
</Housekeeping>

```jsx
// The `React` variable is set by the first `<script>` tag
// in the above HTML file.
let createElement = React.createElement

let rootElement =
  createElement('div', {}, 
    createElement('h1', {}, "Contacts"),
    createElement('ul', {},
      createElement(
        'li',
        {},
        createElement(
          'a',
          { href: 'mailto:james@frontarm.com' },
          "James Nelson",
        ),
      ),
      createElement(
        'li',
        {},
        createElement(
          'a',
          { href: 'mailto:me@example.com' },
          "Me"
        )
      )
    )
  )

// The `ReactDOM` variable is set by the second `<script>` tag
// in the above HTML file
let domNode = document.getElementById('root')
ReactDOM.render(rootElement, domNode)
```

Phew, that took some effort. But hopefully after typing `createElement()` over and over, you'll have gotten some idea of what it does. If not, I'll explain in a moment. But first...

## Step 3 - test it out!

Open your HTML file in a web browser, and check that the output matches the preview panel of this live editor:

```jsx{theme=light}
///name:A React app in one file
///index.html
<!DOCTYPE html>
<html>
  <head>
    <title>I'm a React app!</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@16.4.1/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16.4.1/umd/react-dom.production.min.js"></script>
    <script>
      // The `React` variable is set by the first `<script>` tag
      // in the above HTML file.
      let createElement = React.createElement

      let rootElement =
        createElement('div', {}, 
          createElement('h1', {}, "Contacts"),
          createElement('ul', {},
            createElement(
              'li',
              {},
              createElement(
                'a',
                { href: 'mailto:james@frontarm.com' },
                "James Nelson",
              ),
            ),
            createElement(
              'li',
              {},
              createElement(
                'a',
                { href: 'mailto:me@example.com' },
                "Me"
              )
            )
          )
        )

      // The `ReactDOM` variable is set by the second `<script>` tag
      // in the above HTML file
      let domNode = document.getElementById('root')
      ReactDOM.render(rootElement, domNode)
    </script>
  </body>
</html>
```

If you had trouble getting it work in the browser, try clearing the editor above and typing out the example there - the preview will update as you type. And once you've got it working, copy it over to your HTML file and try again.

Did you get it to work? Then congratulations! You've build a simple React app - without using JSX, Webpack, or even NPM! But what is actually going on here?


## How it works

At it's core, React is a library for creating and updating HTML markup.

`ReactDOM.render()` is the function that does the creating and updating. It takes a React Element object -- the thing returned by `createElement()` -- and uses this to update the page's markup via the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) node passed in as the second argument.

But wait a moment, isn't `React.createElement()` creating elements? It is! But maybe not in the way you'd expect.

The **React Element** objects that `React.createElement()` returns are just plain old JavaScript objects that describe the DOM nodes that you'd like `ReactDOM.render()` to create. They're *not* DOM nodes, and *not* added to the document. *They're just objects,* with the properties `type` and `props`. For example:

```js
{
  // The type of element to use. It can be the name of a HTML element,
  // or can be a custom type (which we'll get to later).
  type: 'a',

  // Configures the created HTML element's attributes and children.
  props: {
    href: 'https://xkcd.com/221/',

    // If specified, this will contain the element's content. It can be
    // a string, an array, or another React Element.
    children: {
      type: 'img',
      props: {
        src: "https://imgs.xkcd.com/comics/random_number.png",
        alt: "RFC 1149.5 specifies 4 as the standard IEEE-vetted random number.",
      }
    },
  },
}
```

The `React.createElement()` function takes three arguments: `type`, `props`, and `children`. And returns an object just like the one above.

```js
React.createElement(type, props, children)
```

You can get a feel for this by passing different parts of a returned Element object to `console.log()`. Try changing it yourself by changing the `console.log()` statements below!

```js{defaultRightPanel=console,theme=light}
///name:Creating and Rendering Elements
///main.js
let element =
  React.createElement(
    // The first argument is the element's `type`
    'a',

    // The second argument is the element's `props`
    { href: 'https://xkcd.com/222/' },

    // Any further arguments, if given, are merged into to
    // `props` under the name `children`.
    React.createElement(
      'img',
      {
        src: "https://imgs.xkcd.com/comics/random_number.png",
        alt: "RFC 1149.5 specifies 4 as the standard IEEE-vetted random number.",
      }
    ),
    React.createElement(
      'span',
      null,
      'By Randall Munroe',
    )
  )

// Try logging different parts of the `element` object
console.log(element.props.children[0].type)
console.log(element.props.children[1].props.children)

ReactDOM.render(
  element,
  document.getElementById('root')
)
///index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Untitled App</title>
    <script src="https://unpkg.com/react@16.4.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.4.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/prop-types@15.6.2/prop-types.js"></script>
    <style type="text/css">
      img {
        max-width: 100%;
      }
      span {
        display: block;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="main.js"></script>
  </body>
</html>
```

The `React.createElement()` function is *The Most Important* of React's three fundamental concepts: elements, components, and component instances.

Learning the fundamentals is a great way to boost your understanding of the rest of React's ecosystem. As a bonus, the fundamentals rarely change. In fact, other than the URLs in the `<script>` tags, the exercise's code is unchanged from a [similar guide](http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/) I wrote 3 years ago!

Do you want to invest in a deeper understanding of React's fundamentals, and gain an important skill that'll stay with you for years? Then click through to my [React fundamentals](/courses/react-fundamentals/) course. You've just worked through most of the first two lessons, so you're off to a great start!
