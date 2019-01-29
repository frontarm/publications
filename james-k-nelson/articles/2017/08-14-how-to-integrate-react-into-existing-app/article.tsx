import * as React from 'react'
import { createLegacyDocumentPage } from 'shared/pages/createLegacyDocumentPage'

export default createLegacyDocumentPage({
  title: 'How to integrate React into an existing app?',
  tags: ['react', 'integrations'],
  socialTitle: 'How to integrate React into an existing app?',
  socialDescription: "What if you've already got an application, but still want to use React? Is it possible to integrate React components into existing pages?",
  cardImageURL: require('./sat2.svg'),
  socialImageURL: require('./integrate-into-existing-app-social.png'),
  blurb: 
    <p>
      I've already <em>got</em> an application. <em>I don't want to rebuild it from scratch.</em> How can I integrate React into what I've already got?
    </p>,
  updatedAt: "2017-08-14",
  importMDX: () => import('./index.md'),
})