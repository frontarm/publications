import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "Passing state to render props via context",
  tags: ['react', 'how-to'],
  blurb:
    <p>
      Headless components are a great new way to separate presentation and control logic. But what if you don't want to pick and place all the render function's props manually?
    </p>,

  pageTitle: "Passing state to render props via React context",
  metaDescription: "Render functions let you separate business logic from presentation. But what if you don't want to manually pass all those props?",
  
  importMDX: () => import('./headless-compound-components.md'),
})