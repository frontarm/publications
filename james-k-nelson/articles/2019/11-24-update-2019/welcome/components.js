import React from 'react'
import styled, { css, keyframes } from 'styled-components/macro'

import { beaconRing, colors, dimensions, media, radii, shadows } from './theme'

export const StyledButton = styled.button`
  border-radius: 9999px;
  background-color: ${colors.primary.default};
  border: none;
  box-shadow: ${shadows.bevel()}, ${shadows.drop()};
  color: ${colors.text.reverse};
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  line-height: 1rem;
  margin: 1rem 0;
  outline: none;
  padding: 0.5rem;
  position: relative;
  transition: opacity 200ms ease-out;
  width: 100%;
  ${beaconRing('::after', '9999px')}
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`

export const StyledCard = styled.div`
  background-color: ${colors.background.card};
  border: 1px solid ${colors.border.default};
  border-radius: ${radii.medium};
  box-shadow: ${shadows.card()};
  margin: 0 auto;
  max-width: 380px;
  position: relative;
  overflow: hidden;
  z-index: 0;
`

const StyledFieldLabel = styled.label`
  color: ${colors.text.label};
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
`
const StyledFieldMessage = styled.div`
  color: ${colors.text.error};
  font-size: 0.85rem;
  line-height: 1.4rem;
  margin: 0.25rem 0 1rem;
  text-align: left;
`
export const Field = ({ label, message, onChange, ...inputProps }) => (
  <StyledFieldLabel>
    {label}
    <Input {...inputProps} onChange={event => onChange(event.target.value)} />
    {message && <StyledFieldMessage>{message}</StyledFieldMessage>}
  </StyledFieldLabel>
)

const StyledInputOutline = styled.div``
const StyledInputWrapper = styled.div`
  position: relative;
`
const StyledInput = styled.input`
  border: 1px solid ${colors.border.field};
  border-radius: ${radii.small};
  box-shadow: ${shadows.sunk()};
  display: block;
  font-size: 1rem;
  padding: 0.5rem;
  outline: none;
  width: 100%;
  ${beaconRing(` + ${StyledInputOutline}`, radii.small)}
`
export const Input = props => (
  <StyledInputWrapper>
    <StyledInput {...props} />
    <StyledInputOutline />
  </StyledInputWrapper>
)

export const Link = ({ children, href, navigate, ...rest }) => {
  const handleClick = event => {
    // Let the browser handle the event directly if:
    // - The user used the middle/right mouse button (to open a new tab/window)
    // - The user was holding a modifier key
    // - The href is fully qualified, or a mailto link
    if (
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      /^[a-z]+:/i.test(href) ||
      href.substr(0, 2) === '//'
    ) {
      return
    }

    // Stop the browser from loading the linked page
    event.preventDefault()

    // Then use the supplied `navigate` function to handle navigation
    navigate(href)
  }

  return (
    <a {...rest} href={href} onClick={handleClick}>
      {children}
    </a>
  )
}
export const StyledLink = styled(Link)`
  color: ${props => props.color};
  text-decoration: underline;
  position: relative;
  ${beaconRing('::after', '9999px')}
`
StyledLink.defaultProps = {
  color: colors.primary.default,
}

const loadingBarKeyframes = keyframes`
  0% {
    transform: scaleX(0);
  }
  10% {
    transform: scaleX(0.3);
  }
  50% {
    transform: scaleX(0.7);
  }
  90% {
    transform: scaleX(0.8);
  }
  100% {
    transform: scaleX(1);
  }
`
export const StyledLoadingBar = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${props => props.color || colors.primary.default};
  background-size: 35px 35px;
  z-index: 9999;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) inset;
  transition: transform ease-in 300ms, opacity ease-in 300ms;
  transition-delay: 0;
  transform-origin: left center;
  transform: scaleX(0);
  opacity: 0;
  bottom: 0;
  ${props =>
    props.active &&
    css`
      animation: ${loadingBarKeyframes} 10s ease-out;
      animation-fill-mode: forwards;
      opacity: 1;
      /**
      * Wait 100ms before showing any loading bar. This should be long enough
      * prevent the display of a loading bar for instant page loads, while
      * short enough to help the user know that something is happening on
      * pages with async data.
      */
      transition-delay: 100ms;
    `}
