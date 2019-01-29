import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'How do you separate components?',
  blurb:
    <p>
      React components have a habit of growing over time. But is this actually a problem?
      After all, it seems a little odd to create many small components that are used only once...
    </p>,

  cardImageURL: require('./port.svg'),
  socialImageURL: require('./how-to-separate-components-social.png'),
  socialDescription: "React components have a habit of growing over time. But is this actually a problem? After all, it seems a little odd to create many small components that are used only once...",
  socialTitle: 'How do you separate React components?',
  tags: ['react', 'refactoring', 'structure'],
  updatedAt: "2017-08-24",
  importMDX: () => import('./index.md'),
})
