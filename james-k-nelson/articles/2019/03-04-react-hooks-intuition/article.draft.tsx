import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Intuition on when to use React hooks",
  tags: ['react', 'hooks'],
  blurb:
    <p>
      Learn how custom hooks are like mixins: they're a great way to share stateful and side-effectful functionality between components.
    </p>,

  // headerImageURL: require('./header-image.png'),
  // socialImageURL: require('./social.png'),

  metaDescription: `Don't throw away your state management tools just yet! Hooks are incredible, but they won't solve everything.`,
  
  importMDX: () => import('./document.mdx'),
})