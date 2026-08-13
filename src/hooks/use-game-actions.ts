import type { Dispatch } from 'react'

import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import type { GameTaskTypes } from '@/data/game-tasks'
import { useHaptics } from '@/hooks/use-haptics'
import { useSoundEffect } from '@/hooks/use-sound-effect'
import { clearGameLocalStorage, setLanguageChangedDuringGame } from '@/i18n/game'
import { notifyCompletedTask } from '@/lib/notify-completed-task'
import { trackEvent } from '@/lib/track-event'
import type { GameAction, GameState } from '@/reducers/game-reducer'
import type { GameTaskUser } from '@/types/game'
import {
	clearTasksVisible,
	persistGameActive,
	persistTasksCompleted,
	persistTasksVisible,
	sumGamePoints,
} from '@/utils'

type UseGameActionsParams = {
	state: GameState
	dispatch: Dispatch<GameAction>
	gameTasks: GameTaskUser[]
	pointsEarned: number
	pointsTotal: number
}

export function useGameActions({ state, dispatch, gameTasks, pointsEarned, pointsTotal }: UseGameActionsParams) {
	const { playSound } = useSoundEffect()
	const { triggerHaptic } = useHaptics()

	function onActivateGame() {
		trackEvent(ANALYTICS_EVENTS.gameActivate)

		dispatch({ type: 'game/activate' })
		playSound('game-start')
		persistGameActive()
		setLanguageChangedDuringGame(false)
	}

	function onCompleteTask(taskId: GameTaskTypes) {
		const canCompleteTask = !state.tasksCompleted.includes(taskId) && state.isScreenSizeAllowed && state.isGameActive

		if (!canCompleteTask) return

		const tasksCompleted = [...state.tasksCompleted, taskId]
		const task = gameTasks.find((item) => item.id === taskId)

		trackEvent(ANALYTICS_EVENTS.gameTaskComplete, { task: taskId, points: task?.points ?? 0 })

		if (sumGamePoints(tasksCompleted) >= pointsTotal) {
			trackEvent(ANALYTICS_EVENTS.gameCompleted, { points: pointsTotal })
		}

		dispatch({ type: 'game/completeTask', taskId })
		persistTasksCompleted(tasksCompleted)

		if (!task) return

		playSound('game-points')
		notifyCompletedTask(task)
	}

	function onResetGame() {
		trackEvent(ANALYTICS_EVENTS.gameReset, { points: pointsEarned })

		dispatch({ type: 'game/reset' })
		triggerHaptic()
		playSound('game-start')

		setLanguageChangedDuringGame(false)
		clearTasksVisible()
		persistTasksCompleted([])
	}

	function onStopGame() {
		trackEvent(ANALYTICS_EVENTS.gameStop, { points: pointsEarned })

		dispatch({ type: 'game/stop' })
		playSound('game-over')
		triggerHaptic()
		clearGameLocalStorage()
	}

	function onShowGameDialog() {
		const event = state.showGameDialog ? ANALYTICS_EVENTS.gameDialogClose : ANALYTICS_EVENTS.gameDialogOpen
		trackEvent(event, { points: pointsEarned })

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
		persistTasksVisible()
	}

	return {
		onActivateGame,
		onCompleteTask,
		onResetGame,
		onStopGame,
		onShowGameDialog,
		onShowGameTetris,
		onShowGameTasks,
	}
}
