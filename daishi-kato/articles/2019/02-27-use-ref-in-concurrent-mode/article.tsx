import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "How to properly use the React useRef hook in Concurrent Mode",
  tags: ['react'],
  blurb: (
    <p>
      Concurrent Mode requires stricter way of writing components.
    </p>
  ),

  metaDescription: "Concurrent Mode requires stricter way of writing components.",

  // socialImageURL: require('./social-media-card.png'),
  // socialTitle: "",
  // socialDescription: "",
  
  importMDX: () => import('./document.mdx'),
})
