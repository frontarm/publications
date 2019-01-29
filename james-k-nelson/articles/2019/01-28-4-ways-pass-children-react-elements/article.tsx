import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "4 ways to pass children to React elements",
  tags: ['react'],
  blurb:
    <p>
      Sure, you already know that you can pass children to React elements by nesting JSX tags. But what about the other 3 ways?
    </p>,

  headerImageURL: require('./image.png'),
  socialImageURL: require('./social.png'),

  metaDescription: `Do you know all 4 ways to pass children to React elements?`,
  
  importMDX: () => import('./document.mdx'),
})