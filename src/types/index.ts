export interface BaseBlock {
  x: number
  y: number
}

export interface Block extends BaseBlock {
  isWall: boolean
}

export type Directions = 'up' | 'down' | 'left' | 'right'

export enum DirsKeys {
  up = 38,
  down = 40,
  left = 37,
  right = 39,
}

export interface Snake {
  blocks: BaseBlock[]
  direction: Directions
}

export const SIZE = 20

export type GameStatus = 'playing' | 'paused' | 'over'
