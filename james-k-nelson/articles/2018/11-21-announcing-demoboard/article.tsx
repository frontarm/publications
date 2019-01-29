import * as React from 'react'
import { createDocumentPage } from 'shared/pages/createDocumentPage'

export default createDocumentPage({
  title: "Demoboard: a live editor with every package on NPM",
  tags: ['demoboard'],
  blurb:
    <p>
      Quickly create Javascript and Markdown demos that import any package on npm. No more messing with <code>package.json</code> and <code>node_modules</code>!
    </p>,

  metaDescription: "An online editor where imports and markdown just work. No more fiddling with dependencies.",

  socialImageURL: require('./demoboard-social.png'),
  socialTitle: "Announcing Demoboard",
  socialDescription: "An online editor where npm imports and markdown just work.",
  
  importMDX: () => import('./announcing-demoboard.mdx'),
})