import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "How to pass data to props.children",
  tags: ['react', 'how-to'],
  blurb:
    <p>
      React makes it easy to pass children to reusable components. But what if those children need to receive data from the component that renders them?
    </p>,

  pageTitle: "How to pass data to a React component's props.children",
  metaDescription: "React makes it easy to pass children to reusable components. But what if those children need to receive data from the component that renders them?",
  
  importMDX: () => import('./passing-props-to-children.md'),
})