'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/tailwind-cn'

export function LocaleSwitcher() {
	const __ = useTranslations('Default')
	const { locale: currentLocale } = useParams()

	const languagesAvailable = useMemo(() => {
		return [
			{
				prefix: 'en',
				title: 'English',
				acronym: 'EN',
			},
			{
				prefix: 'pt-br',
				title: 'Português',
				acronym: 'PT',
			},
		]
	}, [])

	const getActiveLocale = useMemo(() => {
		return languagesAvailable.find((locale) => locale.prefix === currentLocale) ?? languagesAvailable[0]
	}, [currentLocale, languagesAvailable])

	return (
		<nav>
			<span className="sr-only">{__('changeLocale')}</span>

			<div className="layout:w-12 layout:h-auto layout:px-0 layout:py-2 layout:flex-col flex h-12 items-center gap-2 rounded-xl bg-black/5 px-2 dark:bg-white/10">
				{languagesAvailable.map((lang) => (
					<Button
						as="a"
						href={`/${lang.prefix}`}
						key={lang.prefix}
						icon
						size="xs"
						tabIndex={getActiveLocale.prefix === lang.prefix ? -1 : undefined}
						className={cn(
							getActiveLocale.prefix === lang.prefix
								? 'pointer-events-none bg-white shadow-sm dark:bg-black dark:shadow-md dark:shadow-white/10'
								: '!bg-transparent hover:!bg-black/5 dark:hover:!bg-white/5',
						)}
					>
						<abbr title={lang.title} className="text-sm font-semibold no-underline">
							{lang.acronym}
						</abbr>
					</Button>
				))}
			</div>
		</nav>
	)
}
