import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "When Context Replaces Redux",
  tags: ['react'],
  updatedAt: "2018-10-12",
  blurb:
    <p>Since Redux was created in 2015, its <code>&lt;Provider&gt;</code> component has always used React's Context API. <em>So how can Context replace Redux?</em></p>,
  
  pageTitle: "When Context Replaces Redux",
  metaDescription: "Redux has used React's context API from the beginning. So how can context replace Redux?",
  // cardImageURL: require('./gear-grad.png'),
  // socialImageURL: require('./conditional-rendering-social.png'),

  importMDX: () => import('./when-context-replaces-redux.md'),
})