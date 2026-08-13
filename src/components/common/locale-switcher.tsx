'use client'

import { useRef, useState, type ComponentRef } from 'react'
import { useTranslations } from 'next-intl'

import { MotionDiv } from '@/components/animated/motion'
import { LocaleSwitcherItem } from '@/components/common/locale-switcher-item'
import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { useLocaleSwitcher } from '@/contexts/locale-context'
import { useHaptics } from '@/hooks/use-haptics'
import { useRelativeRect } from '@/hooks/use-relative-rect'
import type { LocalesType } from '@/i18n/config'
import { trackEvent } from '@/lib/track-event'
import { cn } from '@/utils'

const LANGUAGES_AVAILABLE: { prefix: LocalesType; title: string; acronym: string }[] = [
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

const LOCALE_INDICATOR_SPRING = {
	type: 'spring' as const,
	stiffness: 380,
	damping: 32,
	mass: 0.45,
}

interface LocaleSwitcherProps {
	variant?: 'vertical' | 'horizontal'
}

export function LocaleSwitcher({ variant = 'vertical' }: Readonly<LocaleSwitcherProps>) {
	const isHorizontal = variant === 'horizontal'
	const __ = useTranslations('Default')
	const { locale: currentLocale, setLocale } = useLocaleSwitcher()
	const { triggerHaptic } = useHaptics()

	const containerRef = useRef<ComponentRef<'div'> | null>(null)
	const itemRefs = useRef<Partial<Record<LocalesType, ComponentRef<'button'>>>>({})
	const [activeElement, setActiveElement] = useState<ComponentRef<'button'> | null>(null)

	const indicator = useRelativeRect({ containerRef, targetElement: activeElement })

	function registerItemRef(locale: LocalesType, element: ComponentRef<'button'> | null) {
		itemRefs.current[locale] = element ?? undefined
		if (locale === currentLocale) setActiveElement(element)
	}

	function handleChangeLocale(nextLocale: LocalesType) {
		if (nextLocale === currentLocale) return

		trackEvent(ANALYTICS_EVENTS.localeChange, { locale: nextLocale })
		triggerHaptic()
		setActiveElement(itemRefs.current[nextLocale] ?? null)
		void setLocale(nextLocale)
	}

	return (
		<nav>
			<span className="sr-only">{__('changeLocale')}</span>

			<div
				ref={containerRef}
				className={cn(
					'squircle-rounded relative flex h-12 items-center gap-2 rounded-xl bg-black/5 dark:bg-white/10',
					isHorizontal && 'w-auto px-2',
					!isHorizontal && 'layout:w-12 layout:h-auto layout:flex-col layout:px-0 layout:py-2 px-2',
				)}
			>
				{indicator && (
					<MotionDiv
						className="squircle-rounded pointer-events-none absolute top-0 left-0 rounded-xl bg-white shadow-sm dark:bg-black dark:shadow-md dark:shadow-white/10"
						initial={false}
						animate={{
							x: indicator.left,
							y: indicator.top,
							width: indicator.width,
							height: indicator.height,
						}}
						transition={LOCALE_INDICATOR_SPRING}
					/>
				)}

				{LANGUAGES_AVAILABLE.map((lang) => (
					<LocaleSwitcherItem
						key={lang.prefix}
						title={lang.title}
						acronym={lang.acronym}
						isActive={currentLocale === lang.prefix}
						onSelect={() => handleChangeLocale(lang.prefix)}
						itemRef={(element) => registerItemRef(lang.prefix, element)}
					/>
				))}
			</div>
		</nav>
	)
}
