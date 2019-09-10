export function FractalHelpers(options) {
  return {
    ...getFractalBoxStyle(options.depth, options.maxDepth),
    ...getFractalContainerStyle(options),
  }
}

export function getFractalBoxStyle(depth, maxDepth) {
  const color = interpolateColor((depth/maxDepth)**2, 80, 120, 54, 240, 104, 64)
  
  return {
    backgroundColor: color,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'opacity 500ms ease-out',
    zIndex: maxDepth - depth,
  }
}

export function getFractalContainerStyle(options) {
  let {
    heightFactor = 0.4,
    sprout,
    lean = 0,
    size = 100,
    
    frozen,

    depth,
    side
  } = options

  if (sprout !== undefined) {
    heightFactor = sprout
  }

  const scale = side === 'right'
      ? Math.sqrt((size*heightFactor)**2 + (size * (0.5+lean))**2) / size
      : Math.sqrt((size*heightFactor)**2 + (size * (0.5-lean))**2) / size
  const rotation =
    side === 'right'
      ? Math.atan(heightFactor / (0.5+lean))
      : -Math.atan(heightFactor / (0.5-lean))

  const style = {
    position: 'absolute',
    bottom: 0,
    filter: frozen ? 'grayscale(66%)' : undefined,
    transition: 'filter 250ms ease-in-out',
    width: size,
    height: size,
    transformOrigin: side === 'right' ? `${size}px ${size}px` : `0 ${size}px`,
    transform: depth === 1 ? '' : `
      translate3d(0, ${-size}px, 0)
      scale3d(${scale}, ${scale}, 1)
      rotate(${rotation}rad)
    `,
  }

  if (depth === 1) {
    style.left = `calc(50% - ${size/2}px)`
  }

  return style
}

function interpolateColor(x, r1, r2, g1, g2, b1, b2) {
  const r = Math.round(clamp(x, r1, r2))
  const g = Math.round(clamp(x, g1, g2))
  const b = Math.round(clamp(x, b1, b2))
  return `rgb(${r}, ${g}, ${b})`
}

function clamp(x, min, max) {
  return min + (max - min)*x
}

// ---

const DefaultShrinkAnimationDuration = 2000
const DefaultGrowAnimationDuration = 10000

function easeOut(startTime, duration) {
  return Math.pow(
    ((duration /
      10 /
      (duration / 10 + Math.min(Date.now() - startTime - 50, duration)) -
      1 / 11) *
      11) /
      10,
    1.5,
  )
}

export function shrink(startTime, startValue, duration = DefaultShrinkAnimationDuration, toValue = -3/5) {
  return (
    (startValue * easeOut(startTime, duration) + toValue) *
    (startTime / (startTime + toValue))
  )
}
export function grow(startTime, startValue, duration = DefaultGrowAnimationDuration, toValue = 1) {
  return (
    startValue +
    (1 - easeOut(startTime, duration)) * (toValue - startValue)
  )
}
export function squirm(startTime, startValue, magnitude = 0.04) {
  return (
    grow(startTime, startValue, DefaultGrowAnimationDuration, 0.5) +
    magnitude * Math.sin((startTime - Date.now()) / 13)
  )
}

// Given we're running this every frame, it should only log warnings once
let hasWarned = false 
export function getAnimatedScale(animationType, startTime, startScale) {
  if (!hasWarned && animationType !== 'constant') {
    if (!startTime) {
      console.error('Missing startTime.')
      hasWarned = true
      startTime = Date.now()
    }
    if (!startScale) {
      console.error('Missing startScale.')
      hasWarned = true
      startScale = 1
    }
  }

  switch (animationType) {
    case 'grow':
      return grow(startTime, startScale)
    case 'shrink':
      return shrink(startTime, startScale)
    case 'squirm':
      return squirm(startTime, startScale)
    case 'constant':
      return 1
    default:
      if (!hasWarned) {
        console.error('Unknown animation type:', animationType)
      }
      hasWarned = true
      return 1
  }
}