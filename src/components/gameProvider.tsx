import { cloneDeep } from 'lodash-es'
import React from 'react'
import { GameContext, gameReducer, gameState } from '../hooks/useGameContext'
const GameProvider: React.FunctionComponent = (props) => {
  const [state, dispatch] = React.useReducer(gameReducer, cloneDeep(gameState))
  return <GameContext.Provider value={{ state, dispatch }}>
    {props.children}
  </GameContext.Provider>
}

export default GameProvider
