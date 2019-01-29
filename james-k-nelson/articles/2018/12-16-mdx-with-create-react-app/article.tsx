import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "Using MDX with create-react-app 2",
  tags: ['mdx'],
  blurb:
    <p>
      Learn how to get the succinct syntax of Markdown, the power of JSX, and all with the simplicity of create-react-app 2.
    </p>,

  metaDescription: "Learn how to get the succinct syntax of Markdown, the power of JSX, and all with the simplicity of create-react-app 2.",

  // socialImageURL: require('./social-media-card.png'),
  socialTitle: "Using MDX with create-react-app 2",
  socialDescription: "Learn how to get the succinct syntax of Markdown, the power of JSX, and all with the simplicity of create-react-app 2.",
  
  importMDX: () => import('./mdx-with-create-react-app.md'),
})