import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "From Hooks to... Render Props?",
  tags: ['react', 'hooks'],
  blurb:
    <p>
      Even old-school class components allow you to compose component state. Hooks just make your life far, far simpler.
    </p>,

  // headerImageURL: require('./header-image.png'),
  socialImageURL: require('./social.png'),

  pageTitle: "From React Hooks to... Render Props?",
  metaDescription: `Even old-school class components allow you to compose component state. Hooks just make your life far, far simpler.`,
  
  importMDX: () => import('./document.mdx'),
})