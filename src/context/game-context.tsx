import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocale } from 'next-intl'

import { GAME_TASKS, GameTaskTypes } from '@/data/game-tasks'
import { LocalesType } from '@/i18n/routing'

interface GameTask {
	id: GameTaskTypes
	title: string
	hint: string
	points: number
	completed: boolean
}

interface GameContextDataProps {
	gameTasks: GameTask[]
	pointsEarned: number
	pointsTotal: number
	onCompleteTask: (taskId: GameTaskTypes) => void
	onResetGame: VoidFunction
	showGameHistory: boolean
	onShowGameHistory: VoidFunction
}

export const GameContext = createContext<GameContextDataProps>({} as GameContextDataProps)

interface GameContextProviderProps {
	children: React.ReactNode
}

export function CartContextProvider({ children }: GameContextProviderProps) {
	const localStorageKey = '@RCRDK.DEV:GAME_TASKS-1.0.0'

	const [tasksComleted, setTasksCompleted] = useState<GameTaskTypes[]>([])
	const [showGameHistory, setShowGameHistory] = useState(false)
	const [isScreenSizeAllowed, setIsScreenSizeAllowed] = useState(false)

	const locale = useLocale() as LocalesType

	const onCompleteTask = useCallback(
		(taskId: GameTaskTypes) => {
			const taskAlreadyExists = tasksComleted.find((task) => task === taskId)

			if (!taskAlreadyExists && isScreenSizeAllowed) {
				setTasksCompleted((prev) => {
					const updatedTasks = [...prev, taskId] as GameTaskTypes[]

					if (typeof window !== 'undefined') {
						window.localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks))
					}

					return updatedTasks
				})

				// throw toast
				// throw temporary badge to game modal toggle button
			}
		},
		[isScreenSizeAllowed, tasksComleted],
	)

	function onResetGame() {
		setTasksCompleted([])

		if (typeof window !== 'undefined') {
			window.localStorage.setItem(localStorageKey, JSON.stringify([]))
		}
	}

	function onShowGameHistory() {
		setShowGameHistory((prev) => !prev)
	}

	const gameTasks: GameTask[] = useMemo(() => {
		return GAME_TASKS.map((task) => ({
			id: task.id,
			title: task.title[locale],
			hint: task.hint[locale],
			points: task.points,
			completed: tasksComleted.includes(task.id),
		}))
	}, [locale, tasksComleted])

	const pointsEarned = useMemo(() => {
		return GAME_TASKS.filter((task) => tasksComleted.includes(task.id)).reduce(
			(previous, current) => previous + current.points,
			0,
		)
	}, [tasksComleted])

	const pointsTotal = useMemo(() => {
		return GAME_TASKS.reduce((previous, current) => previous + current.points, 0)
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined') return

		const checkMedia = () => {
			const checkMedia = window.matchMedia('(min-width: 70rem) and (min-height: 35rem)')
			setIsScreenSizeAllowed(checkMedia.matches)
		}

		checkMedia()
		window.addEventListener('resize', checkMedia)

		return () => window.removeEventListener('resize', checkMedia)
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined') return

		const localTasksCompleted = window.localStorage.getItem(localStorageKey)

		if (localTasksCompleted) {
			setTasksCompleted(JSON.parse(localTasksCompleted))
		}
	}, [])

	return (
		<GameContext.Provider
			value={{
				gameTasks,
				pointsEarned,
				pointsTotal,
				onCompleteTask,
				onResetGame,
				showGameHistory,
				onShowGameHistory,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
