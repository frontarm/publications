import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "useContext(): a React hook that's an obvious win",
  tags: ['react', 'hooks'],
  blurb:
    <p>
      Hooks are a brand new API with a lot of hype. But don't let that fool you &ndash; <code>useContext()</code> is <em>incredibly</em> useful.
    </p>,

  // headerImageURL: require('./header-image.png'),
  // socialImageURL: require('./social.png'),

  metaDescription: `Don't let the hype around hooks fool you - useContext() is actually incredibly useful.`,
  
  importMDX: () => import('./document.mdx'),
})