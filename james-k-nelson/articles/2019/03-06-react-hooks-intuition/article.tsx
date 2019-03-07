import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "My Intuition on When to Use Custom React Hooks",
  tags: ['react', 'hooks'],
  blurb:
    <p>
      Custom hooks are like mixins: they're a great way to share stateful and side-effectful functionality between components.
    </p>,

  headerImageURL: require('./hooks.svg'),
  socialImageURL: require('./social.png'),

  pageTitle: "When to Use Custom React Hooks",
  socialTitle: "My Intuition on When to Use Custom React Hooks",
  metaDescription: `Learn how custom hooks are like mixins: a great way to share small bits of functionality between components.`,
  
  importMDX: () => import('./document.mdx'),
})