import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Will it finally: a try/catch quiz",
  tags: ['javascript'],
  blurb:
    <p>
      You know how <code>try</code> and <code>catch</code> work, but what about <code>finally</code>? Does it run after rethrown exceptions or <code>return</code> statements?
    </p>,

  headerImageURL: require('./header-image.png'),
  // socialImageURL: require('./social.png'),

  metaDescription: `You know "try" and "catch", but how well do you know "finally"? Find out with 4 live examples.`,
  
  importMDX: () => import('./document.mdx'),
})