import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "React Fragments in Practice – 4 real-world examples",
  tags: ['react'],
  blurb:
    <p>
      Learn how to use React Fragments let to group React elements, <em>without</em> requiring unnecessary markup or confusing <code>key</code> props.
    </p>,

  headerImageURL: require('./fragment.svg'),

  metaDescription: `Learn to group React elements without unnecessary markup – using React Fragments.`,
  
  importMDX: () => import('./react-fragments-in-practice.mdx'),
})