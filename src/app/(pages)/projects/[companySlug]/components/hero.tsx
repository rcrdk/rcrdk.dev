'use client'

import { useState } from 'react'
import { IconBrandLinkedin, IconCirclePlus, IconExternalLink } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { Container } from '@/components/ui/container'
import { Image } from '@/components/ui/image'
import { useHistoryItemBySlug } from '@/hooks/use-history-item-by-slug'

export const BUTTON_PROPS = {
	as: 'a',
	target: '_blank',
	rel: 'noopener noreferrer',
	variant: 'outline',
	size: 'base',
	icon: true,
	haptic: true,
	className: 'max-sm:w-auto max-sm:flex-1',
} as const

interface Props {
	companySlug: string
}

export function CompanyProjectsHero({ companySlug }: Readonly<Props>) {
	const [isOpen, setIsOpen] = useState(false)
	const historyItem = useHistoryItemBySlug(companySlug)
	const __ = useTranslations('Default')

	if (!historyItem) return null

	return (
		<div className="squircle-rounded rounded-2xl py-[9vw] lg:my-[3vw] lg:bg-black/4 lg:py-[3vw]">
			<Container sideSpacing="base" className="max-lg:!px-0">
				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
					<div className="xs:gap-8 flex flex-col items-center gap-4 sm:flex-row">
						<div className="squircle-rounded xs:size-30 relative size-26 shrink-0 overflow-hidden rounded-2xl shadow 2xl:size-24">
							<Image src={historyItem.companyLogo} alt={historyItem.companyLogoAlt} width={120} height={120} />
						</div>

						<div className="flex flex-col gap-2 text-center sm:text-left">
							<h1 className="font-heading text-3xl leading-none font-bold tracking-tight text-balance lg:text-4xl">
								{historyItem.title}
							</h1>

							<p className="xs:text-lg text-base leading-tight text-pretty text-black/50 dark:text-white/50">
								{historyItem.location} • {historyItem.remoteOrPresencial} • {historyItem.timeRange}
							</p>
						</div>
					</div>

					<div className="flex gap-2">
						<Button {...BUTTON_PROPS} as="button" title={__('company.readMore')} onClick={() => setIsOpen(!isOpen)}>
							<IconCirclePlus aria-hidden />
							<span className="sm:hidden">{__('company.readMore')}</span>
						</Button>

						<Button {...BUTTON_PROPS} href={historyItem.companyWebsiteUrl} title={__('company.websiteTitle')}>
							<IconExternalLink aria-hidden />
							<span className="sm:hidden">{__('company.site')}</span>
						</Button>

						<Button {...BUTTON_PROPS} href={historyItem.companyLinkedinUrl} title={__('company.linkedinTitle')}>
							<IconBrandLinkedin aria-hidden />
							<span className="sm:hidden">{__('company.linkedin')}</span>
						</Button>
					</div>
				</div>

				<Collapsible open={isOpen} onOpenChange={setIsOpen}>
					<CollapsibleContent>
						<ul className="mt-6 list-disc space-y-1.5 pl-4 text-base text-pretty sm:mt-8 sm:text-lg">
							{historyItem.description.map((description) => (
								<li key={description} dangerouslySetInnerHTML={{ __html: description }} />
							))}
						</ul>
					</CollapsibleContent>
				</Collapsible>
			</Container>
		</div>
	)
}
