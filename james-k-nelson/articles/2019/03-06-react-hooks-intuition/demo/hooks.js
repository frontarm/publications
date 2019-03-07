import { useRef, useState } from 'react'

export function useContactModel({ defaultValue = {} } = {}) {
  let [name, setName] = useState(defaultValue.name || '')
  let [email, setEmail] = useState(defaultValue.email || '')

  return {
    error: name === '' ? 'Please enter a name' : undefined,
    inputProps: {
      name: {
        value: name,
        onChange: e => setName(e.target.value),
      },
      email: {
        value: email,
        onChange: e => setEmail(e.target.value),
      },
    }
  }
}

function useSequence(initialNext) {
  let nextRef = useRef(initialNext)
  return () => nextRef.current++
}

export function useKeys(initial) {
  let getKey = useSequence(initial+1)
  let [keys, setKeys] = useState(Array(initial).fill(0).map((x, i) => i+1))
  let add = () => setKeys(keys.concat(getKey()))
  let remove = (key) => {
    let newKeys = keys.slice(0)
    let index = newKeys.indexOf(key)
    if (index !== -1) {
      newKeys.splice(index, 1)
    }
    setKeys(newKeys)
  }
  return [keys, add, remove]
}