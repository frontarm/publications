import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Maintainable, Testable UIs with State Machines",
  tags: ['react'],
  blurb:
    <p>
      Explore how state machines can help you to create robust, maintainable and testable user interfaces, using the example of small movie app.
    </p>,

  // headerImageURL: require('./fragment.svg'),

  metaDescription: `TODO`,
  
  importMDX: () => import('./document.mdx'),
})