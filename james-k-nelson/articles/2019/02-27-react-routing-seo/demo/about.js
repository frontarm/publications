import React from 'react'
import { Link } from 'react-navi'

function About() {
  return (
    <div>
      <h1>About Navi</h1>
      <p>You can read about Navi on the <Link href='/'>home</Link> page. Why is this page even here?.</p>
    </div>
  )
}

export default About