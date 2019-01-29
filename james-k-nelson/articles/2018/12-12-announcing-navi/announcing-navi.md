Businesses live and die on their web traffic, most which comes from search engines and social media. If you're getting paid to build websites or web apps, then you *need* to think about SEO and SMO — it's just how the world works.

Now if you were building an old-school \P\H\P or Rails app, SEO would be free and SMO would be easy — you’d just add some meta tags to the `<head>` of your HTML files. But the future belongs to serverless React, and this presents a problem. **You want to build a beautiful, interactive site, but you *don't* want to have to eject from create-react-app to do it.**

*TL;DR? Jump to [the docs](/navi/) or [the code](https://github.com/frontarm/navi).*

The thing is, React just wasn't built to do SEO by itself. Sure, it has a `renderToString()` method... but it doesn't support most lifecycle methods. And while server-side Suspense is coming, it's been coming for a year and there's *still* no release date.

So here's the deal: you're getting paid to build websites. You need to build traffic *now* -- but you don't want to reimplement everything *yet again* 6 months down the track. And you're not alone, *so let's do something about it.*

## Have your cake and eat it too

Today I'm releasing Navi: the router and static renderer that drives Frontend Armory. **Navi lets you create big, fast, CDN-delivered websites with great SEO & SMO, and all with vanilla create-react-app.** Of course, Navi also works great *after* ejecting, or even with an express-based app. No matter how you use it, you'll save gobs of time with:

🔥 Simple loading transitions for async content<br />
🗺️ JSON site maps that can be built at runtime or build time<br />
⚠️ Console warnings when a `<Link>` points to a 404<br />
📜 Scroll management that just works<br />
♿️ Page `<title>` management for accessibility<br />
🏷️ Great TypeScript support<br />
👌 A dead-simple API<br />

## Many hands make light work

Navi has around 2 years of history behind it, and its overarching design has barely changed over that time. It's React integration was designed to work great with React Suspense - so when it arrives, your app will spontaneously grow a number of new features. And of course, Navi is 100% open source and open to contributions. Here are a few ways you could help:

- Try it out and [open an issue](https://github.com/frontarm/navi/issues) with your feedback 😄
- Build the [Vue integration](https://github.com/frontarm/navi/issues/18) (The `navi` package itself is vanilla JavaScript, and it'll work just as well with Vue as it does with React)
- Use the *edit this page* links to improve pages in [the documentation](/navi/)

Speaking of documentation -- the Navi website is 100% open source, and built with Navi and React itself. If you want to run it locally, just clone the [navi-website](https://github.com/frontarm/navi-website) repository, then run `yarn install` and `yarn start` and you'll be good to go! But if you view them on Frontend Armory, you'll get an extra special feature...

## All I want for Christmas is amazing documentation

Navi's docs are choc-full of example code. And when viewing the docs as a Frontend Armory Pro member, many of these examples will be interactive [demoboards](/articles/announcing-demoboard/) -- allowing you to quickly try out new things, and easily share the result with colleagues and friends. Pro members will also gain access to docs on niche topics like integrating Navi with react-router or react-helmet -- helping to support development, and giving you peace of mind about the project's sustainability into the future.

Of course, *all* of the documentation will still be completely open source, and available for you to fork and edit at your pleasure. In fact, the first three docs are already available, and I'll be releasing a new page each day until Christmas. Here's the plan:

- Wednesday 12th: [A Minimal Example](/navi/guides/minimal-example/), [Declaring Pages](/navi/reference/declarations/) and [Static Rendering](/navi/guides/static-rendering/)
- Thursday 13th: [Integrating with React](/navi/integrations/react/) and Launch! 🚀
- Friday 14th: [Authenticated Routes](/navi/guides/authenticated-routes/), more live examples
- Saturday 15th: [The `navigation` object](/navi/reference/navigation/), [`history` object](/navi/reference/navigation/)
- Sunday 16th: [`Route` and `Segment`](/navi/reference/route-and-segment/) and [`URLDescriptor`](/navi/reference/url-descriptor/) types

&nbsp;

- Monday 17th: [create-react-navi-app](/navi/create-react-navi-app/)
- Tuesday 18th: [Integrating with react-router](/navi/integrations/react-router/)
- Wednesday 19th: [Video Introduction](https://www.youtube.com/watch?v=PkIS_Xgf1zc)
- Thursday 20th: [Integrating with react-helmet](/navi/integrations/react-helmet/) <small>(pro exclusive)</small>
- Friday 21st: [The `router` object](/navi/reference/router/)
- Saturday 22nd: [Layouts and nested content](/navi/guides/layouts-nested-content/)
- Sunday 23rd: [Blog example](https://github.com/frontarm/navi/tree/master/examples/blog)

&nbsp;

- *Coming soon*: *Generating JSON site maps* <small>(pro exclusive)</small>
- 🎄 Christmas Day: it's a surprise 😉

I'll be linking each of these pages as they're released, so check back each day to get a brand new link! ⏱ 

Thanks so much for reading! Given that you've read all this way, you really should give Navi a try -- just head on through to [A Minimal Example](/navi/guides/minimal-example/) in the docs to try it out within the browser. And once you're done, let me know your thoughts! Just [open an issue](https://github.com/frontarm/navi/issues), or send me a tweet at [@james_k_nelson](https://twitter.com/james_k_nelson). Finally, if you decide to use Navi in your project, make sure to [join Frontend Armory Pro](/pricing/individual/) to unlock access to the demoboards and integration docs.

See you again on Christmas Day with a Navi surprise! 🎁