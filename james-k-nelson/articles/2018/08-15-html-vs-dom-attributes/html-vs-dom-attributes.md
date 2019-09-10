import { Doc } from '@frontarm/doc'

One confusing thing about the web is that HTML attributes have different names when they're used within JavaScript.

For example, consider this snippet of HTML:

```html
<div id='navbar' class='dark'>
  <a href="/">Home</a>
</div>
```

To interact with the navbar `<div>` from JavaScript, you'll need a **DOM node** object that represents it. And to get one, you use `document.getElementById()`.

```html
//---
rightPanel: console
//--- index.html
<div id='navbar' class='dark'>
  <a href="/">Home</a>
</div>

<script>
  let domNode = document.getElementById('navbar')

  console.log('id', domNode.id)
  console.log('href', domNode.querySelector('a').href)
</script>
```

## `class` vs. `className`

But what if you want to access the `class`? The obvious property to try would be `domNode.class`. But `class` is a reserved word in JavaScript. So instead, you'll need to access the `className` property.

```html
//---
rightPanel: console
//--- index.html
<div id='navbar' class='dark'>
  <a href="/">Home</a>
</div>

<script>
  let domNode = document.getElementById('navbar')

  console.log('class', domNode['class'])
  console.log('className', domNode.className)
</script>
```

## `style` strings vs. objects

The `style` property is also a little different, and when you think about it for a minute, its not hard to see why.

The thing about `style` strings is that each string contains many individual pieces of information. Getting or setting a single piece with string manipulation would be all kinds of awful.

And that's why **the DOM treats an element's `style` as an object instead of a string.**

To get or set the value of a single style property, you just access its camelCased name underneath the DOM node's `style` object. For example:

```html
//---
rightPanel: console
//--- index.html
<div id='important' style='border: 2px solid red; border-radius: 10px;'>
  AN IMPORTANT MESSAGE
</div>

<script>
  let domNode = document.getElementById('important')

  console.log('style.borderWidth', domNode.style.borderWidth)
  console.log('style.borderRadius', domNode.style.borderRadius)
</script>
```

## Camel casing

HTML, like most other technologies, has one of those nice-for-beginners but shit-for-everyone-else features: it's attributes are case insensitive.

Behold:

```html
//--- index.html
<div style='color: darkgreen;'><code>style</code> attribute</div>
<div STYLE='color: darkgreen;'><CODE>STYLE</CODE> attribute</div>
<div sTyLe='color: darkgreen;'><cOdE>sTyLe</CoDe> attribute</div>
```

If you first learned HTML in this century, you're probably used to seeing attributes in `lowercase`. Unfortunately, JavaScript expects them to be in `camelCase`.

And how do you convert `lowercase` to `camelCase`? Through trial and error, and after that, by checking [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

Here are a few to watch out for, as well as some other exceptions:

```html
//---
rightPanel: console
//--- index.html
<label id='shoeSize-label' for='shoeSize'>Shoe size</label>
<input id='shoeSize' tabindex='2' value='5' readonly />

<br />

<label id='phase-label' for='phase'>Phase of moon</label>
<input id='phase' tabindex='3' value='' />

<script>
console.log(document.getElementById('shoeSize-label').htmlFor)
console.log(document.getElementById('shoeSize').readOnly)
console.log(document.getElementById('phase').tabIndex)
</script>
```

<Doc.Details title='Remember!'>
If it seems that the browser is ignoring a DOM propery, it may just be a matter of capitalization.
</Doc.Details>

## More reading

- [React Fundamentals: Props and Styling](/courses/react-fundamentals/basics/props-and-styling/)
