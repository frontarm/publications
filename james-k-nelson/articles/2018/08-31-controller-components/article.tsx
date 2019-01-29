import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "React Controller Components",
  tags: ['react'],
  updatedAt: "2018-08-31",
  socialImageURL: require('./controller-components-pattern-social.png'),
  cardImageURL: require('./chip.svg'),
  blurb:
    <p>
      Controller components are a render-prop based pattern that can help you decouple state from presentation, and that facilitates reuse of business logic.
    </p>,
  
  pageTitle: "React Controller Components",
  metaDescription: "Controller components are a render-prop based pattern that can help you decouple state from presentation, and that facilitates reuse of business logic.",
  importMDX: () => import('./controller-components.md'),
})