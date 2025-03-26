import { useContext } from 'react'

import { GameContext } from '@/context/game-context'

export const useGame = () => useContext(GameContext)
