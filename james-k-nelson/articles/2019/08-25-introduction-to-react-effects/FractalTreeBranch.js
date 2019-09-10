import React, { useState } from 'react'
import {
  getAnimatedScale,
  getFractalBoxStyle,
  getFractalContainerStyle,
} from './FractalHelpers'

export default function FractalTreeBranch(props) {
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
