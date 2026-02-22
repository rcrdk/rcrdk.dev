'use client'

import { useEffect, useState } from 'react'
import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react'
import { AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { MotionSpan } from '@/components/animated/motion'
import { Button } from '@/components/ui/button'
import { DEFAULT_MOTION_TWEEN_CONFIG } from '@/config/motion'
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
			<div className="relative size-6">
				<AnimatePresence initial={false} mode="wait">
					<MotionSpan
						key={currentTheme ?? 'system'}
						className="absolute inset-0 flex items-center justify-center"
						initial={{ opacity: 0, scale: 0.6 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.6 }}
						transition={{ ...DEFAULT_MOTION_TWEEN_CONFIG, duration: 0.15 }}
					>
						<Icon aria-hidden className="size-5" />
					</MotionSpan>
				</AnimatePresence>
			</div>
		</Button>
	)
}
