import { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from './index'

export function useLastValue(value) {
  let ref = useRef([])
  let hasChanged = ref.current[1] !== value
  useEffect(() => {
    if (hasChanged) {
      ref.current[0] = ref.current[1]
      ref.current[1] = value
    }
  })
  return hasChanged ? ref.current[1] : ref.current[0]
}

export function useDidChange(value) {
  let ref = useRef()
  let hasChanged = ref.current !== value
  useEffect(() => {
    ref.current = value
  })
  return hasChanged
}

export function useTimedToggle(milliseconds) {
  let [isActive, setActive] = useState(false)
  let timeoutRef = useRef()
  
  function clearActiveTimeout() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
  }
  
  function activate() {
    clearActiveTimeout()
    setActive(true)
    timeoutRef.current = window.setTimeout(() => {
      setActive(false)
    }, milliseconds)
  }
  
  // When the component is unmounted, make sure to clear the timeout. 
  useEffect(() => clearActiveTimeout, [])
  
  return [isActive, activate]
}

export function useData(id) {
  let data = useContext(DataContext)
  return data[id]
}