import React from 'react'

export function Card(props) {
  return (
    <a
      className='Card'
      target='_blank'
      href={props.href}
      style={{
        backgroundColor: props.color,
        color: props.textColor || 'white',
      }}>
      {props.title} &raquo;
    </a>
  )
}

export function CardGrid(props) {
  return (
    <div className='CardGrid'>
      {props.children}
    </div>
  )
}

export function TwitterButton(props) {
  let encodedStatus = encodeURIComponent(
    "This live editor looks pretty darn handy #JavaScript"
  )
  let encodedURL = encodeURIComponent(
    "https://frontarm.com/demoboard"
  )

  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${encodedStatus}&url=${encodedURL}`}
      target="_blank"
      className="TwitterButton">
      <img src="https://frontarm.com/twitter-logo.svg" alt="Twitter Logo" /> Tweet About It
    </a>
  )
}