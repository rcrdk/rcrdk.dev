'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'

import { useGame } from '@/hooks/use-game'
import { hasChangedLanguageDuringGame, setLanguageChangedDuringGame } from '@/i18n/game'

const DELAY_LOCALE = 700

export function LocaleGameTask() {
	const locale = useLocale()
	const { onCompleteTask, isGameActive } = useGame()
	const previousLocaleRef = useRef(locale)

	useEffect(() => {
		if (!isGameActive) {
			previousLocaleRef.current = locale
			return
		}

		const localeChanged = previousLocaleRef.current !== locale
		previousLocaleRef.current = locale

		if (!localeChanged || hasChangedLanguageDuringGame()) return

		setLanguageChangedDuringGame(true)

		const timer = setTimeout(() => onCompleteTask('switch-language'), DELAY_LOCALE)

		return () => clearTimeout(timer)
	}, [locale, isGameActive, onCompleteTask])

	return null
}
