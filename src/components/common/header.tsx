'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import avatarPicture from '@/assets/avatar.jpg'
import AnimatedContent from '@/components/animated/AnimatedContent'
import { LocaleSwitcher } from '@/components/common/locale-switcher'
import { ThemeSwitcher } from '@/components/common/theme-switcher'
import { Container } from '@/components/ui/container'
import { Link } from '@/i18n/routing'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	animationEnter: 'vertical' | 'horizontal'
}

function HeaderInset({ animationEnter }: Props) {
	const t = useTranslations('Default')

	return (
		<AnimatedContent
			direction={animationEnter}
			className={cn(
				'xs:py-0 xs:border-b-0 border-b border-black/5 py-4 dark:border-white/10',
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
