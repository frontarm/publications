import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Is a Redux Store Observable?",
  tags: ['redux', 'observables'],
  blurb:
    <p>
      Redux stores and RxJS Observables both have a <code>subscribe</code> method with a similar signature &ndash; but are they really the same thing?
    </p>,

  // headerImageURL: require('./hooks.svg'),
  // socialImageURL: require('./social.png'),

  metaDescription: `Redux stores and RxJS Observables both have a subscribe method with a similar signature – but are they really the same thing?`,

  importMDX: () => import('./document.mdx'),

  updatedAt: '2020-05-01',
})