import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "CSS-in-JS and Static Rendering",
  tags: ['optimization', 'react', 'css-in-js'],
  blurb:
    <p>
      CSS-in-JS can be a huge win for maintainability. But for large statically rendered websites, plain CSS still has its place.
    </p>,

  headerImageURL: require('./image.png'),
  // socialImageURL: require('./social.png'),

  metaDescription: `CSS-in-JS can be a huge win for maintainability. But plain CSS still has its place.`,
  
  importMDX: () => import('./document.mdx'),
})