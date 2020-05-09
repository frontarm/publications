import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Why React doesn't use generators",
  tags: ['react', 'generators'],
  blurb:
    <p>
      Generators seem like a perfect fit for stateful, asynchronous code &ndash; so why are React components built as plain functions?
    </p>,

  // headerImageURL: require('./hooks.svg'),
  // socialImageURL: require('./social.png'),

  metaDescription: `Generators seem like a perfect fit for stateful, asynchronous code – so why are React components built as  plain functions?`,

  importMDX: () => import('./document.mdx'),

  updatedAt: '2020-05-08',
})