'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import avatarPicture from '@/assets/avatar.jpg'
import { LocaleSwitcher } from '@/components/common/locale-switcher'
import { Container } from '@/components/ui/container'
import { useScrollHeader } from '@/hooks/use-scroll-header'
import { cn } from '@/utils/tailwind-cn'

export function HeaderContent() {
	const t = useTranslations('Default')
	const { visible } = useScrollHeader()

	return (
		<header
			className={cn(
				'sticky inset-x-0 top-0 z-20 w-full border-b border-black/5 bg-white/90 text-black/85 backdrop-blur-xs transition-transform duration-300 ease-out will-change-transform select-none motion-reduce:transition-none dark:border-white/10 dark:bg-black/90 dark:text-white',
				!visible && '-translate-y-full',
			)}
		>
			<Container sideSpacing="pageContent" classNameCenter="flex items-center justify-between gap-4 py-2 sm:py-3">
				<Link
					href="/"
					className="focus-visible:border-accent-blue flex items-center gap-2.5 rounded-4xl border border-transparent py-1 pr-3 pl-1"
				>
					<Image
						src={avatarPicture}
						width={40}
						height={40}
						alt={t('avatarAlt')}
						className="size-9 shrink-0 rounded-full sm:size-10"
					/>

					<span className="font-heading text-2xl leading-none font-black tracking-tight sm:text-3xl">
						rcrdk
						<span className="text-accent-blue">.dev</span>
					</span>
				</Link>

				<div className="flex items-center gap-2">
					<LocaleSwitcher variant="horizontal" />
				</div>
			</Container>
		</header>
	)
}
