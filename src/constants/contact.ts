import {
	IconBrandBehance,
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandSpotify,
} from '@tabler/icons-react'

import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { LINKS } from '@/config/links'

export const EXTERNAL_BUTTON_LINK_PROPS = {
	as: 'a',
	target: '_blank',
	size: 'lg',
	variant: 'outline',
	icon: true,
} as const

export const DEFAULT_BUTTON_PROPS = {
	as: 'a',
	target: '_blank',
	size: 'sm',
	variant: 'outline',
	className: 'xs:grow-0 grow bg-transparent dark:bg-transparent',
	haptic: true,
} as const

export const BUTTONS = [
	{
		href: LINKS.linkedIn,
		labelKey: 'linkedin',
		Icon: IconBrandLinkedin,
		analytics: { name: ANALYTICS_EVENTS.socialLinkClick, data: { platform: 'linkedin' } },
	},
	{
		href: LINKS.github,
		labelKey: 'github',
		Icon: IconBrandGithub,
		analytics: { name: ANALYTICS_EVENTS.socialLinkClick, data: { platform: 'github' } },
	},
	{
		href: LINKS.behance,
		labelKey: 'behance',
		Icon: IconBrandBehance,
		analytics: { name: ANALYTICS_EVENTS.socialLinkClick, data: { platform: 'behance' } },
	},
	{
		href: LINKS.discord,
		labelKey: 'discord',
		Icon: IconBrandDiscord,
		analytics: { name: ANALYTICS_EVENTS.socialLinkClick, data: { platform: 'discord' } },
	},
	{
		href: LINKS.spotify,
		labelKey: 'spotify',
		Icon: IconBrandSpotify,
		analytics: { name: ANALYTICS_EVENTS.socialLinkClick, data: { platform: 'spotify' } },
	},
]
