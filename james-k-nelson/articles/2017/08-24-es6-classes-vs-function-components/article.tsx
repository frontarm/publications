import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "ES6 classes vs. function components: which to use?",
  updatedAt: "2018-08-04",
  blurb:
    <p>
      React has two different ways of declaring components: functions and classes.
      Functions are quicker to create, but provide less features. So how can you decide which to use?
    </p>,
  
  metaDescription: "React has two different ways of declaring components: functions and classes. Functions are quicker to create, but provide less features. So how can I decide which to use?",
  importMDX: () => import('./index.md'),
})