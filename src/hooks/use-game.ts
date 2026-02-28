import { useContext } from 'react'

import { GameContext } from '@/context/game-context'

export function useGame() {
	const value = useContext(GameContext)
	if (value == null) throw new Error('useGame must be used within GameContextProvider')
	return value
}
