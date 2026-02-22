'use client'

import { useRef } from 'react'
import { IconCircleArrowDown } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { HeroAboutDrawer } from '@/app/[locale]/sections/hero/about-drawer'
import { AnimatedContent } from '@/components/animated/animated-content'
import { AnimatedSplitText } from '@/components/animated/animated-split-text'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { FULL_DATES } from '@/config/dates'
import { HERO_BUTTONS } from '@/constants/hero'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { yearsFromThen } from '@/lib/dayjs'
import { scrollToSection } from '@/utils/scroll-to-section'

export function Hero() {
	const ref = useRef<HTMLDivElement>(null)
	const canDelayAnimations = useIntersectionObserver(ref, { threshold: 1 })

	const __ = useTranslations('Hero')

	const descriptionDelay = canDelayAnimations ? 500 : 0
	const buttonsDelay = canDelayAnimations ? 750 : 0

	const descriptionHTML = __.raw('text').replace('{years}', yearsFromThen(FULL_DATES.careerBirthday))

	return (
		<Section>
			<div ref={ref}>
				<h1>
					<AnimatedSplitText
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
					<div className="layout:pt-14 flex flex-col justify-between gap-4 pt-12 sm:gap-0 sm:pt-18 lg:flex-row">
						<div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-2 lg:grow lg:gap-4">
							<Button
								as="a"
								href="#experiences"
								variant="solid"
								size="lg"
								onClick={(e) => scrollToSection(e, '#experiences')}
								className="grow"
							>
								<IconCircleArrowDown aria-hidden />
								<span className="font-medium">{__('buttons.scroll')}</span>
							</Button>

							<div className="hidden grow sm:flex">
								<HeroAboutDrawer />
							</div>
						</div>

						<hr className="mx-8 my-4 hidden w-full grow self-center border-t border-black/15 lg:block dark:border-white/20" />

						<ul className="flex gap-2 sm:mt-10 sm:gap-3 lg:mt-0">
							<li className="hidden grow self-center pe-2 sm:block lg:hidden">
								<hr className="block w-full grow self-center border-t border-black/15 dark:border-white/20" />
							</li>

							<li className="flex grow sm:hidden">
								<HeroAboutDrawer />
							</li>

							{HERO_BUTTONS.map(({ labelKey, href, Icon, ...buttonProps }) => (
								<li key={labelKey}>
									<Button href={href} aria-label={__(`buttons.${labelKey}`)} {...buttonProps}>
										<Icon aria-hidden />
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
