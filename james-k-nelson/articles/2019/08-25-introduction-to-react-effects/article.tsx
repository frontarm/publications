import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "A deep dive into React effects",
  tags: ['react', 'hooks'],
  blurb:
    <p>
      Learn about effects – a declarative approach to interacting with the world outside your app. With live demos, interactive exercises, and fractals.
    </p>,

  headerImageURL: require('./hooks.svg'),
  socialImageURL: require('./social.png'),

  pageTitle: "A deep dive into React effects",
  socialTitle: "A deep dive into React effects (with live exercises)",
  metaDescription: `Learn all about React's new useEffect hook, with live exercises and fractals.`,
  
  importMDX: () => import('./document.mdx'),

  updatedAt: '2019-10-19',
})