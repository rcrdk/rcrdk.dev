import * as Avatar from '@radix-ui/react-avatar'
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useState } from 'react'

import avatarImage from '@/assets/avatar.jpg'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'

import { BrandAvatar, BrandContainer, HeaderContainer } from './styles'

export default function Header() {
	const [mounted, setMounted] = useState(false)

	const { setTheme, theme: currentTheme, resolvedTheme } = useTheme()

	const themesAvailable = useMemo(() => {
		return [
			{
				mode: 'light',
				title: 'Modo Claro (clique para alterar)',
				icon: <IconSun />,
			},
			{
				mode: 'dark',
				title: 'Modo Escuro (clique para alterar)',
				icon: <IconMoon />,
			},
			{
				mode: 'system',
				title: 'Modo de cores do sistema (clique para alterar)',
				icon: <IconDeviceDesktop />,
			},
		]
	}, [])

	const getActiveTheme = useMemo(() => {
		return themesAvailable.find((theme) => theme.mode === currentTheme)
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

	console.log(resolvedTheme)

	return (
		<HeaderContainer>
			<Container>
				<BrandContainer>
					<BrandAvatar>
						<Avatar.Image src={avatarImage.src} />
					</BrandAvatar>
					<Heading as="span" mode="h3">
						rcrdk<span>.dev</span>
					</Heading>
				</BrandContainer>

				<Button
					mode="filledGray"
					title={getActiveTheme?.title}
					onClick={handleChangeTheme}
				>
					{getActiveTheme?.icon}
				</Button>
			</Container>
		</HeaderContainer>
	)
}
