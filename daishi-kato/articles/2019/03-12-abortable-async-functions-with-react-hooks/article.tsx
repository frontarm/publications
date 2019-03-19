import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Hook-based Data Fetching in React --- Introduction to abortable async functions for React with hooks",
  tags: ['react'],
  blurb: (
    <p>
      Async functions are not abortable in JavaScript, but let's make them
      so with React Hooks.
    </p>
  ),

  metaDescription: "Async functions are not abortable in JavaScript, but let's make them so with React Hooks.",

  // socialImageURL: require('./social-media-card.png'),
  // socialTitle: "",
  // socialDescription: "",
  
  importMDX: () => import('./document.mdx'),
})
