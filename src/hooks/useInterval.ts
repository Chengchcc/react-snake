import { useEffect, useRef } from 'react'

const useInterval = (cb: Function, delay: number) => {
  const savedCallback = useRef<Function>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = cb
  }, [cb])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function')
        savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
