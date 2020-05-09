import { createBrowserHistory } from 'history'
import React, { useEffect, useState } from 'react'

import { NarrowCardLayout, StyledHaiku } from './components'
import Landing from './landing'

const history = createBrowserHistory()
const navigate = path => history.push(path)

function getRoute(location) {
  switch (normalizePathname(location.pathname)) {
    case '/':
      return <Landing navigate={navigate} />

    case '/privacy':
      return <Privacy navigate={navigate} />

    case '/thanks':
      return <Thanks navigate={navigate} />

    default:
      return <NotFound navigate={navigate} />
  }
}

export default function App() {
  const [location, setLocation] = useState(history.location)

  useEffect(() => history.listen(setLocation), [])

  return getRoute(location)
}

function NotFound({ navigate }) {
  return (
    <NarrowCardLayout navigate={navigate}>
      <StyledHaiku>
        I couldn't find it
        <br />
        The page probably hates me
        <br />
        I'm really depressed
      </StyledHaiku>
    </NarrowCardLayout>
  )
}

function Privacy({ navigate }) {
  return (
    <NarrowCardLayout navigate={navigate}>
      <StyledHaiku>
        Your privacy is
        <br />
        Very important to us
        <br />I wrote a poem
      </StyledHaiku>
    </NarrowCardLayout>
  )
}

function Thanks({ navigate }) {
  return (
    <NarrowCardLayout navigate={navigate}>
      <StyledHaiku>
        Thanks for joining in!
        <br />
        When we're ready to wow you,
        <br />
        You'll get an email.
      </StyledHaiku>
    </NarrowCardLayout>
  )
}

function normalizePathname(pathname) {
  if (pathname === '/' || pathname === '') {
    return '/'
  }

  // Add leading slash
  pathname = pathname[0] !== '/' ? '/' + pathname : pathname

  // Strip trailing slash
  pathname =
    pathname[pathname.length - 1] === '/' ? pathname.slice(0, -1) : pathname

  return pathname
}