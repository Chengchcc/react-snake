import React from 'react'
import type { Block as BlockState } from '@/types'
import { GameContext } from '@/hooks/useGameContext'

interface BlockProp {
  block: BlockState
}

const Block = (prop: BlockProp) => {
  const { block } = prop
  const { state } = React.useContext(GameContext)
  const { snake, food } = state
  const getClass = React.useCallback(() => {
    const { isWall } = block
    const isSnake = snake.blocks.some(item => item.x === block.x && item.y === block.y)
    const isFood = food.x === block.x && food.y === block.y
    if (isWall)
      return 'bg-gray-300'
    else if (isSnake)
      return 'bg-blue-500'
    else if (isFood)
      return 'bg-teal-500'
    else return 'bg-transparent'
  }, [block, snake, food])
  return <div className={`w-4 h-4 flex justify-center align-center border ${getClass()}`}/>
}

export default Block
