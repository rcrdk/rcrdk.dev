'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

import { KEYS } from '@/config/keys'
import { useGame } from '@/hooks/use-game'

export function LocaleGameTask() {
	const locale = useLocale()
	const { onCompleteTask } = useGame()

	useEffect(() => {
		if (typeof window === 'undefined') return

		let timer: NodeJS.Timeout

		const entryExists = window.localStorage.getItem(KEYS.initialLocale)

		if (entryExists && entryExists !== locale) {
			timer = setTimeout(() => {
				onCompleteTask('switch-language')
			}, 700)
		}

		if (!entryExists) {
			window.localStorage.setItem(KEYS.initialLocale, locale)
		}

		return () => clearTimeout(timer)
	}, [locale, onCompleteTask])

	return null
}
