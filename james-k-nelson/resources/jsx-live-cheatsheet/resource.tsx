import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "The 6 rules of JSX: a live cheatsheet",
  pageTitle: "The 6 rules of JSX: a live cheatsheet",
  tags: ['react'],
  cardImageURL: require('./jsx-live-cheatsheet.gif'),
  socialImageURL: require('./jsx-live-cheatsheet-social.png'),
  blurb:
    <p>Explore the 6 rules of JSX with live examples that update as you type.</p>,
  metaDescription: "Explore the 6 rules of JSX with live examples that update as you type.",
  publishedAt: "2018-08-19",
  importMDX: () => import('./jsx-cheatsheet.md'),
})