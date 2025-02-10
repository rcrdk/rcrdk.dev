'use client'

import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'

export function ThemeSwitcher() {
	const __ = useTranslations('Default')
	const { setTheme, theme: currentTheme, resolvedTheme } = useTheme()

	const [mounted, setMounted] = useState(false)

	const themesAvailable = useMemo(() => {
		return [
			{ mode: 'system', title: __('mode.default'), icon: <IconSunMoon /> },
			{ mode: 'light', title: __('mode.light'), icon: <IconSun /> },
			{ mode: 'dark', title: __('mode.dark'), icon: <IconMoon /> },
		]
	}, [__])

	const getActiveTheme = useMemo(
		() =>
			themesAvailable.find((theme) => theme.mode === currentTheme) ??
			themesAvailable[0],
		[currentTheme, themesAvailable],
	)

	const handleChangeTheme = useCallback(() => {
		const isSystemDarkTheme = resolvedTheme === 'dark'

		document.documentElement.classList.add('disable-transitions')

		switch (currentTheme) {
			case 'system':
				return setTheme(isSystemDarkTheme ? 'light' : 'dark')
			case 'light':
				return setTheme('dark')
			case 'dark':
				return setTheme('light')
		}
	}, [currentTheme, resolvedTheme, setTheme])

	useEffect(() => setMounted(true), [])

	useEffect(() => {
		const timer = setTimeout(() => {
			document.documentElement.classList.remove('disable-transitions')
		}, 100)

		return () => {
			clearTimeout(timer)
		}
	}, [currentTheme])

	useEffect(() => {
		const onKeyUp = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === 'c') handleChangeTheme()
		}

		document.addEventListener('keyup', onKeyUp)

		return () => document.removeEventListener('keyup', onKeyUp)
	}, [handleChangeTheme])

	if (!mounted) {
		return (
			<Button
				as="div"
				variant="discret"
				className="pointer-events-none opacity-60"
				icon
			>
				<IconSunMoon />
			</Button>
		)
	}

	const { title, icon } = getActiveTheme

	return (
		<Button
			aria-label={title}
			onClick={handleChangeTheme}
			variant="discret"
			icon
		>
			{icon}
		</Button>
	)
}
