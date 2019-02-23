import React from 'react'

import { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from './index'

export function useLast(currentValue) {
  let ref = useRef()
  let lastValue = ref.current
  ref.current = currentValue
  return lastValue
}

export class TimedToggle extends React.Component {
  state = {
    isActive: false,
  }
  
  componentWillUnmount() {
    this.clearActiveTimeout()
  }

  render() {
    return this.props.children([this.state.isActive, this.activate])
  }
  
  activate = () => {
    this.clearActiveTimeout()
    this.setState({ isActive: true })
    this.timeout = window.setTimeout(() => {
      this.setState({ isActive: false })
    }, this.props.milliseconds)
  }
  
  clearActiveTimeout() {
    if (this.timeout) {
      window.clearTimeout(this.timeout)
    }
  }
}

export function Data({ children, id }) {
  return (
    <DataContext.Consumer children={data => children(data[id]) } />
  )
}