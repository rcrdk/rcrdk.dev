import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'

import { GameToastContent } from '@/components/game/game-toast-content'
import { KEYS } from '@/config/keys'
import { GAME_TASKS, GameTaskTypes } from '@/data/game-tasks'
import { LocalesType } from '@/i18n/routing'
import { env } from '@/lib/env'

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
	showGameModal: boolean
	onShowGameModal: VoidFunction
	showGameTasks: boolean
	onShowGameTasks: VoidFunction
}

export const GameContext = createContext<GameContextDataProps>({} as GameContextDataProps)

interface GameContextProviderProps {
	children: React.ReactNode
}

export function CartContextProvider({ children }: GameContextProviderProps) {
	const [tasksComleted, setTasksCompleted] = useState<GameTaskTypes[]>([])
	const [showGameModal, setShowGameModal] = useState(false)
	const [showGameTasks, setShowGameTasks] = useState(false)
	const [isScreenSizeAllowed, setIsScreenSizeAllowed] = useState(false)

	const locale = useLocale() as LocalesType

	const gameTasks: GameTaskUser[] = useMemo(() => {
		return GAME_TASKS.map((task) => ({
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
			completed: tasksComleted.includes(task.id),
			button: task.button,
		}))
	}, [locale, tasksComleted])

	const notifyCompletedTask = useCallback(
		(taskId: GameTaskTypes) => {
			const task = gameTasks.find((item) => item.id === taskId)

			if (!task) return

			try {
				new Audio(`${env.NEXT_PUBLIC_APP_URL}/game-points.mp3`).play()
			} catch (error) {
				console.error(error)
			}

			toast(<GameToastContent task={task} />, {
				id: taskId,
				position: 'top-center',
				duration: 20000,
			})
		},
		[gameTasks],
	)

	const onCompleteTask = useCallback(
		(taskId: GameTaskTypes) => {
			const taskAlreadyExists = tasksComleted.find((task) => task === taskId)

			if (!taskAlreadyExists && isScreenSizeAllowed) {
				setTasksCompleted((prev) => {
					const updatedTasks = [...prev, taskId] as GameTaskTypes[]

					if (typeof window !== 'undefined') {
						window.localStorage.setItem(KEYS.gameTasks, JSON.stringify(updatedTasks))
					}

					return updatedTasks
				})

				notifyCompletedTask(taskId)
			}
		},
		[isScreenSizeAllowed, notifyCompletedTask, tasksComleted],
	)

	function onResetGame() {
		setTasksCompleted([])
		setShowGameTasks(false)

		if (typeof window !== 'undefined') {
			window.localStorage.removeItem(KEYS.initialLocale)
			window.localStorage.setItem(KEYS.gameTasks, JSON.stringify([]))
		}
	}

	function onShowGameModal() {
		setShowGameModal((prev) => !prev)
	}

	const onShowGameTasks = useCallback(() => {
		setShowGameTasks((prev) => !prev)
		onCompleteTask('has-opened-hints')
	}, [onCompleteTask])

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

		const localTasksCompleted = window.localStorage.getItem(KEYS.gameTasks)

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
				showGameModal,
				onShowGameModal,
				showGameTasks,
				onShowGameTasks,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
