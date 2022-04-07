import React from 'react'
import Board from './board'
import GameProvider from './gameProvider'
import GameStatus from './gameStatus'
import GameFooter from './gameFooter'
const Game = () => {
  return <GameProvider>
    <Board/>
    <GameStatus/>
    <GameFooter/>
  </GameProvider>
}

export default Game
