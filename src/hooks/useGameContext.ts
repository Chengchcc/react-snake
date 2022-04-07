import type { Dispatch } from 'react'
import React from 'react'
import { cloneDeep } from 'lodash-es'
import { generateBoard, generateFood } from '@/utils'
import { SnakeUtils } from '@/utils/snake'
import type { BaseBlock, GameStatus } from '@/types'
import { SIZE } from '@/types'

export const gameState = {
  board: generateBoard(SIZE, SIZE),
  snake: SnakeUtils.generateSnake(SIZE, SIZE, 2, 'right'),
  food: { x: 0, y: 0 } as BaseBlock,
  status: 'playing' as GameStatus,
}

const food = generateFood(gameState)
gameState.food = food

export type GameState = typeof gameState

export interface GameAction { type: string; payload?: any }

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_SNAKE':
      return { ...state, snake: action.payload }
    case 'SET_FOOD':
      return { ...state, food: action.payload }
    case 'SET_STATUS':
      return { ...state, status: action.payload }
    case 'reset': {
      return cloneDeep(gameState)
    }
    default:
      return state
  }
}

export const GameContext = React.createContext<{
  state: GameState
  dispatch: Dispatch<GameAction>
}>({} as any)
