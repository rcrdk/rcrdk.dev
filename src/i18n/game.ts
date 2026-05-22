import { LOCAL_STORAGE_KEYS } from '@/config/keys'

export const GAME_LANGUAGE_CHANGED_KEY = '@RCRDK.DEV:GAME_TASKS_START_LOCALE-1.0.0'

export const hasChangedLanguageDuringGame = () => {
	if (typeof window === 'undefined') return false
	return window.localStorage.getItem(GAME_LANGUAGE_CHANGED_KEY) === 'true'
}

export const setLanguageChangedDuringGame = (changed: boolean) => {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(GAME_LANGUAGE_CHANGED_KEY, changed ? 'true' : 'false')
}

const clearGameLanguageChanged = () => {
	if (typeof window === 'undefined') return
	window.localStorage.removeItem(GAME_LANGUAGE_CHANGED_KEY)
}

export const clearGameLocalStorage = () => {
	if (typeof window === 'undefined') return

	for (const key of Object.values(LOCAL_STORAGE_KEYS)) window.localStorage.removeItem(key)

	clearGameLanguageChanged()
}
