'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

import { LOCAL_STORAGE_KEYS } from '@/config/keys'
import { useGame } from '@/hooks/use-game'

const DELAY_LOCALE = 700

export function LocaleGameTask() {
	const locale = useLocale()
	const { onCompleteTask } = useGame()

	useEffect(() => {
		if (typeof window === 'undefined') return

		let timer: NodeJS.Timeout

		const entryExists = window.localStorage.getItem(LOCAL_STORAGE_KEYS.initialLocale)

		if (entryExists && entryExists !== locale) {
			timer = setTimeout(() => onCompleteTask('switch-language'), DELAY_LOCALE)
		}

		if (!entryExists) window.localStorage.setItem(LOCAL_STORAGE_KEYS.initialLocale, locale)

		return () => clearTimeout(timer)
	}, [locale, onCompleteTask])

	return null
}
