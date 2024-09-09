import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Tooltip from '@/components/tooltip'

import { Button } from '../button'
import { SrOnly } from '../text'

export default function HeaderColorMode() {
	const __ = useTranslations('Default')
	const { setTheme, theme: currentTheme, resolvedTheme } = useTheme()

	const [mounted, setMounted] = useState(false)

	const themesAvailable = useMemo(() => {
		return [
			{
				mode: 'system',
				title: __('mode.default'),
				icon: <IconDeviceDesktop />,
			},
			{
				mode: 'light',
				title: __('mode.light'),
				icon: <IconSun />,
			},
			{
				mode: 'dark',
				title: __('mode.dark'),
				icon: <IconMoon />,
			},
		]
	}, [__])

	const getActiveTheme = useMemo(() => {
		const theme = themesAvailable.find((theme) => theme.mode === currentTheme)

		if (!theme) return themesAvailable.at(0)

		return theme
	}, [currentTheme, themesAvailable])

	const handleChangeTheme = useCallback(() => {
		const isSystemDarkTheme = resolvedTheme === 'dark'

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
	if (!mounted) return null

	return (
		<Tooltip content={getActiveTheme?.title}>
			<Button mode="filledGray" onClick={handleChangeTheme}>
				{getActiveTheme?.icon || ''}
				<SrOnly>{getActiveTheme?.title || __('mode.default')}</SrOnly>
			</Button>
		</Tooltip>
	)
}
