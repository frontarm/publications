import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "How to make reusable components with pseudo-selectors",
  subtitle: "An Introduction To Control Components",
  tags: ['react', 'css', 'styled-components'],
  blurb:
    <p>
      Pseudo-selectors like <code>:hover</code> can make a huge impact on user experience, but they haven't composed well with React &ndash; until now!
    </p>,

  pageTitle: "Control Components: reuse react components with pseudo-selectors",

  // headerImageURL: require('./hooks.svg'),
  socialImageURL: require('./social.png'),

  metaDescription: `Learn to use control components -- a pattern that facilitates composition of pseudo-selectors.`,

  importMDX: () => import('./document.mdx'),

  updatedAt: '2020-05-08',
})