import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'PDF Cheatsheets',
  cardImageURL: require('./react-cheatsheet/react-cheatsheet-thumbnail.png'),
  blurb:
    <p>A collection of printable PDF cheatsheets to help you find the right tool at the right time.</p>,
  publishedAt: "2017-08-24",
  importMDX: () => import('./react-cheatsheets.mdx'),
})