`
const spinnerRotatorAnimation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
`
export const StyledSpinner = styled.div`
  position: ${props => props.position};
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid ${props => props.color};
  border-left-color: transparent;
  display: inline-block;
  width: ${props => props.size};
  height: ${props => props.size};
  animation: ${spinnerRotatorAnimation} 1.8s linear infinite;
`
StyledSpinner.defaultProps = {
  position: 'relative',
  color: colors.primary.light,
  size: '100%',
}

export function NarrowCardLayout({ children, navigate }) {
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: ${dimensions.narrowClampWidth};
        padding: 4rem 1rem;
        ${media.phoneOnly`
        padding: 1rem;
      `}
      `}>
      <StyledCard
        css={css`
          padding: 1rem 3rem;
          ${media.smallPhoneOnly`
          padding: 1rem 2rem;
        `}
        `}>
        <Link
          href="/"
          navigate={navigate}
          css={css`
            display: block;
            text-align: center;
          `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 822 822"
            css={css`
              display: block;
              margin: 0 auto;
              margin-bottom: 0.75rem;
              margin-top: 1rem;
              height: 2rem;
              width: 2rem;
            `}>
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <circle cx="411" cy="411" r="411" fill="#102030" />
              <path fill="#FFF" d="M562.27243 224L716 224 412 750 108 224 260.653366 224 411.462898 484.853061z" />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1858 400"
            css={css`
              height: 1rem;
              width: 100%;
            `}>
            <g fill="#000" fillRule="nonzero" stroke="none" strokeWidth="1">
              <path d="M576.5 393c-26.333 0-50.333-5.167-72-15.5s-40.167-23.917-55.5-40.75c-15.333-16.833-27.25-36.083-35.75-57.75s-12.75-44-12.75-67c0-23.333 4.417-45.833 13.25-67.5s21.167-40.75 37-57.25c15.833-16.5 34.583-29.667 56.25-39.5C528.667 37.917 552.333 33 578 33c26.333 0 50.333 5.167 72 15.5s40.167 24 55.5 41c15.333 17 27.167 36.333 35.5 58 8.333 21.667 12.5 43.667 12.5 66 0 23.333-4.417 45.833-13.25 67.5s-21.083 40.75-36.75 57.25c-15.667 16.5-34.333 29.75-56 39.75s-45.333 15-71 15zM484 213c0 13.667 2 26.917 6 39.75 4 12.833 9.917 24.25 17.75 34.25s17.583 18 29.25 24c11.667 6 25 9 40 9 15.667 0 29.333-3.167 41-9.5 11.667-6.333 21.333-14.583 29-24.75 7.667-10.167 13.417-21.667 17.25-34.5 3.833-12.833 5.75-25.917 5.75-39.25 0-13.667-2-26.917-6-39.75-4-12.833-10-24.167-18-34-8-9.833-17.75-17.667-29.25-23.5C605.25 108.917 592 106 577 106c-15.667 0-29.25 3.083-40.75 9.25s-21.167 14.25-29 24.25c-7.833 10-13.667 21.417-17.5 34.25-3.833 12.833-5.75 25.917-5.75 39.25zm469.5 107c14 0 25.833-2.917 35.5-8.75 9.667-5.833 17.5-13.583 23.5-23.25s10.25-20.75 12.75-33.25 3.75-25.25 3.75-38.25V35h82v181.5c0 24.667-3.083 47.667-9.25 69s-15.667 40-28.5 56-29.167 28.583-49 37.75c-19.833 9.167-43.417 13.75-70.75 13.75-28.333 0-52.5-4.833-72.5-14.5s-36.25-22.583-48.75-38.75-21.667-34.917-27.5-56.25c-5.833-21.333-8.75-43.667-8.75-67V35h82v181.5c0 13.667 1.333 26.667 4 39 2.667 12.333 7 23.333 13 33 6 9.667 13.75 17.333 23.25 23 9.5 5.667 21.25 8.5 35.25 8.5zM1154 209.5c0-21.333 4-42.583 12-63.75s19.667-40.083 35-56.75c15.333-16.667 34-30.167 56-40.5 22-10.333 47-15.5 75-15.5 33.333 0 62.25 7.167 86.75 21.5s42.75 33 54.75 56l-63 44c-4-9.333-9.083-17.083-15.25-23.25-6.167-6.167-12.917-11.167-20.25-15s-14.833-6.5-22.5-8-15.167-2.25-22.5-2.25c-15.667 0-29.333 3.167-41 9.5-11.667 6.333-21.333 14.5-29 24.5-7.667 10-13.333 21.333-17 34-3.667 12.667-5.5 25.5-5.5 38.5 0 14 2.167 27.5 6.5 40.5s10.583 24.5 18.75 34.5 18 17.917 29.5 23.75c11.5 5.833 24.417 8.75 38.75 8.75 7.333 0 14.917-.917 22.75-2.75a91.934 91.934 0 0022.5-8.5c7.167-3.833 13.75-8.833 19.75-15s10.833-13.75 14.5-22.75l67 39.5c-5.333 13-13.25 24.667-23.75 35-10.5 10.333-22.583 19-36.25 26-13.667 7-28.167 12.333-43.5 16-15.333 3.667-30.333 5.5-45 5.5-25.667 0-49.25-5.25-70.75-15.75s-40-24.417-55.5-41.75-27.5-37-36-59-12.75-44.333-12.75-67zM1824 35v355h-82V244.5h-141.5V390h-82V35h82v137.5H1742V35h82z" />
              <path d="M1210.085 328.815a2.47 2.47 0 01-2.961-.87l-1.82-2.609-3.098-.588a2.465 2.465 0 01-2.004-2.316l-.136-3.206-2.304-2.2a2.461 2.461 0 01-.432-3.01l1.6-2.773-.763-3.117a2.463 2.463 0 011.265-2.775l2.815-1.45 1.023-3.03a2.468 2.468 0 012.587-1.665l3.13.316 2.468-1.979a2.47 2.47 0 013.09 0l2.468 1.979 3.13-.316a2.468 2.468 0 012.587 1.664l1.023 3.03 2.815 1.45a2.463 2.463 0 011.265 2.776l-.763 3.117 1.6 2.772c.568.984.39 2.227-.432 3.012l-2.304 2.2-.136 3.205a2.465 2.465 0 01-2.004 2.316l-3.097.588-1.82 2.609a2.47 2.47 0 01-2.962.87l-2.915-1.194-2.915 1.194zm7.858-21.815l-4.96 8.927-4.962-8.927H1203l10 18 10-18h-5.057z" />
              <path d="M326.483 388L228.5 212l-97.983 176H31L228.5 33 426 388h-99.517z" transform="matrix(1 0 0 -1 0 421)" />
            </g>
          </svg>
        </Link>
        {children}
      </StyledCard>
      <footer
        css={css`
          color: ${colors.text.alt};
          font-size: 80%;
          text-align: center;
          margin: 0.5rem auto 2rem;
        `}>
        <StyledLink color={colors.text.alt} href="/privacy" navigate={navigate}>
          Privacy Policy
        </StyledLink>
        <span
          css={css`
            margin: 0 0.5rem;
          `}>
          &middot;
        </span>
        <StyledLink
          color={colors.text.alt}
          href="https://github.com/frontarm/vouch-landing"
          navigate={navigate}>
          See source at GitHub
        </StyledLink>
      </footer>
    </div>
  )
}

export const StyledHaiku = styled.p`
  color: ${colors.text.alt};
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 1.5rem 0;
  text-align: center;
  ${media.smallPhoneOnly`
    font-size: 0.9rem;
    line-height: 1.4rem;
  `}
`

export const StyledIssue = styled.p`
  color: ${colors.text.error};
  font-size: 0.75rem;
  margin-top: 0.75rem;
  text-align: center;
`