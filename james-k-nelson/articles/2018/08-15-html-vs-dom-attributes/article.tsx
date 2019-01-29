import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'HTML attributes vs. DOM properties',
  blurb:
    <p>
      Why is it that HTML attributes have different names when they're used within JavaScript?
    </p>,

  metaDescription: "Why is it that HTML attributes have different names when they're used within JavaScript?",

  tags: ['dom'],
  importMDX: () => import('./html-vs-dom-attributes.md'),
})
