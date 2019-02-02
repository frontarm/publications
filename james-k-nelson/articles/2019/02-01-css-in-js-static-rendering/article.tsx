import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  exclusiveTo: 'pro',

  title: "CSS-in-JS with Static Rendering",
  subtitle: "Or: edit an article, invalidate 25mb of cached CSS.",
  tags: ['optimization', 'react', 'css-in-js'],
  blurb:
    <p>
      CSS-in-JS can be a huge win for maintainability. But for large statically rendered websites, the decision to use it isn't clear cut.
    </p>,

  // headerImageURL: require('./image.png'),
  // socialImageURL: require('./social.png'),

  metaDescription: `CSS-in-JS can be a big maintainability win — or a costly mistake.`,
  
  importMDX: () => import('./document.mdx'),
})