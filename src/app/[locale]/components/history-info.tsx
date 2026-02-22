import { IconBrandLinkedin, IconExternalLink } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import type { HistoryItem } from '@/types/history'

interface Props {
	data: HistoryItem
}

const defaultButtonProps = {
	as: 'a',
	target: '_blank',
	rel: 'noopener noreferrer',
	variant: 'outline',
	size: 'sm',
	icon: true,
	className: 'max-sm:grow',
} as const

export function HistoryCommonInfo({ data }: Readonly<Props>) {
	const __ = useTranslations('Default')

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row">
				<div className="flex grow gap-4">
					<div className="squircle-rounded layout:size-13 layout-sm:text-15 relative size-15 shrink-0 self-start overflow-hidden rounded-2xl shadow">
						<Image src={data.companyLogo} alt={data.companyLogoAlt} width={120} height={120} />
					</div>

					<div className="flex flex-col gap-1 self-center">
						<h3 className="layout:text-text-base layout-sm:text-lg text-lg leading-tight font-semibold text-balance">
							{data.title}
						</h3>
						<p className="text-sm leading-tight text-pretty text-black/50 dark:text-white/50">
							{data.location} • {data.remoteOrPresencial} • {data.timeRange}
						</p>
					</div>
				</div>

				<div className="flex gap-2">
					<Button {...defaultButtonProps} href={data.companyWebsiteUrl} title={__('company.websiteTitle')}>
						<IconExternalLink aria-hidden />
						<span className="sm:hidden">{__('company.site')}</span>
					</Button>

					<Button {...defaultButtonProps} href={data.companyLinkedinUrl} title={__('company.linkedinTitle')}>
						<IconBrandLinkedin aria-hidden />
						<span className="sm:hidden">{__('company.linkedin')}</span>
					</Button>
				</div>
			</div>

			<ul className="layout:text-[0.9375rem] layout-sm:text-base list-disc space-y-1.5 pl-4 text-pretty sm:space-y-0">
				{data.description.map((description) => (
					<li key={description} dangerouslySetInnerHTML={{ __html: description }} />
				))}
			</ul>
		</>
	)
}
