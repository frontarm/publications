import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'When should I use arrow functions with React?',
  tags: ['react', 'es6', 'optimization'],
  updatedAt: "2018-09-11",
  blurb:
    <p>
      When used incorrectly, arrow functions cause performance issues. But they also make writing code so much easier. So how can I use them without making my components crawl?
    </p>,

  pageTitle: "When should I use arrow functions with React?",
  metaDescription: "Arrow functions are a lot of fun, but they can sometimes slow down your React app. So let's find out when they make sense.",
  // cardImageURL: require('./sat-grad.png'),
  // socialImageURL: require('./single-file-react-app-social.png'),

  importMDX: () => import('./when-to-use-arrow-functions.md'),
})