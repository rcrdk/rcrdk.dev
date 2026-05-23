import {
	IconBrandBehance,
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandSpotify,
} from '@tabler/icons-react'

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
	{ href: LINKS.linkedIn, labelKey: 'linkedin', Icon: IconBrandLinkedin },
	{ href: LINKS.github, labelKey: 'github', Icon: IconBrandGithub },
	{ href: LINKS.behance, labelKey: 'behance', Icon: IconBrandBehance },
	{ href: LINKS.discord, labelKey: 'discord', Icon: IconBrandDiscord },
	{ href: LINKS.spotify, labelKey: 'spotify', Icon: IconBrandSpotify },
]
