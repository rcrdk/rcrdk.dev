'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useHaptic } from 'use-haptic'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/tailwind-cn'

const languagesAvailable = [
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

export function LocaleSwitcher() {
	const __ = useTranslations('Default')
	const { locale: currentLocale } = useParams()
	const { triggerHaptic } = useHaptic()

	const getActiveLocale = languagesAvailable.find((locale) => locale.prefix === currentLocale) ?? languagesAvailable[0]

	function handleChangeLocale() {
		triggerHaptic()
	}

	return (
		<nav>
			<span className="sr-only">{__('changeLocale')}</span>

			<div className="layout:w-12 layout:h-auto layout:px-0 layout:py-2 layout:flex-col flex h-12 items-center gap-2 rounded-xl bg-black/5 px-2 dark:bg-white/10">
				{languagesAvailable.map((lang) => {
					const isActive = getActiveLocale.prefix === lang.prefix
					const tabIndex = isActive ? -1 : undefined

					return (
						<Button
							as="a"
							href={`/${lang.prefix}`}
							key={lang.prefix}
							icon
							size="xs"
							tabIndex={tabIndex}
							className={cn(
								isActive && 'pointer-events-none bg-white shadow-sm dark:bg-black dark:shadow-md dark:shadow-white/10',
								!isActive && '!bg-transparent hover:!bg-black/5 dark:hover:!bg-white/5',
							)}
							onClick={handleChangeLocale}
						>
							<abbr title={lang.title} className="text-sm font-semibold no-underline">
								{lang.acronym}
							</abbr>
						</Button>
					)
				})}
			</div>
		</nav>
	)
}
