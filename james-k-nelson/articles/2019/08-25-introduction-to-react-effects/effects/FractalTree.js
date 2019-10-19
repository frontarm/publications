import React, { useState } from 'react'
import {
  getAnimatedScale,
  getFractalBoxStyle,
  getFractalContainerStyle,
} from './FractalHelpers'

export default function FractalTree({ mousePosition, size=150, time, ...rest }) {
  let fromHorizontalCenter = (innerWidth / 2 - mousePosition.x) / innerWidth
  let fromVerticalCenter = (innerHeight / 2 - mousePosition.y) / innerHeight
  let lean = 0.03 * Math.sin(time / 2000) + fromHorizontalCenter / 4
  let sprout =
    0.3 +
    0.05 * Math.sin(time / 1300) +
    fromVerticalCenter / 5 -
    0.2 * Math.abs(0.5 - fromHorizontalCenter / 2)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
      }}
      {...rest}>
      <FractalTreeBranch lean={lean} size={size} sprout={sprout} />
    </div>
  )
}

function FractalTreeBranch(props) {
  let {
    depth = 1,
    lean,
    maxDepth = 7,
    side,
    size,
    sprout,
  } = props
  
  let [animation, setAnimation] = useState({
    type: 'constant',
  })
  let scale = getAnimatedScale(
    animation.type,
    animation.startTime,
    animation.startScale
  )

  // When lean/sprout are negative, scaling them can reduce
  // the visible size, which feels kinda odd. The Math.min
  // prevents this from occuring.
  let scaledLean = Math.min(lean * scale, lean)
  let scaledSprout = Math.min(sprout * scale, sprout)
  
  let startAnimation = (type) => setAnimation({
    type,
    startScale: scale,
    startTime: Date.now(),
  })

  if (depth > maxDepth) {
    return null
  } else {
    return (
      <div style={getFractalContainerStyle({
        depth,
        lean,
        maxDepth,
        side,
        size,
        sprout
      })}>
        <div
          style={getFractalBoxStyle(depth, maxDepth)}
          onMouseDown={() => startAnimation('squirm')}
          onMouseUp={() => startAnimation('shrink')}
          onMouseEnter={() => startAnimation('shrink')}
          onMouseLeave={() => startAnimation('grow')}
        />
        <FractalTreeBranch
          depth={depth + 1}
          lean={scaledLean}
          side='left'
          sprout={scaledSprout}
          size={size}
        />
        <FractalTreeBranch
          depth={depth + 1}
          lean={scaledLean}
          side='right'
          sprout={scaledSprout}
          size={size}
        />
      </div>
    )
  }
}
