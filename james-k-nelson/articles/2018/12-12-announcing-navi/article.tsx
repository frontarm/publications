import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "Navi: SEO & routing with vanilla create-react-app",
  tags: ['navi'],
  blurb:
    <p>
      Build big, fast, CDN-delivered websites with great SEO & SMO, and all with vanilla create-react-app.
    </p>,

  metaDescription: "Build big, fast, CDN-delivered websites with great SEO & SMO, and all with vanilla create-react-app!",

  socialImageURL: require('./social-media-card.png'),
  socialTitle: "Navi: SEO & routing with vanilla create-react-app",
  socialDescription: "Build big, fast, CDN-delivered websites with great SEO & SMO, and all with vanilla create-react-app!",
  
  importMDX: () => import('./announcing-navi.md'),
})