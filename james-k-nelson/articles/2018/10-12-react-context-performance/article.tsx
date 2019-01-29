import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "Avoiding unnecessary renders with React context",
  tags: ['react'],
  blurb:
    <p>Before you replace Redux's <code>&lt;Provider&gt;</code> component with React's new context API, there's a thing or two that you should know about performance.</p>,
  
  pageTitle: "React context and performance",
  metaDescription: "Before you replace Redux's provider component with React's new context API, there's a thing or two that you should know about performance",
  // cardImageURL: require('./gear-grad.png'),
  // socialImageURL: require('./conditional-rendering-social.png'),

  importMDX: () => import('./react-context-performance.md'),
})