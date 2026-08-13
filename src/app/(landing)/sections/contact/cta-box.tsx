'use client'

import { IconBrandLinkedin, IconFileDescription } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { LINKS } from '@/config/links'
import { DEFAULT_BUTTON_PROPS } from '@/constants/contact'

export function ContactCtaBox() {
	const __ = useTranslations('Contact')

	return (
		<div className="squircle-rounded flex items-center gap-6 rounded-2xl bg-black/5 p-5 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4 sm:mt-16 dark:bg-white/10">
			<p className="xs:text-start text-content-light/75 dark:text-content-dark/75 grow text-center text-[15px] text-balance">
				{__('box.text')}
			</p>

			<div className="xs:w-auto flex w-full gap-2">
				<Button
					{...DEFAULT_BUTTON_PROPS}
					href={LINKS.linkedIn}
					analytics={{ name: ANALYTICS_EVENTS.linkedinProfileClick, data: { section: 'contact' } }}
				>
					<IconBrandLinkedin aria-hidden />
					<span className="font-semibold">{__('box.button.linkedin')}</span>
				</Button>

				<Button
					{...DEFAULT_BUTTON_PROPS}
					href={LINKS.resume}
					analytics={{ name: ANALYTICS_EVENTS.resumeClick, data: { section: 'contact' } }}
				>
					<IconFileDescription aria-hidden />
					<span className="font-semibold">{__('box.button.cv')}</span>
				</Button>
			</div>
		</div>
	)
}
