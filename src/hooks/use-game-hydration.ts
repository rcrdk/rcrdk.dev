import { useEffect } from 'react'

import { LOCAL_STORAGE_KEYS } from '@/config/keys'
import { GAME_LANGUAGE_CHANGED_KEY, setLanguageChangedDuringGame } from '@/i18n/game'
import type { GameHydratePayload } from '@/reducers/game-reducer'
import { gameTasksCompletedSchema } from '@/schemas/game-storage'

const readCompletedTasks = (rawValue: string | null) => {
	if (!rawValue) return undefined

	try {
		const parsed = gameTasksCompletedSchema.safeParse(JSON.parse(rawValue))
		return parsed.success ? parsed.data : undefined
	} catch {
		return undefined
	}
}

const buildHydratePayload = (): GameHydratePayload => {
	const tasksCompleted = readCompletedTasks(window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameTasks))
	const showGameTasks = window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameTasksVisible) === 'true'
	const isGameActive = window.localStorage.getItem(LOCAL_STORAGE_KEYS.gameActive) === 'true'
	const hasLanguageChangedFlag = Boolean(window.localStorage.getItem(GAME_LANGUAGE_CHANGED_KEY))

	if (isGameActive && !hasLanguageChangedFlag) setLanguageChangedDuringGame(false)

	return {
		...(tasksCompleted && { tasksCompleted }),
		...(showGameTasks && { showGameTasks }),
		...(isGameActive && { isGameActive }),
	}
}

export function useGameHydration(onHydrate: (payload: GameHydratePayload) => void) {
	useEffect(() => {
		if (typeof window === 'undefined') return

		const payload = buildHydratePayload()
		if (Object.keys(payload).length > 0) onHydrate(payload)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
