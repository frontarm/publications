import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "Static vs. Server Rendering",
  tags: ['navi'],
  blurb:
    <p>
      <em>Static rendering</em> and <em>server rendering</em> both involve rendering HTML for each of your app's pages – but there's one major difference between them...
    </p>,

  metaDescription: "Static rendering and server rendering both involve rendering HTML for each of your app's pages – but there's one major difference between them...",

  socialImageURL: require('./social.png'),
  socialTitle: "Static vs. Server Rendering",
  socialDescription: "Static rendering and server rendering both involve rendering HTML for each of your app's pages – but there's one major difference between them...",
  
  importMDX: () => import('./static-vs-server-rendering.md'),
})