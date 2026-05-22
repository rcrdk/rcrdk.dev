'use client'

import { IconBrandLinkedin, IconExternalLink } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Image } from '@/components/ui/image'
import { useHistoryItemBySlug } from '@/hooks/use-history-item-by-slug'

interface Props {
	companySlug: string
}

const buttonProps = {
	as: 'a',
	target: '_blank',
	rel: 'noopener noreferrer',
	variant: 'outline',
	size: 'base',
	icon: true,
	haptic: true,
	className: 'max-sm:w-auto max-sm:flex-1',
} as const

export function CompanyProjectsHero({ companySlug }: Readonly<Props>) {
	const historyItem = useHistoryItemBySlug(companySlug)
	const __ = useTranslations('Default')

	if (!historyItem) return null

	return (
		<div className="squircle-rounded rounded-2xl py-[9vw] lg:my-[3vw] lg:bg-black/4 lg:py-[3vw]">
			<Container sideSpacing="base" className="max-lg:!px-0">
				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
					<div className="flex flex-col items-center gap-8 sm:flex-row">
						<div className="squircle-rounded relative size-30 shrink-0 overflow-hidden rounded-2xl shadow 2xl:size-24">
							<Image src={historyItem.companyLogo} alt={historyItem.companyLogoAlt} width={120} height={120} />
						</div>

						<div className="flex flex-col gap-2 text-center sm:text-left">
							<h1 className="font-heading text-3xl font-bold tracking-tight text-balance lg:text-4xl">
								{historyItem.title}
							</h1>

							<p className="text-lg leading-tight text-pretty text-black/50 dark:text-white/50">
								{historyItem.location} • {historyItem.remoteOrPresencial} • {historyItem.timeRange}
							</p>
						</div>
					</div>

					<div className="flex gap-2">
						<Button {...buttonProps} href={historyItem.companyWebsiteUrl} title={__('company.websiteTitle')}>
							<IconExternalLink aria-hidden />
							<span className="sm:hidden">{__('company.site')}</span>
						</Button>

						<Button {...buttonProps} href={historyItem.companyLinkedinUrl} title={__('company.linkedinTitle')}>
							<IconBrandLinkedin aria-hidden />
							<span className="sm:hidden">{__('company.linkedin')}</span>
						</Button>
					</div>
				</div>

				<ul className="mt-6 list-disc space-y-1.5 pl-4 text-base text-pretty sm:mt-8 sm:text-lg">
					{historyItem.description.map((description) => (
						<li key={description} dangerouslySetInnerHTML={{ __html: description }} />
					))}
				</ul>
			</Container>
		</div>
	)
}
