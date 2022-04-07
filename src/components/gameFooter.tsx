import React from 'react'
import { GameContext } from '@/hooks/useGameContext'

const GameFooter = () => {
  const { dispatch } = React.useContext(GameContext)

  return <div className="flex gap-1 justify-center p-4 m-auto">
    <button className="btn btn-green" onClick={() => {
      dispatch({ type: 'reset' })
    }}>
        reset
    </button>
  </div>
}

export default GameFooter
