import { useEffect, useRef } from 'react'

const useKeyDown = (key: string, callback: Function) => {
  const cbRef = useRef(callback)
  useEffect(() => {
    cbRef.current = callback
  }
  , [callback])
  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === key)
        cbRef.current()
    }
    window.addEventListener('keydown', downHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }
  , [key])
}
export default useKeyDown
