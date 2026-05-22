import { createContext, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'

import { GameToastContent } from '@/components/game/game-toast-content'
import { LOCAL_STORAGE_KEYS } from '@/config/keys'
import type { GameTaskTypes } from '@/data/game-tasks'
import { GAME_TASKS } from '@/data/game-tasks'
import { useHaptics } from '@/hooks/use-haptics'
import { useSoundEffect } from '@/hooks/use-sound-effect'
import type { LocalesType } from '@/i18n/config'
import { clearGameLocalStorage, GAME_LANGUAGE_CHANGED_KEY, setLanguageChangedDuringGame } from '@/i18n/game'

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
	showGameModal: boolean
	onShowGameModal: VoidFunction
	showGameTasks: boolean
	onShowGameTasks: VoidFunction
	showGameTetris: boolean
	onShowGameTetris: (open: boolean) => void
	isGameCompleted: boolean
	isGameActive: boolean
	onActivateGame: VoidFunction
	onStopGame: VoidFunction
}

export const GameContext = createContext<GameContextDataProps>({} as GameContextDataProps)

interface GameContextProviderProps {
	children: React.ReactNode
}

export function GameContextProvider({ children }: GameContextProviderProps) {
	const [isGameActive, setIsGameActive] = useState(false)
	const [tasksCompleted, setTasksCompleted] = useState<GameTaskTypes[]>([])
	const [showGameModal, setShowGameModal] = useState(false)
	const [showGameTetris, setShowGameTetris] = useState(false)
	const [showGameTasks, setShowGameTasks] = useState(false)
	const [isScreenSizeAllowed, setIsScreenSizeAllowed] = useState(false)

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
		completed: tasksCompleted.includes(task.id),
		button: task.button,
	}))

	function onActivateGame() {
		setIsGameActive(true)
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

		toast(<GameToastContent task={task} />, {
			id: taskId,
			position: 'top-center',
			duration: TOAST_DURATION,
		})
	}

	function onCompleteTask(taskId: GameTaskTypes) {
		const taskAlreadyExists = tasksCompleted.find((task) => task === taskId)

		if (!taskAlreadyExists && isScreenSizeAllowed && isGameActive) {
			setTasksCompleted((prev) => {
				const updatedTasks = [...prev, taskId] as GameTaskTypes[]

				if (typeof window !== 'undefined')
					window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameTasks, JSON.stringify(updatedTasks))

				return updatedTasks
			})

			notifyCompletedTask(taskId)
		}
	}

	function onResetGame(soundEffect?: boolean) {
		setTasksCompleted([])
		setShowGameTasks(false)
		triggerHaptic()

		if (soundEffect) playSound('game-start')

		if (typeof window !== 'undefined') {
			setLanguageChangedDuringGame(false)
			window.localStorage.removeItem(LOCAL_STORAGE_KEYS.gameTasksVisible)
			window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameTasks, JSON.stringify([]))
		}
	}

	function onStopGame() {
		setTasksCompleted([])
		setShowGameTasks(false)
		setShowGameTetris(false)
		setIsGameActive(false)
		playSound('game-over')
		triggerHaptic()
		clearGameLocalStorage()
	}

	function onShowGameModal() {
		setShowGameModal((prev) => !prev)
	}

	function onShowGameTetris(open: boolean) {
		if (open) {
			setShowGameModal(false)
			setShowGameTetris(true)
			return
		}

		setShowGameTetris(false)
		onCompleteTask('tetris')
	}

	function onShowGameTasks() {
		setShowGameTasks(true)
		onCompleteTask('has-opened-hints')

		if (typeof window !== 'undefined') window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameTasksVisible, 'true')
	}

	const pointsEarned = GAME_TASKS.filter((task) => tasksCompleted.includes(task.id)).reduce(
		(previous, current) => previous + current.points,
		0,
	)

	const pointsTotal = GAME_TASKS.reduce((previous, current) => previous + current.points, 0)

	const isGameCompleted = pointsEarned >= pointsTotal

	useEffect(() => {
		if (typeof window === 'undefined') return

		const checkMedia = () => {
			const checkMedia = window.matchMedia(
				`(min-width: ${MEDIA_QUERY_MIN_WIDTH}) and (min-height: ${MEDIA_QUERY_MIN_HEIGHT})`,
			)
			setIsScreenSizeAllowed(checkMedia.matches)
		}

		checkMedia()
		window.addEventListener('resize', checkMedia)

		return () => window.removeEventListener('resize', checkMedia)
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined') return

		const checkForSavedTasksCompleted = window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameTasks)
		const checkIfGameTasksListAreVisible = window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameTasksVisible)
		const checkIfGameIsActive = window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameActive)

		if (checkForSavedTasksCompleted) setTasksCompleted(JSON.parse(checkForSavedTasksCompleted))
		if (checkIfGameTasksListAreVisible && checkIfGameTasksListAreVisible === 'true') setShowGameTasks(true)
		if (checkIfGameIsActive && checkIfGameIsActive === 'true') {
			setIsGameActive(true)

			if (window.localStorage.getItem(GAME_LANGUAGE_CHANGED_KEY) == null) setLanguageChangedDuringGame(false)
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
				showGameTetris,
				onShowGameTetris,
				isGameCompleted,
				isGameActive,
				onActivateGame,
				onStopGame,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
