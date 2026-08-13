import { LOCAL_STORAGE_KEYS } from '@/config/keys'
import type { GameTaskTypes } from '@/data/game-tasks'

export const persistGameActive = () => {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameActive, 'true')
}

export const persistTasksCompleted = (tasksCompleted: GameTaskTypes[]) => {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameTasks, JSON.stringify(tasksCompleted))
}

export const persistTasksVisible = () => {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(LOCAL_STORAGE_KEYS.gameTasksVisible, 'true')
}

export const clearTasksVisible = () => {
	if (typeof window === 'undefined') return
	window.localStorage.removeItem(LOCAL_STORAGE_KEYS.gameTasksVisible)
}
