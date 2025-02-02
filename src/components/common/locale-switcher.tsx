'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

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
		return (
			languagesAvailable.find((locale) => locale.prefix === currentLocale) ??
			languagesAvailable[0]
		)
	}, [currentLocale, languagesAvailable])

	return (
		<nav>
			<span className="sr-only">{__('changeLocale')}</span>

			<div className="xs:h-12 flex h-11 items-center gap-2 rounded-xl bg-black/5 px-2 dark:bg-white/10">
				{languagesAvailable.map((lang) => (
					<Button
						as={Link}
						href={`/${lang.prefix}`}
						key={lang.prefix}
						icon
						size="sm"
						tabIndex={getActiveLocale.prefix === lang.prefix ? -1 : undefined}
						className={cn(
							getActiveLocale.prefix === lang.prefix
								? 'pointer-events-none bg-white shadow-sm dark:bg-black dark:shadow-md dark:shadow-white/10'
								: 'hover:bg-black/5 dark:hover:bg-white/5',
						)}
					>
						<abbr
							title={lang.title}
							className="text-sm font-semibold no-underline"
						>
							{lang.acronym}
						</abbr>
					</Button>
				))}
			</div>
		</nav>
	)
}
