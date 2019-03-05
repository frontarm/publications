import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "React, Routing and SEO",
  tags: ['react', 'navi'],
  blurb:
    <p>
      TODO
    </p>,

  // headerImageURL: require('./header-image.png'),
  // socialImageURL: require('./social.png'),

  metaDescription: `TODO`,
  
  importMDX: () => import('./document.mdx'),
})