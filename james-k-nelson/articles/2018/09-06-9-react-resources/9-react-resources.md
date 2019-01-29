import { Housekeeping, Spoiler, Important, Caution, Reference, Story, Details, Aside, Tweet } from 'shared/documentHelpers'

The React world can feel like a bit of a treadmill at times. With so many new packages, APIs and patterns... actually, scratch that. Things are more stable than you'd think, and I have the data to prove it! But before we dive in, first let me make an introduction.

If you don't know of [Mark Erikson](https://twitter.com/acemarke?lang=en), he's one of the backbones of the React community. He pours hours into maintaining Redux, tirelessly answers questions from the community, and also maintains the [most comprehensive list](https://github.com/markerikson/react-redux-links) of React/Redux links on the information superhighway.

Now one of the great things about React is the sheer quantity of resources available. But this presents its own problem: how do you know which ones to invest your time in? So a year or so ago, Mark graciously agreed to select just a few favorites from his list. And then... I left the list for a year. Now, a year later, I've reviewed whether they've passed the test of time.

**The TL;DR? React is *ridiculously* stable**. Articles written over 3 years ago are *still* incredibly useful. Examples still work without warnings -- even with the latest version of React! There are a few changes on the horizon, but 90% of what you learn about React will stay with you for *years*. And to prove it, here's Mark's 9 resources, ordered from newest to oldest:


## 9. React Lifecycle Methods - how and when to use them

*Published on March 29, 2017.*

The are often multiple ways to accomplish the same thing with lifecycle methods, making it difficult to decide which approach to take. [This piece by Scott Domes](https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1) gives you the rundown on what each method does.

Now it's true that all the examples from this article still run without warnings. However, in the time since the article was published, the React team has announced that some methods will be deprecated in the near future:

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

In addition, two new lifecycle methods have been added in their place:

- `getDerivedStateFromProps` (which can be used in place of `componentWillReceiveProps`)
- `getSnapshotBeforeUpdate` (which can be used in place of `componentWillUpdate`)

To learn about these upcoming changes, you're best to read the [official announcement](https://reactjs.org/blog/2018/03/29/react-v-16-3.html).

## 8. When to use React's Ref on a DOM node in React

*Published on March 22, 2017.*

One of React's major innovations was the virtual DOM. It lets you declare -- "hey React, this is what I want my component's markup to look like" -- and then React makes the DOM changes for you. But if you need to manually update the DOM -- for example, when creating your own dropdown component -- then you'll need to use React's `ref` prop. [Robin Wieruch's article](https://www.robinwieruch.de/react-ref-attribute-dom-node/) covers one way to do this.

A year after this article was published, the React team [introduced the `React.createRef()` API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#createref-api): an additional, simpler API for working with refs. The thing to note here is that the function-based API that Robin introduces isn't going anywhere. It provides more power than the newer API, and if you've taken the time to learn it, that knowledge will stay with you for the foreseeable future.

## 7. Props vs. State

*Published on November 27, 2016.*

React has been based around props and state *since its release in 2013*. That's an eternity in software years.

[This quick piece by Lucy Bain](http://lucybain.com/blog/2016/react-state-vs-pros/) gives you a great explanation of what props and state are, how they differ, why you need both, and which one you might want to use for a given piece of data. It's well worth the read now, and it'll likely still be worth the read in 5 years time.

## 6. [How to make AJAX requests in React?]()

*Published on November 26, 2016.*

Most real-world React apps need to work with remote data. And the simplest way of doing this is by making AJAX requests.

[This guide by Bartosz Szczeciński](https://medium.com/@baphemot/how-to-make-ajax-requests-in-react-a6a52bb5a8b1) discusses how to fetch data with AJAX, and more importantly, *where* those fetches should occur.

The only React APIs that Bartosz uses in this article are `setState()` and `componentDidMount()`. These have been around forever, and will stay around for a long time yet. And while React's [Suspense API](https://www.youtube.com/watch?v=v6iR3Zk4oDY) may provide another option to solve this problem, this resource will likely be relevant as long as React itself is.


## 5. A Visual Guide to State in React

*Published on October 19, 2016.*

If you're at all unsure about what exactly is meant by "state", [this visual guide by Dave Ceddia](https://daveceddia.com/visual-guide-to-state-in-react/) makes it clear as day. And as the title suggests, it makes wonderful use of graphics to drive the point home.

The thing about this piece is that it's about more than just React; it's an explanation of a concept that's applicable to *any* frontend development.


## 4. The 5 Types Of React Application State

*Published on August 29, 2016.*

[This article by Yours Truly](http://jamesknelson.com/5-types-react-application-state/) breaks down the different types of state that you may store in a React application, or really in any Frontend app in general.

Architecting state is going to be a problem until AI puts us programmers out of jobs, so this is going to be relevant for... probably a while yet. For what it's worth, out of the 30 most popular pieces on my blog, this one gets the second-highest amount of reading time.


## 3. Where to Hold React Component Data: state, store, static, and this

*Published on August 13, 2016.*

One of the hardest questions you'll face as a React developer is "where does this state go?" Does it go in a Redux store? Or in component state? Or somewhere else?

[This gem by Sam Corcos](https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00) answers the question by returning to first principles. It demonstrates how React components are just JavaScript, and what this means for where you put your state.

As long as React components are defined as JavaScript classes, this will be worth the read. *And if you're only going to read one article from this list, this is the one I'd recommend.*


## 2. 8 no-Flux strategies for React component communication

*Published on November 21st, 2015.*

As your React app grows, you'll start finding that components need to communicate with each other. But there are so many options -- props and callbacks and events and context -- and [this guide by Andrew H Farmer](http://andrewhfarmer.com/component-communication/) will help you choose the right one.

You may have noticed that I mentioned *"Context"*, which is something that you wouldn't expect an article from 2015 to cover. The official Context API has gone through a few updates in recent history, and Andrew has kept this part of the article up to date. But the rest has stayed much the same [since 2015](https://web.archive.org/web/20170606162929/http://andrewhfarmer.com/component-communication/).


## 1. Presentational and Container Components

*Published on March 23, 2015.*

It was completely unplanned that [this classic by Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) ended up in the pole position of this list. But given how influential it's been, it's a well deserved place.

Now as it happens, this article has gone through some updates over the years. In fact, even the name has changed - you can still see the original name in the URL. But the underlying lesson has stayed the same: you'll save yourself a lot of tears by separating your business logic from your presentation. And with React, a natural way to achieve this is to separate presentation code into separate components.


## React is ridiculously stable

React is one of the most stable frontend libraries out there. In fact, even the React docs themselves used a 2-year old version of React until a few months ago.

<div className="tweet">
  <Tweet tweetId="1017409804308905986" />
</div>

But React is at a crossroads. It's starting to change again. Planned APIs like Time Slicing and Suspense mean that you'll be able to do more with raw React. And with less dependence on 3rd party libraries, more than ever your career depends on a solid understanding of React itself.

The 9 resources above give you a great overview of many of React's fundamentals. But if you're looking for a more practical approach, my [React (without the buzzwords)](/courses/learn-raw-react/) course will guide you through the process of building a contact list app, with 55 live editable examples and exercises. You can give it a try here:

[Lesson 1: An app in one file &raquo;](/courses/learn-raw-react/basics/one-file-react-app/)

Another resource that's stayed up-to-date throughout the years is my JavaScript PDF cheatsheets. They're available for free - just login with GitHub for access:

[JavaScript PDF cheatsheets &raquo;](/toolbox/javascript-cheatsheets/)

Before I go, I want to say a big thanks to Mark for picking the resources for this list and for all the support he's given to the React community. I also want to say thanks to the authors of these articles, for creating resources that are still helping people *years* down the track. And lastly, thanks to you for reading - I couldn't have built Frontend Armory without you!

*Have any questions or comments? Give me a shout at [james@frontarm.com](mailto:james@frontarm.com)!*
