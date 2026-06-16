'use client'

import { createContext, useEffect, useReducer } from 'react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'

import { GameToast } from '@/components/game/toast'
import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { LOCAL_STORAGE_KEYS } from '@/config/keys'
import type { GameTaskTypes } from '@/data/game-tasks'
import { GAME_TASKS } from '@/data/game-tasks'
import { useHaptics } from '@/hooks/use-haptics'
import { useSoundEffect } from '@/hooks/use-sound-effect'
import type { LocalesType } from '@/i18n/config'
import { clearGameLocalStorage, GAME_LANGUAGE_CHANGED_KEY, setLanguageChangedDuringGame } from '@/i18n/game'
import { trackEvent } from '@/lib/track-event'
import { gameReducer, INITIAL_GAME_STATE, type GameHydratePayload } from '@/reducers/game-reducer'

const TOAST_DURATION = 20000
const MEDIA_QUERY_MIN_WIDTH = '70rem'
const MEDIA_QUERY_MIN_HEIGHT = '35rem'

export interface GameTaskUser {
	id: GameTaskTypes
	icon: string
	listItem: { title: string; hint: string }
	toastItem: { title: string; hint: string }
	points: number
	completed: boolean
	button?: React.ReactNode
}

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

export const GameContext = createContext<GameContextDataProps>({} as GameContextDataProps)

interface GameContextProviderProps {
	children: React.ReactNode
}

export function GameContextProvider({ children }: GameContextProviderProps) {
	const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE)

	const locale = useLocale() as LocalesType
	const { playSound } = useSoundEffect()
	const { triggerHaptic } = useHaptics()

	const gameTasks: GameTaskUser[] = GAME_TASKS.map((task) => ({
		id: task.id,
		icon: task.icon,
		listItem: {
			title: task.listItem.title[locale],
			hint: task.listItem.hint[locale],
		},
		toastItem: {
			title: task.toastItem.title[locale],
			hint: task.toastItem.hint[locale],
		},
		points: task.points,
		completed: state.tasksCompleted.includes(task.id),
		button: task.button,
	}))

	const pointsEarned = GAME_TASKS.filter((task) => state.tasksCompleted.includes(task.id)).reduce(
		(previous, current) => previous + current.points,
		0,
	)

	const pointsTotal = GAME_TASKS.reduce((previous, current) => previous + current.points, 0)

	const isGameCompleted = pointsEarned >= pointsTotal

	function onActivateGame() {
		trackEvent(ANALYTICS_EVENTS.gameActivate)

		dispatch({ type: 'game/activate' })
		playSound('game-start')

		if (typeof window !== 'undefined') {
			window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameActive, 'true')
			setLanguageChangedDuringGame(false)
		}
	}

	function notifyCompletedTask(taskId: GameTaskTypes) {
		const task = gameTasks.find((item) => item.id === taskId)

		if (!task) return

		playSound('game-points')

		toast(<GameToast task={task} />, {
			id: taskId,
			position: 'top-center',
			duration: TOAST_DURATION,
		})
	}

	function onCompleteTask(taskId: GameTaskTypes) {
		const taskAlreadyExists = state.tasksCompleted.includes(taskId)

		if (taskAlreadyExists || !state.isScreenSizeAllowed || !state.isGameActive) return

		const task = GAME_TASKS.find((item) => item.id === taskId)
		const tasksCompleted = [...state.tasksCompleted, taskId]
		const pointsEarnedAfterComplete = GAME_TASKS.filter((item) => tasksCompleted.includes(item.id)).reduce(
			(previous, current) => previous + current.points,
			0,
		)

		trackEvent(ANALYTICS_EVENTS.gameTaskComplete, {
			task: taskId,
			points: task?.points ?? 0,
		})

		if (pointsEarnedAfterComplete >= pointsTotal) trackEvent(ANALYTICS_EVENTS.gameCompleted, { points: pointsTotal })

		dispatch({ type: 'game/completeTask', taskId })

		if (typeof window !== 'undefined')
			window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameTasks, JSON.stringify([...state.tasksCompleted, taskId]))

		notifyCompletedTask(taskId)
	}

	function onResetGame(soundEffect?: boolean) {
		trackEvent(ANALYTICS_EVENTS.gameReset, { points: pointsEarned })

		dispatch({ type: 'game/reset' })
		triggerHaptic()

		if (soundEffect) playSound('game-start')

		if (typeof window !== 'undefined') {
			setLanguageChangedDuringGame(false)
			window.localStorage.removeItem(LOCAL_STORAGE_KEYS.gameTasksVisible)
			window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameTasks, JSON.stringify([]))
		}
	}

	function onStopGame() {
		trackEvent(ANALYTICS_EVENTS.gameStop, { points: pointsEarned })

		dispatch({ type: 'game/stop' })
		playSound('game-over')
		triggerHaptic()
		clearGameLocalStorage()
	}

	function onShowGameDialog() {
		trackEvent(state.showGameDialog ? ANALYTICS_EVENTS.gameDialogClose : ANALYTICS_EVENTS.gameDialogOpen, {
			points: pointsEarned,
		})

		dispatch({ type: 'game/toggleDialog' })
	}

	function onShowGameTetris(open: boolean) {
		trackEvent(open ? ANALYTICS_EVENTS.gameTetrisOpen : ANALYTICS_EVENTS.gameTetrisClose)

		dispatch({ type: 'game/setTetrisOpen', open })

		if (!open) onCompleteTask('tetris')
	}

	function onShowGameTasks() {
		trackEvent(ANALYTICS_EVENTS.gameShowTasks, { points: pointsEarned })

		dispatch({ type: 'game/showTasks' })
		onCompleteTask('has-opened-hints')

		if (typeof window !== 'undefined') window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameTasksVisible, 'true')
	}

	useEffect(() => {
		if (typeof window === 'undefined') return

		const checkMedia = () => {
			const mediaQuery = window.matchMedia(
				`(min-width: ${MEDIA_QUERY_MIN_WIDTH}) and (min-height: ${MEDIA_QUERY_MIN_HEIGHT})`,
			)
			dispatch({ type: 'game/setScreenSizeAllowed', allowed: mediaQuery.matches })
		}

		checkMedia()
		window.addEventListener('resize', checkMedia)

		return () => window.removeEventListener('resize', checkMedia)
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined') return

		const savedTasksCompleted = window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameTasks)
		const gameTasksListVisible = window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameTasksVisible)
		const gameIsActive = window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameActive)

		const hydratePayload: GameHydratePayload = {}

		if (savedTasksCompleted) hydratePayload.tasksCompleted = JSON.parse(savedTasksCompleted) as GameTaskTypes[]
		if (gameTasksListVisible === 'true') hydratePayload.showGameTasks = true
		if (gameIsActive === 'true') {
			hydratePayload.isGameActive = true

			if (window.localStorage.getItem(GAME_LANGUAGE_CHANGED_KEY) == null) setLanguageChangedDuringGame(false)
		}

		if (Object.keys(hydratePayload).length > 0) dispatch({ type: 'game/hydrate', payload: hydratePayload })
	}, [])

	return (
		<GameContext.Provider
			value={{
				gameTasks,
				pointsEarned,
				pointsTotal,
				onCompleteTask,
				onResetGame,
				showGameDialog: state.showGameDialog,
				onShowGameDialog,
				showGameTasks: state.showGameTasks,
				onShowGameTasks,
				showGameTetris: state.showGameTetris,
				onShowGameTetris,
				isGameCompleted,
				isGameActive: state.isGameActive,
				gameSessionKey: state.gameSessionKey,
				onActivateGame,
				onStopGame,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
