'use client'

import { IconBrandBehance, IconBrandGithub, IconExternalLink, IconPlayerPlay } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import type { HistoryProject } from '@/types/history'

const BASE_BUTTON_PROPS = {
	as: 'a',
	variant: 'outline',
	icon: true,
	target: '_blank',
	rel: 'noopener noreferrer',
	haptic: true,
} as const

const LINK_KEYS = ['website', 'github', 'behance', 'video'] as const

const LINK_ICONS = {
	website: IconExternalLink,
	github: IconBrandGithub,
	behance: IconBrandBehance,
	video: IconPlayerPlay,
}

type ProjectLinksMap = HistoryProject['links']

export const hasProjectLinks = (links: ProjectLinksMap) => LINK_KEYS.some((key) => Boolean(links[key]))

interface ProjectLinksProps {
	links: ProjectLinksMap
	size: 'xs' | 'sm'
	slug?: string
}

export function ProjectLinks({ links, size, slug }: Readonly<ProjectLinksProps>) {
	const __ = useTranslations('Project')

	return (
		<div className="flex gap-2">
			{LINK_KEYS.map((key) => {
				const href = links[key]
				if (!href) return null

				const Icon = LINK_ICONS[key]
				const analytics = slug ? { name: ANALYTICS_EVENTS.projectLinkClick, data: { type: key, slug } } : undefined

				return (
					<Button key={key} {...BASE_BUTTON_PROPS} size={size} href={href} title={__(key)} analytics={analytics}>
						<Icon aria-hidden />
					</Button>
				)
			})}
		</div>
	)
}
