import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: "How to conditionally set default props",
  tags: ['react', 'how-to'],
  blurb:
    <p>
      The <code>defaultProps</code> object on React components doesn't have access to <code>this.props</code>. So how can I make default props depend on <em>other</em> props?
    </p>,

  pageTitle: "How to conditionally set default props on React components",
  metaDescription: `The "defaultProps" object on React components doesn't have access to "this.props". So how can I make default props depend on other props?`,
  
  importMDX: () => import('./conditionally-set-default-props.md'),
})