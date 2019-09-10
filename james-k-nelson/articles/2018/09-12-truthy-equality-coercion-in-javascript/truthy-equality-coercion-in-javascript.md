import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet } from 'shared/documentHelpers'

So today I learned something <del>terrifying</del> interesting: in JavaScript, "truthy" things aren't always equal to `true`, even with the *not-at-all-precise* `==` operator.


## What is truth<small>y</small>?

*Truthy* isn't some hand-wavy word that I came up while blogging after drinking. It actually has a specific meaning. Here's the definition [according to MDN](https://developer.mozilla.org/en-US/docs/Glossary/Truthy):

> In JavaScript, a truthy value is a value that is considered `true` when evaluated in a Boolean context. All values are truthy unless they are defined as falsy (i.e., except for `false`, `0`, `""`, `null`, `undefined`, and `NaN`).

What this means in practice is that if you use a truthy thing like the string "flying-whale" as the condition for an `if` or `while` statement, then the condition will pass.

```js{unpersisted,defaultRightPanel=console,defaultIsRightPanelMaximized}
// The string "flying-whale" is truthy
if ("flying-whale") {
  console.log('Hello, ground!')
}
```


## Truthy ain't true

If flying whales are truthy, then the obvious question becomes: *are they also true?* Take a look at this example's console output to find out.

```js{unpersisted,defaultRightPanel=console,defaultIsRightPanelMaximized}
console.log(
  "Computer, are flying whales true?",
  "flying-whale" == true
)
```

<Aside>
<Details>

For what it's worth, JavaScript doesn't consider the string `"falling-petunias"` to be `true` either. But I guess it can't take *all* of its design decisions from [the hitchhiker's guide](https://www.goodreads.com/quotes/198068-another-thing-that-got-forgotten-was-the-fact-that-against).

</Details>
</Aside>

Learning how `if` statements actually work surprised me. I thought that they checked if the expression was `== true`, but in fact they check if the expression is truthy. And this is great - it means that JavaScript isn't coercing values in ludicrous ways.

This makes a lot of sense. In fact, it makes a *suspicious* amount of sense. *Aren't we dealing with JavaScript here?*


## Counting flying whales

The string `"flying-whales"` does not equal `true`. And you'd expect that numbers *<small>(representing counts of flying whales)</small>* won't be true either.

Obviously, `2` *<small>flying whales</small>* won't be true; *<small>the very idea of multiple whales flying around at the same time is outlandish!</small>* But what about `1` *<small>flying whale</small>*?

```js{unpersisted,defaultRightPanel=console,defaultIsRightPanelMaximized}
let flyingWhaleCount = 3

function helloGround() {
  console.log(flyingWhaleCount, " whales falling to the ground")
  console.log(flyingWhaleCount, " whales falliiing")
  console.log('One "hello ground" and a big wet thud sound')

  --flyingWhaleCount

  console.log(flyingWhaleCount, " whales falling to the ground")
  
  console.info(flyingWhaleCount == true)
}


helloGround()
helloGround()
```

If you don't want to go to the trouble of reading my wonderful algorithmically generated folk song, then here's the gist of it:

- `2 == true` evaluates to `false`
- `1 == true` evaluates to `true`

[Wat?](https://www.destroyallsoftware.com/talks/wat)

JavaScript's `==` operator, <small>like the rest of JavaScript,</small> is a little funny. It considers some things to be equal, even with they're not. Or in programmer jargon, it **coerces** things. This is why people sometime use the phrase **loose equality** when talking about the `==` operator.

Control statements like `if` and `while` are also loose, but in a completely different way to the `==` operator. They check whether something is **truthy**, which is a much broader categorization than `== true`.

But what if you want to check if something is *actually* `true`? Then you need to use strict equality.


## Equality without coercion

<Aside>
<Details>

I also realized today that there must be a lot of politically minded computer scientists out there naming these things.

</Details>
</Aside>

> **coercion** The action or practice of persuading someone to do something by using force or threats.
> 
> -- <cite>The Oxford English Dictionary</cite>


JavaScript has two equality operators: `==`, which you've already seen, and the **strict equality** operator `===`.
Many JavaScript developers (and lint tools) prefer `===` over `==`, because it doesn't do any coercion. It only evaluates to `true` if both sides are *exactly* equal... unless both sides are `NaN`, in which case it still evaluates to `false`. And there's actually a good reason for this: that's how [floating point numbers](https://en.wikipedia.org/wiki/IEEE_754) work in other languages too!


```js{unpersisted,defaultRightPanel=console,defaultIsRightPanelMaximized}
console.log("Is 1 `true`?", 1 == true)
console.log("Is 1 strictly `true`?", 1 === true)

console.log("Is -1 `true`?", -1 == true)
console.log("Is -1 strictly `true`?", -1 === true)

console.log("NaN === NaN?", NaN === NaN)
```


## A veritable minefield

I've been using JavaScript a while, and I only realized that truthy and `== true` are different things *today*. But what brought on that realization?

[The JavaScript Equality Table Game &raquo;](https://slikts.github.io/js-equality-game/)

Earlier today, I had a go at this wonderful little minesweeper-esque game. After submitting my answer, I was like *"huh?"* when some of the cells didn't display either ticks or crosses. [Bartosz Szczeciński](https://twitter.com/btmpl) kindly explained why (thanks!) -- it's only checking that you correctly mark cells that are loosely equal using `==`.

I found the topic (and the game) interesting, and wanted to pay the explanation forward with this article. Since you've read this far, maybe you'd like to share it forward too? If so, there's a few buttons on the left to make it easier. Either way, thanks so much for reading!

*If you have any questions or comments, give me a shout anytime at [james@frontarm.com](mailto:james@frontarm.com)!*


## Where to now?

- Learn why JavaScript has so many callbacks in [Why Async: JavaScript and the real world &raquo;](/courses/async-javascript/promises/why-async/)
- Master React's fundamentals in my [React fundamentals course &raquo;](/courses/react-fundamentals/)
- [Become a free member](/members/register/) to be the first to hear about new articles and guides.

