import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Custom hooks for Redux, without react-redux",
  tags: ['react', 'redux'],
  blurb: (
    <p>
      TODO
    </p>
  ),

  metaDescription: "TODO",

  // socialImageURL: require('./social-media-card.png'),
  // socialTitle: "",
  // socialDescription: "",
  
  importMDX: () => import('./document.mdx'),
})