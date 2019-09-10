import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "An introduction to React's useEffect() hook",
  tags: ['react', 'hooks'],
  blurb:
    <p>
      Learn about effects – a declarative approach to interacting with the world outside your app. With live demos, interactive exercises, and fractals.
    </p>,

  headerImageURL: require('./hooks.svg'),
  socialImageURL: require('./social.png'),

  pageTitle: "Introducing React's useEffect() hook",
  socialTitle: "Introducing React's useEffect() hook, with live exercises and fractals",
  metaDescription: `Learn all about React's new useEffect hook, with live exercises and fractals.`,
  
  importMDX: () => import('./document.mdx'),
})