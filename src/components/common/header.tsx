/* eslint-disable @next/next/no-html-link-for-pages */
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import avatarPicture from '@/assets/avatar.jpg'
import AnimatedContent from '@/components/animated/animated-content'
import { Game } from '@/components/common/game-toggle'
import { LastFmHistory } from '@/components/common/last-fm-history'
import { LocaleSwitcher } from '@/components/common/locale-switcher'
import { Nav } from '@/components/common/nav'
import { ThemeSwitcher } from '@/components/common/theme-switcher'
import { Container } from '@/components/ui/container'
import { scrollToSection } from '@/utils/scroll-to-section'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	animationEnter: 'vertical' | 'horizontal'
}

function HeaderInset({ animationEnter }: Props) {
	const ref = useRef<HTMLSpanElement>(null)

	const [showLettering, setShowLettering] = useState(false)

	const t = useTranslations('Default')

	useEffect(() => {
		const element = ref.current
		if (!element) return

		if (process.env.NODE_ENV === 'production') {
			console.log(
				'%cFront-end is my passion! 🐶 ',
				'font-weight: bold; font-size: 50px;color: white; text-shadow: 0 0 16px rgba(0, 0, 0, 0.25), 1px 1px 0 rgb(217,31,38) , 2px 2px 0 rgb(226,91,14) , 3px 3px 0 rgb(245,221,8) , 4px 4px 0 rgb(5,148,68) , 5px 5px 0 rgb(2,135,206) , 6px 6px 0 rgb(4,77,145) , 7px 7px 0 rgb(42,21,113)',
			)
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShowLettering(true)
					observer.unobserve(element)
				}
			},
			{ threshold: 0.1 },
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	return (
		<AnimatedContent
			direction={animationEnter}
			className={cn(
				'xs:py-0 xs:border-b-0 border-b border-black/5 py-3 dark:border-white/10',
				animationEnter === 'vertical' && 'layout:hidden flex grow',
				animationEnter === 'horizontal' && 'layout:flex hidden grow',
			)}
			reverse
			distance={animationEnter === 'vertical' ? 40 : 80}
			config={{ tension: 60, friction: 15 }}
		>
			<Container
				className="layout:pl-11 layout:pr-0 layout:flex"
				classNameCenter="flex items-center justify-between layout:flex-col layout:min-h-fit"
			>
				<a
					href="/"
					className="xs:py-2 xs:pr-4 xs:pl-2 layout:flex-col layout:px-1 layout:pb-2 layout:pt-1 layout:-mt-1 xs:-ml-2 focus-visible:border-accent-blue -ml-1 flex items-center rounded-4xl border border-transparent py-1 pr-2 pl-1"
					onClick={(e) => scrollToSection(e, '#home')}
				>
					<Image
						src={avatarPicture}
						width={200}
						height={100}
						alt={t('avatarAlt')}
						className="xs:size-10 size-9 rounded-full"
					/>

					<span className="xs:pl-3 layout:pt-3 layout:pl-0 block w-full overflow-hidden pl-2" ref={ref}>
						<span
							className={cn(
								'font-heading xs:text-3xl layout:[writing-mode:vertical-rl] layout:[text-orientation:mixed] layout:rotate-180 layout:pr-[0.15rem] block w-full -translate-y-0.5 text-2xl leading-none font-black tracking-tight transition-all duration-1000',
								!showLettering && 'layout:-translate-y-full layout:translate-x-0 -translate-x-full opacity-0',
							)}
						>
							rcrdk
							<span className="text-accent-blue">.dev</span>
						</span>
					</span>
				</a>

				<Nav slot="header" />

				<div className="layout:flex-col flex gap-2">
					<LocaleSwitcher />
					<ThemeSwitcher />
					<LastFmHistory />
					<Game />
				</div>
			</Container>
		</AnimatedContent>
	)
}

export function Header() {
	return (
		<header className="xs:pt-6 xs:pb-0 xs:static layout:sticky layout:top-0 layout:w-auto layout:py-10 layout:min-h-svh layout:flex sticky top-0 z-10 w-full bg-white/90 text-black/85 backdrop-blur-xs select-none dark:bg-black/90 dark:text-white">
			<HeaderInset animationEnter="horizontal" />
			<HeaderInset animationEnter="vertical" />
		</header>
	)
}
