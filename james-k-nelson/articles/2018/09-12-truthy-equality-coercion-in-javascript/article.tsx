import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'Coercion, Equality & Truthy (in JavaScript)',
  tags: ['javascript'],
  blurb:
    <p>
      In JavaScript, things can be "truthy", they can be coerced to <code>true</code>, or they can <em>actually</em> be <code>true</code>. But how do these differ?
    </p>,

  pageTitle: 'Coercion, Equality & Truthy (in JavaScript)',
  metaDescription: "In JavaScript, things can be Truthy, they can equal true, or they can actually be true. But how do these differ?",
  // cardImageURL: require('./sat-grad.png'),
  // socialImageURL: require('./single-file-react-app-social.png'),

  importMDX: () => import('./truthy-equality-coercion-in-javascript.md'),
})