import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'

import { LINKS } from '@/config/links'

const BUTTON_PROPS = {
	as: 'a',
	target: '_blank',
	size: 'lg',
	variant: 'outline',
	icon: true,
} as const

export const HERO_BUTTONS = [
	{
		href: LINKS.linkedIn,
		labelKey: 'linkedin',
		Icon: IconBrandLinkedin,
		...BUTTON_PROPS,
	},
	{
		href: LINKS.github,
		labelKey: 'github',
		Icon: IconBrandGithub,
		...BUTTON_PROPS,
	},
]
