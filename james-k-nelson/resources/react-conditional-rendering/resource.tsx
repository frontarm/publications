import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'Conditional Rendering with React: The Complete Guide',
  tags: ['react'],

  exclusiveTo: 'pro',

  publishedAt: "2018-09-26",
  blurb:
    <p>
      Dive deep into React's four approaches to conditional rendering, then test your knowledge by building a multi-step regisration wizard. 
    </p>,
    
  pageTitle: 'Conditional Rendering with React: The Complete Guide',
  metaDescription: "Explore the four main approaches to conditional rendering with React, then test your knowledge by building a multi-step regisration wizard.",
  cardImageURL: require('./gear.svg'),
  socialImageURL: require('./conditional-rendering-social.png'),

  importMDX: ({ isPro }) => isPro ? (
    import('./conditional-rendering.md')
  ) : (
    import('./unrestricted-portion.md')
  )
})