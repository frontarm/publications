import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: '9 React Guides That Stood The Test Of Time',
  tags: ['react'],
  updatedAt: "2018-09-06",
  blurb:
    <p>
      Does React deserve its reputation for stability? Let's find out by exploring how nine classic React articles hold up to the latest version of React.
    </p>,

  pageTitle: '9 React Guides That Stood The Test Of Time',
  socialTitle: '9 React Guides that stood the test of time',
  metaDescription: "Does React deserve its reputation for stability? Let's find out by exploring how nine classic React articles hold up to the latest version of React.",
  // cardImageURL: require('./sat-grad.png'),
  // socialImageURL: require('./single-file-react-app-social.png'),

  importMDX: () => import('./9-react-resources.md'),
})