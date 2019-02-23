import * as React from 'react'
import { Link } from 'react-navi'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "A <Router /> with Hooks and Suspense",
  tags: ['react', 'navi', 'hooks', 'suspense'],
  blurb:
    <p>
      <Link href="/navi/">Navi</Link> is a new kind of router for React. It lets you declaratively map URLs to content, even when that content is asynchronous.
    </p>,

  headerImageURL: require('./logo.svg'),
  socialImageURL: require('./social.png'),

  pageTitle: "A React Router with Hooks and Suspense",
  socialTitle: "A React Router with Hooks and Suspense",
  metaDescription: `Navi is a new kind of router for React, that lets you declaratively map URLs to (possibly asynchronous) content.`,
  
  importMDX: () => import('./document.mdx'),
})