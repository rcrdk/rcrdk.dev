'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-haiku'

import avatarPicture from '@/assets/avatar.jpg'
import AnimatedContent from '@/components/animated/AnimatedContent'
import { LocaleSwitcher } from '@/components/common/locale-switcher'
import { ThemeSwitcher } from '@/components/common/theme-switcher'
import { Container } from '@/components/ui/container'
import { Link } from '@/i18n/routing'

export function Header() {
	const [isVertical, setIsVertical] = useState<boolean>()

	const t = useTranslations('Default')
	const { width, height } = useWindowSize()

	useEffect(() => {
		if (width >= 1120 && height >= 480) {
			setIsVertical(false)
		} else {
			setIsVertical(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<header className="xs:pt-6 xs:pb-0 xs:static xs:border-b-0 layout:sticky layout:top-0 layout:w-auto layout:py-10 layout:min-h-svh layout:flex sticky top-0 z-10 w-full border-b border-black/5 bg-white/90 pt-4 pb-4 text-black/85 backdrop-blur-xs select-none dark:border-white/10 dark:bg-black/90 dark:text-white">
			<AnimatedContent
				direction={isVertical ? 'vertical' : 'horizontal'}
				className="flex grow"
				reverse
				distance={isVertical ? 60 : 80}
				threshold={0}
				enabled={typeof isVertical === 'boolean'}
				config={{ tension: 60, friction: 15 }}
			>
				<Container
					className="layout:pl-11 layout:pr-0 layout:flex"
					classNameCenter="flex items-center justify-between layout:flex-col layout:min-h-fit"
				>
					<Link
						href="/"
						className="xs:py-2 xs:pr-4 xs:pl-2 xs:gap-3 layout:flex-col layout:px-1 layout:pb-2 layout:pt-1 flex items-center gap-2 rounded-4xl py-1 pr-2 pl-1"
					>
						<Image
							src={avatarPicture}
							width={200}
							height={100}
							alt={t('avatarAlt')}
							className="xs:size-10 size-9 rounded-full"
						/>

						<span className="font-heading xs:text-3xl layout:[writing-mode:vertical-rl] layout:rotate-180 layout:pl-1 block -translate-y-0.5 text-2xl leading-none font-black tracking-tight">
							rcrdk
							<span className="text-accent-blue">.dev</span>
						</span>
					</Link>

					<div className="layout:flex-col flex gap-2">
						<LocaleSwitcher />
						<ThemeSwitcher />
					</div>
				</Container>
			</AnimatedContent>
		</header>
	)
}
