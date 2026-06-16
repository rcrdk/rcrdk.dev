import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'

import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { LINKS } from '@/config/links'

const BUTTON_PROPS = {
	as: 'a',
	target: '_blank',
	size: 'lg',
	variant: 'outline',
	icon: true,
	haptic: true,
} as const

export const HERO_BUTTONS = [
	{
		href: LINKS.linkedIn,
		labelKey: 'linkedin',
		Icon: IconBrandLinkedin,
		analytics: { name: ANALYTICS_EVENTS.socialLinkClick, data: { platform: 'linkedin', section: 'hero' } },
		...BUTTON_PROPS,
	},
	{
		href: LINKS.github,
		labelKey: 'github',
		Icon: IconBrandGithub,
		analytics: { name: ANALYTICS_EVENTS.socialLinkClick, data: { platform: 'github', section: 'hero' } },
		...BUTTON_PROPS,
	},
]
