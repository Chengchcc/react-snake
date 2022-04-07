import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '@/hooks/useGameContext'
const gameStatus = () => {
  const { state } = useContext(GameContext)
  const [showAlert, setShowAlert] = useState(false)
  const [msg, setMsg] = useState('')

  const { status } = state

  useEffect(() => {
    if (status === 'over') {
      setShowAlert(true)
      setMsg('you lose')
    }
    else {
      setShowAlert(false)
    }
  }, [status])

  function getClass() {
    let className = ''
    className += (showAlert ? 'top-0 ' : '-top-60 ')
    className += 'bg-red-500'
    return className
  }

  return (

    <div
      className={
        `${getClass()} alert`
      }
    >
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fa-solid fa-info"></i>
      </span>
      <span className="inline-block align-middle mr-8">
        {msg}
      </span>
      <button
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        onClick={() => setShowAlert(false)}
      >
        <span>×</span>
      </button>
    </div>
  )
}

export default gameStatus
