MDX is a wonderful way to write content for React-based apps. It gives you the succinct syntax of Markdown, with all the power of raw JSX. And while MDX [started out](http://jamesknelson.com/introducing-mdxc/) as an obscure little package, it's grown to be supported by everything from [Next.js](https://mdxjs.com/getting-started/next), to [Gatsby](https://mdxjs.com/getting-started/gatsby), to [mdx-deck](https://github.com/jxnblk/mdx-deck).

But there's one place where support has been conspicuously missing: *create-react-app 2*. Here's why.

## Configuring create-react-app

While create-react-app 1 allowed for slight modifications to configuration through [react-app-rewired](https://github.com/timarney/react-app-rewired), this wasn't supported by the create-react-app team itself.

With create-react-app 2, official support was added for some extensions through [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros). In fact, it's possible to get *some* MDX support with babel-plugin-macros through the [mdx.macro](https://www.npmjs.com/package/mdx.macro) package (by yours truly). However, this package has a [major drawback](https://github.com/facebook/create-react-app/issues/5580): you'll need to manually restart the server each time you change an `.mdx` file.

In order to implement proper MDX support through babel-plugin-macros, babel itself will need a [new feature](https://github.com/babel/babel/issues/8497). But this feature doesn't exist yet. So how are you going to get the benefit of MDX without ejecting from create-react-app?


## react-scripts-mdx

One of the great things about create-react-app is that it doesn't force you to use the official scripts. It makes it *dead easy* to use a fork. And given that there's now a [react-scripts-mdx](https://github.com/jamesknelson/create-react-app-mdx) fork, this means that getting started with MDX and create-react-app is a one-liner:

```bash
npx create-react-app --scripts-version react-scripts-mdx your-project-name
```

Simple, huh? Or if you've already got a create-react-app generated project, you can add MDX support by just switching out `react-scripts` with `react-scripts-mdx` in your `dependencies` and running `yarn install` or `npm install`. Then, you'll be able to add MDX files like this to your project:

```markdown
# I'm a Markdown file

And I can use <em className="jsx">JSX!</em>
```

Then `import` and use your MDX file, just as you would with any other React component:

```jsx
import React, { Component } from 'react';
import './App.css';
import MDXDocument from './test.md';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MDXDocument />
      </div>
    );
  }
}

export default App;
```

Neat, huh? But while adding MDX support is super easy, is it really ok to use a fork?


## What the fork changes

The `react-scripts-mdx` fork makes a single change to `react-scripts`:

**`react-scripts-mdx` will transform `.md` and `.mdx` files with [mdx-loader](https://www.npmjs.com/package/mdx-loader).**

The fork is [tested](https://github.com/jamesknelson/create-react-app-mdx/blob/2.1.1-mdx/packages/react-scripts/fixtures/kitchensink/src/features/webpack/MdxInclusion.test.js), and is only a tiny patch on the main create-react-app project -- making maintenance easy. Of course, the fork shouldn't be necessary forever! Once babel-plugin-macros gains live reload support, it'll be simple to transition over to that instead.

But for the moment, if you need MDX and create-react-app? Give react-scripts-mdx a try!

Thanks for reading! And if you have any questions, give me a shout on twitter at [@james_k_nelson](https://twitter.com/james_k_nelson). And until next time, happy mdxing!


