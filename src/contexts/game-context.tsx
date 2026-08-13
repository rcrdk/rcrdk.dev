'use client'

import { createContext, useReducer, type ReactNode } from 'react'
import { useLocale } from 'next-intl'

import type { GameTaskTypes } from '@/data/game-tasks'
import { useGameActions } from '@/hooks/use-game-actions'
import { useGameHydration } from '@/hooks/use-game-hydration'
import { useGameScreenSize } from '@/hooks/use-game-screen-size'
import { defaultLocale, isValidLocale } from '@/i18n/config'
import { gameReducer, INITIAL_GAME_STATE } from '@/reducers/game-reducer'
import type { GameTaskUser } from '@/types/game'
import { buildGameTasks, getTotalGamePoints, sumGamePoints } from '@/utils'

interface GameContextDataProps {
	gameTasks: GameTaskUser[]
	pointsEarned: number
	pointsTotal: number
	onCompleteTask: (taskId: GameTaskTypes) => void
	onResetGame: VoidFunction
	showGameDialog: boolean
	onShowGameDialog: VoidFunction
	showGameTasks: boolean
	onShowGameTasks: VoidFunction
	showGameTetris: boolean
	onShowGameTetris: (open: boolean) => void
	isGameCompleted: boolean
	isGameActive: boolean
	gameSessionKey: number
	onActivateGame: VoidFunction
	onStopGame: VoidFunction
}

export const GameContext = createContext<GameContextDataProps | null>(null)

interface GameContextProviderProps {
	children: ReactNode
}

export function GameContextProvider({ children }: Readonly<GameContextProviderProps>) {
	const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE)

	const activeLocale = useLocale()
	const locale = isValidLocale(activeLocale) ? activeLocale : defaultLocale

	const gameTasks = buildGameTasks({ locale, tasksCompleted: state.tasksCompleted })
	const pointsEarned = sumGamePoints(state.tasksCompleted)
	const pointsTotal = getTotalGamePoints()
	const isGameCompleted = pointsEarned >= pointsTotal

	const actions = useGameActions({ state, dispatch, gameTasks, pointsEarned, pointsTotal })

	useGameScreenSize((allowed) => dispatch({ type: 'game/setScreenSizeAllowed', allowed }))
	useGameHydration((payload) => dispatch({ type: 'game/hydrate', payload }))

	return (
		<GameContext.Provider
			value={{
				...actions,
				gameTasks,
				pointsEarned,
				pointsTotal,
				isGameCompleted,
				showGameDialog: state.showGameDialog,
				showGameTasks: state.showGameTasks,
				showGameTetris: state.showGameTetris,
				isGameActive: state.isGameActive,
				gameSessionKey: state.gameSessionKey,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
