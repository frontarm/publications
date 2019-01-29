import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Resuable Time Travel with React Hooks and Immer",
  tags: ['react', 'immer'],
  blurb: (
    <p>
      Learn how and why to make a <code>useTimeTravel</code> React hook that we can use to make Tolerant User Interfaces.
    </p>
  ),

  metaDescription: "Learn how and why to make a useTimeTravel React hook that we can use to make Tolerant User Interfaces.",

  // socialImageURL: require('./social-media-card.png'),
  // socialTitle: "",
  // socialDescription: "",
  
  importMDX: () => import('./document.md'),
})