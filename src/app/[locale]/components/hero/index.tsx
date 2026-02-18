'use client'

import { useEffect, useRef, useState } from 'react'
import { IconBrandGithub, IconBrandLinkedin, IconCircleArrowDown } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import AnimatedContent from '@/components/animated/animated-content'
import SplitText from '@/components/animated/split-text'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { FULL_DATES } from '@/config/dates'
import { LINKS } from '@/config/links'
import { yearsFromThen } from '@/lib/dayjs'
import { scrollToSection } from '@/utils/scroll-to-section'

const buttonLinkProps = {
	as: 'a',
	target: '_blank',
	size: 'lg',
	variant: 'outline',
	icon: true,
} as const

const BUTTONS = [
	{
		href: LINKS.linkedIn,
		labelKey: 'linkedin',
		icon: IconBrandLinkedin,
	},
	{
		href: LINKS.github,
		labelKey: 'github',
		icon: IconBrandGithub,
	},
]

export function Hero() {
	const [canDelayAnimations, setCanDelayAnimations] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const __ = useTranslations('Hero')

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

	const descriptionDelay = canDelayAnimations ? 500 : 0
	const buttonsDelay = canDelayAnimations ? 750 : 0

	const descriptionHTML = __.raw('text').replace('{years}', yearsFromThen(FULL_DATES.careerBirthday))

	return (
		<Section>
			<div ref={ref}>
				<h1>
					<SplitText
						text={__('title')}
						delay={50}
						breakWords
						className="font-heading xs:leading-[0.85] layout:text-8xl block max-w-1/2 text-[19vw] leading-[16vw] font-black tracking-tight sm:text-8xl md:max-w-full md:text-9xl dark:text-white"
					/>
				</h1>

				<div className="layout:mt-9 mt-8 sm:mt-16">
					<AnimatedContent delay={descriptionDelay}>
						<p
							className="xs:text-lg text-md xs:leading-loose leading-[1.8] text-pretty md:pl-40"
							dangerouslySetInnerHTML={{ __html: descriptionHTML }}
						/>
					</AnimatedContent>
				</div>

				<AnimatedContent delay={buttonsDelay}>
					<div className="layout:pt-14 flex justify-between gap-4 pt-12 sm:gap-0 sm:pt-18">
						<Button
							as="a"
							href="#about"
							variant="solid"
							size="lg"
							onClick={(e) => scrollToSection(e, '#about')}
							className="grow sm:grow-0"
							aria-controls="about"
						>
							<IconCircleArrowDown className="size-7" strokeWidth={1.5} aria-hidden />
							<span className="hidden font-medium sm:block">{__('buttons.aboutLong')}</span>
							<span className="font-medium sm:hidden">{__('buttons.aboutShort')}</span>
						</Button>

						<hr className="mx-8 hidden grow self-center border-t border-black/25 sm:block dark:border-white/20" />

						<ul className="flex gap-2 sm:gap-3">
							{BUTTONS.map((button) => (
								<li key={button.labelKey}>
									<Button {...buttonLinkProps} href={button.href} aria-label={__(`buttons.${button.labelKey}`)}>
										<button.icon className="size-8" strokeWidth={1.5} aria-hidden />
									</Button>
								</li>
							))}
						</ul>
					</div>
				</AnimatedContent>
			</div>
		</Section>
	)
}
