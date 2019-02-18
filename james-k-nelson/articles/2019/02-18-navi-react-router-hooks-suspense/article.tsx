import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "A <Router /> with Hooks and Suspense",
  tags: ['react', 'navi', 'hooks', 'suspense'],
  blurb:
    <p>
      Navi is a new kind of router for React, that lets you declaratively map URLs to (possibly asynchronous) content.
    </p>,

  // headerImageURL: require('./header-image.png'),
  // socialImageURL: require('./social.png'),

  pageTitle: "A React Router with Hooks and Suspense",
  metaDescription: `Don't let the hype around hooks fool you - useContext() is actually incredibly useful.`,
  
  importMDX: () => import('./document.mdx'),
})