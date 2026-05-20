'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { MotionDiv } from '@/components/animated/motion'
import { useLocaleSwitcher } from '@/context/locale-context'
import { useHaptics } from '@/hooks/use-haptics'
import { useResizeObserver } from '@/hooks/use-resize-observer'
import type { LocalesType } from '@/i18n/config'
import { cn } from '@/utils/tailwind-cn'

const languagesAvailable: { prefix: LocalesType; title: string; acronym: string }[] = [
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

type IndicatorRect = { x: number; y: number; width: number; height: number }

const LOCALE_INDICATOR_SPRING = {
	type: 'spring' as const,
	stiffness: 380,
	damping: 32,
	mass: 0.45,
}

export function LocaleSwitcher() {
	const __ = useTranslations('Default')
	const { locale: currentLocale, setLocale } = useLocaleSwitcher()
	const { triggerHaptic } = useHaptics()

	const containerRef = useRef<React.ComponentRef<'div'> | null>(null)
	const itemRefs = useRef<Partial<Record<LocalesType, React.ComponentRef<'button'>>>>({})
	const [indicator, setIndicator] = useState<IndicatorRect | null>(null)

	const updateIndicator = useCallback(() => {
		const container = containerRef.current
		const activeEl = itemRefs.current[currentLocale]

		if (!container || !activeEl) return

		const containerRect = container.getBoundingClientRect()
		const activeRect = activeEl.getBoundingClientRect()

		setIndicator({
			x: activeRect.left - containerRect.left,
			y: activeRect.top - containerRect.top,
			width: activeRect.width,
			height: activeRect.height,
		})
	}, [currentLocale])

	useLayoutEffect(() => updateIndicator(), [updateIndicator])

	useResizeObserver(containerRef, updateIndicator, { runOnMount: true })

	function handleChangeLocale(nextLocale: LocalesType) {
		if (nextLocale === currentLocale) return
		triggerHaptic()
		void setLocale(nextLocale)
	}

	return (
		<nav>
			<span className="sr-only">{__('changeLocale')}</span>

			<div
				ref={containerRef}
				className="layout:w-12 layout:h-auto layout:px-0 layout:py-2 layout:flex-col squircle-rounded relative flex h-12 items-center gap-2 rounded-xl bg-black/5 px-2 dark:bg-white/10"
			>
				{indicator && (
					<MotionDiv
						className="squircle-rounded pointer-events-none absolute top-0 left-0 rounded-xl bg-white shadow-sm dark:bg-black dark:shadow-md dark:shadow-white/10"
						initial={false}
						animate={{
							x: indicator.x,
							y: indicator.y,
							width: indicator.width,
							height: indicator.height,
						}}
						transition={LOCALE_INDICATOR_SPRING}
					/>
				)}

				{languagesAvailable.map((lang) => {
					const isActive = currentLocale === lang.prefix
					const tabIndex = isActive ? -1 : undefined

					return (
						<button
							type="button"
							key={lang.prefix}
							ref={(el) => {
								itemRefs.current[lang.prefix] = el ?? undefined
							}}
							tabIndex={tabIndex}
							className={cn(
								'group squircle-rounded relative z-10 flex size-8 items-center justify-center rounded-xl transition-[background-color,box-shadow,transform] duration-200 ease-out outline-none select-none',
								isActive && 'pointer-events-none',
								!isActive &&
									'cursor-pointer hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/10 active:scale-95 dark:hover:bg-white/5 dark:focus-visible:ring-white/30',
							)}
							onClick={() => handleChangeLocale(lang.prefix)}
						>
							<abbr
								title={lang.title}
								className={cn(
									'text-sm font-semibold no-underline transition-colors duration-200 ease-out',
									isActive
										? 'text-black dark:text-white'
										: 'text-black/60 group-hover:text-black dark:text-white/60 dark:group-hover:text-white',
								)}
							>
								{lang.acronym}
							</abbr>
						</button>
					)
				})}
			</div>
		</nav>
	)
}
