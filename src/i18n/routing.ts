import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['pt-br', 'en'],
	defaultLocale: 'en',
})

export type LocalesType = (typeof routing.locales)[number]

export const { Link } = createNavigation(routing)
