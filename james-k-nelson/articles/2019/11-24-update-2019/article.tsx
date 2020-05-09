import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "The big 2019 Frontend Armory update",
  tags: ['react', 'hooks'],
  blurb:
    <p>
      It's been a big year for Frontend Armory – with new lessons, code, videos, a new mission and a new price.
    </p>,

  metaDescription: `It's been a big year for Frontend Armory – with new lessons, code, videos, a new mission and a new price.`,
  
  importMDX: () => import('./document.mdx'),

  // updatedAt: '2019-10-19',
})