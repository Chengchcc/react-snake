import type { BaseBlock, Block, Directions, Snake } from '@/types'
import { SIZE } from '@/types'

const dirs = new Map<Directions, { dx: number; dy: number }>([
  ['up', { dx: 0, dy: -1 }],
  ['down', { dx: 0, dy: 1 }],
  ['left', { dx: -1, dy: 0 }],
  ['right', { dx: 1, dy: 0 }],
])

export class SnakeUtils {
  static generateSnake(
    height: number,
    width: number,
    snakeLength: number,
    snakeDirection: Directions,
  ): Snake {
    const snakeBlocks: BaseBlock[] = []
    const snakeHead: BaseBlock = {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2),
    }
    snakeBlocks.push(snakeHead)
    for (let i = 1; i < snakeLength; i++) {
      const newBlock: BaseBlock = {
        x: snakeBlocks[i - 1].x,
        y: snakeBlocks[i - 1].y,
      }
      if (snakeDirection === 'up')
        newBlock.y += 1

      else if (snakeDirection === 'down')
        newBlock.y -= 1

      else if (snakeDirection === 'left')
        newBlock.x += 1

      else if (snakeDirection === 'right')
        newBlock.x -= 1

      snakeBlocks.push(newBlock)
    }
    return {
      blocks: snakeBlocks,
      direction: snakeDirection,
    }
  }

  static moveSnake(snake: Snake) {
    const { blocks, direction } = snake
    const nextHead = {
      x: blocks[0].x,
      y: blocks[0].y,
    }
    const action = dirs.get(direction) || { dx: 0, dy: 0 }
    nextHead.x = (action.dx + nextHead.x + SIZE) % SIZE
    nextHead.y = (action.dy + nextHead.y + SIZE) % SIZE
    blocks.unshift(nextHead)
    blocks.pop()
  }

  static eatFood(snake: Snake) {
    const { blocks } = snake
    const newBlock: BaseBlock = {
      x: blocks[0].x,
      y: blocks[0].y,
    }
    blocks.unshift(newBlock)
  }

  static checkCollision(snake: Snake, food: BaseBlock) {
    const { blocks } = snake
    const head = blocks[0]
    return head.x === food.x && head.y === food.y
  }

  static checkSelfCollision(snake: Snake) {
    const { blocks } = snake
    const head = blocks[0]
    return blocks.slice(1).some(block => block.x === head.x && block.y === head.y)
  }

  static checkWallCollision(snake: Snake, board: Block[][]) {
    const { blocks } = snake
    const head = blocks[0]
    const wallBlocks = board.flat().filter(block => block.isWall)
    if (!wallBlocks.length)
      return false
    return wallBlocks.some(block => block.x === head.x && block.y === head.y)
  }
}
