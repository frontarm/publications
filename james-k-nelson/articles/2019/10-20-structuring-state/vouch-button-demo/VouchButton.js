import React from 'react'
import { animated, useTransition } from 'react-spring'
import styled, { css, keyframes } from 'styled-components/macro'

const colors = {
  beacon: {
    focus: 'rgba(68, 136, 221, 0.75)',
    hover: '#d8dbde',
  },
  text: {
    label: '#334455',
  }
}

const shadows = {
  ring: color => `
    0 0 0 2px ${color},
    0 0 4px 3px ${color}
  `,
}

const beaconRing = (selector, radius) =>
  css`
    ${selector} {
      content: ' ';
      position: absolute;
      border-radius: ${radius};
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      z-index: -1;
    }
    :hover${selector} {
      box-shadow: ${shadows.ring(colors.beacon.hover)};
    }
    :focus${selector} {
      box-shadow: ${shadows.ring(colors.beacon.focus)};
    }
  `

const spinnerDashAnimation = keyframes`
  0%,
  10% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }
  
  50%,
  60% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
`

const spinnerRotatorAnimation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
`

// From: https://glennmccomb.com/articles/building-a-pure-css-animated-svg-spinner/
export const Spinner = (props) => {
  return (
    <svg
      viewBox="0 0 100 100"
      css={css`
        position: relative;
        background-color: transparent;
        border-radius: 50%;
        display: block;
        width: 1rem;
        height: 1rem;
        animation: ${spinnerRotatorAnimation} 1.8s linear infinite;
      `}
      {...props}>
      <circle
        stroke={colors.text.label}
        strokeWidth={4}
        strokeMiterlimit={1}
        fill="none"
        cx={50}
        cy={50}
        r={48}
        css={css`
          stroke-dasharray: 283;
          stroke-dashoffset: 280;
          transform-origin: 50% 50%;
          animation: ${spinnerDashAnimation} 1.6s ease-in-out infinite both;
        `}
      />
    </svg>
  )
}

const CheckIcon = props => (
  <svg width={24} height={24} viewBox="0 0 24 24" css={css`
    display: block;
    fill: ${colors.text.label};
    width: 1rem;
    height: 1rem;
  `} {...props}>
    <path d="M19.293 5.293L9 15.586l-4.293-4.293a.999.999 0 10-1.414 1.414l5 5a.999.999 0 001.414 0l11-11a.999.999 0 10-1.414-1.414z" />
  </svg>
)

const WarningIcon = props => (
  <svg width={24} height={24} viewBox="0 0 24 24" css={css`
    display: block;
    fill: ${colors.text.label};
    width: 1rem;
    height: 1rem;
  `} {...props}>
    <path d="M11.148 4.374a.973.973 0 01.334-.332c.236-.143.506-.178.756-.116s.474.216.614.448l8.466 14.133a.994.994 0 01-.155 1.192.99.99 0 01-.693.301H3.533a.997.997 0 01-.855-1.486zM9.432 3.346l-8.47 14.14c-.422.731-.506 1.55-.308 2.29s.68 1.408 1.398 1.822c.464.268.976.4 1.475.402H20.47a3 3 0 002.572-4.507L14.568 3.346a2.995 2.995 0 00-4.123-1.014c-.429.26-.775.615-1.012 1.014zM11 9v4a1 1 0 002 0V9a1 1 0 00-2 0zm2 8a1 1 0 10-2 0 1 1 0 002 0z" />
  </svg>
)

const VouchIcon = props => (
  <svg width={32} height={32} viewBox="0 0 32 32" css={css`
    display: block;
    fill: ${colors.text.label};
    width: 1rem;
    height: 1rem;
    `} {...props}>
    <path d="M16.02 27.805c6.508 0 11.784-5.276 11.784-11.784S22.528 4.237 16.02 4.237c-6.508 0-11.784 5.276-11.784 11.784S9.512 27.805 16.02 27.805zm-3.014 4.061a2.082 2.082 0 01-2.347-.629l-2.027-2.476-3.158-.518a2.083 2.083 0 01-1.718-1.718l-.518-3.158L.762 21.34a2.082 2.082 0 01-.629-2.347l1.13-2.994-1.13-2.994a2.082 2.082 0 01.629-2.347l2.476-2.027.518-3.158a2.083 2.083 0 011.718-1.718l3.158-.518L10.659.761a2.082 2.082 0 012.347-.629L16 1.262l2.994-1.13a2.082 2.082 0 012.347.629l2.027 2.476 3.158.518a2.083 2.083 0 011.718 1.718l.518 3.158 2.476 2.027c.692.566.945 1.511.629 2.347l-1.13 2.994 1.13 2.994c.316.836.063 1.78-.629 2.347l-2.476 2.027-.518 3.158a2.083 2.083 0 01-1.718 1.718l-3.158.518-2.027 2.476a2.082 2.082 0 01-2.347.629L16 30.736l-2.994 1.13z" />
  </svg>
)

const icons = {
  busy: Spinner,
  done: CheckIcon,
  vouch: VouchIcon,
  warning: WarningIcon,
}

export const StyledAnimatedButtonGlyph = styled(animated.div)`
  position: absolute;
  left: 0rem;
`

export const StyledButtonLabel = styled.span`
  transform: translateX(0.625rem);
  flex-grow: 1;
`

export const StyledButton = styled.button`
  align-items: center;
  border-width: 0;
  border-radius: 9999px;
  color: ${colors.text.label};
  cursor: pointer;
  display: inline-flex;
  font-size: 11px;
  font-weight: 500;
  height: 1.5rem;
  line-height: 1.5rem;
  padding: 0 1.25rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    opacity 200ms ease-out,
    text-shadow 200ms ease-out,
    box-shadow 200ms ease-out,
    color 200ms ease-out;
  white-space: nowrap;

  ${props =>
    props.disabled &&
    css`
      cursor: default;
      opacity: 0.5;
    `}

  ${beaconRing('::after', '9999px')}
`

export const VouchButton = React.forwardRef(
  (
    {
      busy,
      children,
      done,
      tooltip,
      ...props
    },
    ref,
  ) => {
    let glyph =
      tooltip ? 'warning' :
      busy ? 'busy' :
      done ? 'done' :
      'vouch'

    let glyphTransitions = useTransition(glyph, null, {
      initial: { t: 1 },
      from: { t: 0 },
      enter: { t: 1 },
      leave: { t: 0 },
    })

    return (
      <StyledButton
        type='button'
        ref={ref}
        {...props}>
        {glyphTransitions.map(
          ({ item, props: { t }, key }) =>
            <StyledAnimatedButtonGlyph
              key={key}
              style={{
                transform: t.interpolate(
                  t => `translateX(${0.5 * t}rem)`,
                ),
                opacity: t,
              }}>
              {React.createElement(icons[item])}
            </StyledAnimatedButtonGlyph>
        )}
        <StyledButtonLabel>
          {children}
        </StyledButtonLabel>
      </StyledButton>
    )
  },
)

export default VouchButton