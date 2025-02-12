'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import AnimatedContent from '@/components/animated/animated-content'
import SplitText from '@/components/animated/split-text'
import { Section } from '@/components/ui/section'

export function Skills() {
	const [canDelayAnimations, setCanDelayAnimations] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const __ = useTranslations('Skills')
	const list = __.raw('list') as Record<string, string>[]

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setCanDelayAnimations(true)
					observer.unobserve(element)
				}
			},
			{ threshold: 1 },
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	return (
		<Section
			classNameCenter="max-xs:pt-9"
			className="layout:border-t-0 border-t-black/25 sm:border-t dark:border-t-white/20"
		>
			<div ref={ref}>
				<h2 className="layout:mb-8 mb-8 items-center sm:mb-12 lg:static lg:block lg:h-auto lg:pr-0">
					<SplitText
						text={__('title')}
						delay={50}
						className="font-heading layout:text-6xl block text-3xl font-black tracking-tight text-balance sm:text-4xl md:max-w-full dark:text-white"
					/>
				</h2>

				<div className="xs:gap-2 flex flex-col gap-4">
					{list.map((item, index) => (
						<AnimatedContent
							distance={125}
							rootMargin="0px 0px 125px"
							config={{ tension: 60, friction: 15 }}
							key={item.title}
							delay={canDelayAnimations ? (index + 1) * 50 : 0}
						>
							<p className="text-content-light/65 dark:text-content-dark/85 xs:text-md leading-[1.8] text-pretty sm:text-lg">
								<strong className="xs:inline text-content-light block font-semibold dark:text-white">
									{item.title}:
								</strong>{' '}
								{item.text}.
							</p>
						</AnimatedContent>
					))}
				</div>
			</div>
		</Section>
	)
}
