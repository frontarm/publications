import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: '3 Anti-patterns for Conditional Rendering with React',
  tags: ['react', 'anti-patterns'],

  blurb:
    <p>
      You already know how to implement conditionally rendering with React: just use JavaScript! This gives you a huge amount of power... to shoot yourself in the foot.
    </p>,

  pageTitle: '3 Anti-patterns for Conditional Rendering with React',
  metaDescription: "You already know how to implement conditionally rendering with React: just use JavaScript! This gives you a huge amount of power... to shoot yourself in the foot.",
  importMDX: () => import('./react-anti-patterns-conditional-rendering.md'),
})