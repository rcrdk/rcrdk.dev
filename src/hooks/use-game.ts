import { useContext } from 'react'

import { GameContext } from '@/contexts/game-context'

export function useGame() {
	const value = useContext(GameContext)
	if (!value) throw new Error('useGame must be used within GameContextProvider')
	return value
}
