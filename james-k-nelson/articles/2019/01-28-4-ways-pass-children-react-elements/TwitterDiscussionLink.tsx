import { join } from 'path'
import * as React from 'react'
import { NavRoute } from 'react-navi'

export default function TwitterDiscussionLink(props) {
  return (
    <NavRoute children={route =>
      <a href={
        'https://mobile.twitter.com/search?q='+
        encodeURIComponent(process.env.PUBLIC_URL+route.url.href)
      } {...props} />
    } />
  )
}