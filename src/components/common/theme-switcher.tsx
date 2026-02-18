'use client'

import { useEffect, useState } from 'react'
import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

const DISABLE_TRANSITIONS_DELAY = 100

export function ThemeSwitcher() {
	const __ = useTranslations('Default')
	const { setTheme, theme: currentTheme, resolvedTheme } = useTheme()
	const { onCompleteTask } = useGame()

	const [mounted, setMounted] = useState(false)

	const themesAvailable = [
		{ mode: 'system', title: __('mode.default'), Icon: IconSunMoon },
		{ mode: 'light', title: __('mode.light'), Icon: IconSun },
		{ mode: 'dark', title: __('mode.dark'), Icon: IconMoon },
	]

	const getActiveTheme = themesAvailable.find((theme) => theme.mode === currentTheme) ?? themesAvailable[0]

	function handleChangeTheme() {
		const isSystemDarkTheme = resolvedTheme === 'dark'

		document.documentElement.classList.add('disable-transitions')

		onCompleteTask('switch-theme')

		switch (currentTheme) {
			case 'system':
				return setTheme(isSystemDarkTheme ? 'light' : 'dark')
			case 'light':
				return setTheme('dark')
			case 'dark':
				return setTheme('light')
		}
	}

	useEffect(() => setMounted(true), [])

	useEffect(() => {
		const timer = setTimeout(
			() => document.documentElement.classList.remove('disable-transitions'),
			DISABLE_TRANSITIONS_DELAY,
		)
		return () => clearTimeout(timer)
	}, [currentTheme])

	if (!mounted)
		return (
			<Button as="div" variant="discret" className="pointer-events-none opacity-60" icon>
				<IconSunMoon aria-hidden />
			</Button>
		)

	const { title, Icon } = getActiveTheme

	return (
		<Button aria-label={title} onClick={handleChangeTheme} variant="discret" icon>
			<Icon aria-hidden />
		</Button>
	)
}
