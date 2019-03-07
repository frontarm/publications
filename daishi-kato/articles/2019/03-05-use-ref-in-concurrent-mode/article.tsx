import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "useRef() and Concurrent Mode: how to avoid shooting yourself in the foot",
  tags: ['react'],
  blurb: (
    <p>
      React's eaglerly awaited Concurrent Mode can vastly improve user experience, but it requires a stricter way of writing components.
    </p>
  ),

  metaDescription: "React's eaglerly awaited Concurrent Mode can vastly improve user experience, but it requires a stricter way of writing components.",

  // socialImageURL: require('./social-media-card.png'),
  // socialTitle: "",
  // socialDescription: "",
  
  importMDX: () => import('./document.mdx'),
})
