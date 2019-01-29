So you've heard the terms static and server rendering. You know that they both improve SEO and involve generating HTML for your website or app. And given that you're using React, then [`ReactDOMServer.renderToString()`](https://reactjs.org/docs/react-dom-server.html#rendertostring) lets you accomplish either.

So they're basically the same thing, right? Well, they're aaalllmost the same. Let me explain.


## Static rendering is eager, server rendering is lazy

Both static and server rendering involve generating HTML for each of your site's URLs. The difference is that **static rendering happens once at build time**, while **server rendering happens on-demand**, as the user requests each file.

### Static rendering

With **static rendering**, you'll need to generate a single HTML file for every page that the user can access ahead of time. You'll then serve these pages from a cloud service like S3, or from a server running something like nginx.

<img src={require('./static-rendering.png')} alt="static rendering diagram" />

Static rendering has the advantage of being able to serve requests stupidly fast, because nothing needs to be generated on the fly. In fact, since your site's responses are all generated ahead of time, you can store the files all over the world on a CDN (on the *edge*). This gives your site *ridiculously* fast response times. But there's a catch.

With static rendering, you need to generate responses for *every possible request* ahead of time. For websites  focussed on high quality content, this is fine -- static renderers like [Navi](/navi/) can generate hundreds of pages in mere seconds. But what if you're building something where you can't predict all possible requests, like a search engine? Or what if you have a lot of user generated contend, and the response changes on every request? In that case, you'll need server rendering.


### Server rendering

In the React world, **server rendering** refers to the process of generating HTML on demand for each request. Usually, you'll accomplish this by setting up a server running something like [express](https://expressjs.com/) or [Next.js](https://nextjs.org/) that renders your React app with each request -- just as with a more traditional \P\H\P or Rails based website.

<img src={require('./server-rendering.png')} alt="server rendering diagram" />

Server rendering is *always* slower than serving static content. However, you'd need to mess things up pretty badly for the slowdown to be anything greater than a second -- and whether this kind of delay matters really depends on your business requirements.

Of course, for what server rendering lacks in speed, it makes up for in flexibility. It allows you to:

- Respond to *any* request that the user makes -- even ones you might not have expected.
- Pull the most recent content from a database, instead of server older static files.
- Selectively hide content from unauthenticated users.


## So which should I use?

The answer is -- of course -- *it depends.*

If **static** rendering is possible, it'll give you a faster, cheaper, simpler solution. However, if your site needs to serve HTML that meets any of these requirements, then you'll need **server** rendering:

- If you can't predict all possible requests
- If the response changes depending on who is viewing it
- If responses quickly go out of date

Keep in mind that these requirements will only make server rendering necessary **if you need to serve specific HTML for each page for SEO purposes**. For example, a social network or online marketplace would best be built as a server rendered site.

On the other hand, if you're building something where SEO is irrelevant -- e.g. an app that lives behind a login screen -- then your app only needs a single HTML file. It used to be that this was by far the simplest option, as it meant that you could just use stock create-react-app. However, recent improvements in static and server rendering tooling have mostly closed the simplicity gap.


## Rendering tooling

When I first started building websites with React a couple years ago, static/server rendering was *fucking hard*. I even wrote an article telling you [*don't do it*](http://jamesknelson.com/universal-react-youre-doing-it-wrong/). But things have changed *a lot*.

There are a growing number of tools for statically rendering React-based websites and apps. [Gatsby](https://www.gatsbyjs.org/) is a popular, heavy-duty option. For something simpler, you can try [Navi](/navi/), which drives this website and works alongside create-react-app.

As for server rendering, you have two options: the Next.js way, and the Express way. With [Next.js](https://nextjs.org/learn/), you get an entire framework and a hosting solution that works out of the box -- but you tie your project to Next.js (who have stated that they [will not provide an option to eject](https://github.com/zeit/next.js/issues/1691)). If this doesn't work for you, then you can always set up a more traditional [Express](https://expressjs.com/) app (and Navi's router makes this easier than ever!)


## A little trivia

Let me close by explaining how the site that you're reading right now works. Frontend Armory is statically rendered. Each time the content changes, the site is re-built using [Navi](/navi/), then pushed to S3. Then, when you send a request, it first checks for a cached version that is geographically close to you with CloudFront, before requesting it from S3 if that fails.

And that's why Frontend Armory feels so snappy -- it's all about routing and static rendering!

*Want to build a blinding fast website with great SEO? I'll be launching a new course walking you through the process of building and deploying a statically rendered site with Navi and create-react-app later this month. [Sign up](/members/register/) to make sure you don't miss it!*
