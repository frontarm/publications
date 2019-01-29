import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "CSS-in-JS security: the rascal's guide",
  tags: ['security'],
  socialTitle: "CSS-in-JS security: the rascal's guide",
  socialImageURL: require('./css-in-js-security-social.png'),
  cardImageURL: require('./rover.svg'),
  metaDescription: "Import the wrong <Tooltip> component and your users' passwords will grow legs. Follow this guide to stay safe.",
  blurb:
    <p>
      Import the wrong <code>&lt;Tooltip&gt;</code> component and your users' passwords will grow legs. Follow this guide to stay safe.
    </p>,
  updatedAt: "2018-08-15",
  importMDX: () => import('./how-can-i-use-css-in-js-securely.md'),
})