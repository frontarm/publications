import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "Events Live Cheatsheet",
  tags: ['react'],
  cardImageURL: require('./react-events-cheatsheet.gif'),
  blurb:
    <p>Live examples of common React events, including usage of common properties on their event objects.</p>,
  publishedAt: "2017-08-24",
  importMDX: () => import('./react-events-cheatsheet.md'),
})