import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'Structuring React projects with CRUV',
  tags: ['react', 'structure'],
  metaDescription: "Learn about CRUV, a project structure that builds on create-react-app. Focus on making your app amazing - not on where things go.",
  socialImageURL: require('./react-cruv-social.png'),
  blurb:
    <p>
      Learn about CRUV, a project structure that builds on create-react-app with 4 standard directories and 3 files. Focus on making your app amazing - not on where things go.
    </p>,
  importMDX: () => import('./react-cruv.md'),
})