import type { GameState } from '@/hooks/useGameContext'
import type { BaseBlock, Block } from '@/types'
import { SIZE } from '@/types'

export function generateBoard(height: number, width: number) {
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x): Block => ({
      x,
      y,
      isWall: false,
    })),
  )
}

export function generateFood(status: GameState): BaseBlock {
  const { board, food, snake } = status

  const checkIsSnake = (block: BaseBlock) => {
    const { x, y } = block
    const { blocks } = snake
    return blocks.some(({ x: bx, y: by }) => bx === x && by === y)
  }

  const checkIsFood = (block: BaseBlock) => {
    const { x, y } = block
    const { x: fx, y: fy } = food
    return x === fx && y === fy
  }

  const checkIsWall = (block: BaseBlock) => {
    const { x, y } = block
    return board[y][x].isWall
  }

  const randomBlock = () => {
    const x = Math.floor(Math.random() * SIZE)
    const y = Math.floor(Math.random() * SIZE)
    return { x, y }
  }
  let blockFood = randomBlock()
  while (checkIsSnake(blockFood) || checkIsFood(blockFood) || checkIsWall(blockFood))
    blockFood = randomBlock()
  return blockFood
}
