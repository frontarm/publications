import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'The 2-minute React app',
  tags: ['react'],
  blurb:
    <>
      <p>
      Use <code>&lt;script&gt;</code> tags and React's <code>createElement()</code> function to build an app in a single file.
      </p>
      <p>
        <em>With no Redux, no Webpack, and no NPM!</em>
      </p>
    </>,

  pageTitle: 'A React app with just one file',
  metaDescription: "By using React's createElement() function, you can build app's in a single HTML file - without JSX or NPM!",
  cardImageURL: require('./sat3.svg'),
  socialImageURL: require('./single-file-react-app-social.png'),

  importMDX: () => import('./single-file-react-app.md'),
})