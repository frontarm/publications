import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'Promises and async/await cheatsheet',
  tags: ['javascript'],
  cardImageURL: require('./async-cheatsheet.png'),
  metaDescription: "A handy cheatsheet to help make sense of promises and async/await.",
  socialImageURL: require('./async-cheatsheet.png'),
  blurb:
    <p>A handy cheatsheet to help make sense of promises and async/await.</p>,
  publishedAt: "2018-10-21",
  importMDX: () => import('./readme.md'),
})