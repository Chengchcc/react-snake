import React from 'react'
import Block from './block'
import { GameContext } from '@/hooks/useGameContext'
import useInterval from '@/hooks/useInterval'
import { SnakeUtils } from '@/utils/snake'
import type { Directions } from '@/types'
import useKeyDown from '@/hooks/useKeyDown'
import { generateFood } from '@/utils'
const Board = () => {
  const { state, dispatch } = React.useContext(GameContext)
  const { board, snake, food, status } = state
  const delay = Math.min((1 - Math.floor(snake.blocks.length / 100)) * 1000, 200)

  const moveSnake = React.useCallback(() => {
    if (status !== 'playing')
      return
    SnakeUtils.moveSnake(snake)
    if (SnakeUtils.checkSelfCollision(snake) || SnakeUtils.checkWallCollision(snake, board))
      dispatch({ type: 'SET_STATUS', payload: 'over' })

    if (SnakeUtils.checkCollision(snake, food)) {
      SnakeUtils.eatFood(snake)
      const newFood = generateFood(state)
      dispatch({ type: 'SET_FOOD', payload: newFood })
    }

    dispatch({ type: 'SET_SNAKE', payload: snake })
  }, [snake, food, status])

  const setDirections = React.useCallback((dir: Directions) => {
    const oppositeDirs = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left',
    }
    if (oppositeDirs[dir] === snake.direction || snake.direction === dir)
      return
    snake.direction = dir
    dispatch({ type: 'SET_SNAKE', payload: snake })
  }, [])

  useInterval(() => {
    moveSnake()
  }, delay)

  useKeyDown('ArrowUp', () => {
    setDirections('up')
  })

  useKeyDown('ArrowDown', () => {
    setDirections('down')
  })

  useKeyDown('ArrowLeft', () => {
    setDirections('left')
  })

  useKeyDown('ArrowRight', () => {
    setDirections('right')
  })

  return <div className="flex flex-col">
    {
      board.map((row, y) => (
        <div key={y} className="flex m-auto">
          {
            row.map((item, x) => {
              return <Block block={item} key={x}></Block>
            })
          }
        </div>
      ))
    }
  </div>
}

export default Board
