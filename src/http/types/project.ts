import { LocalesType } from '@/i18n/routing'

export type ProjectFilters = 'highlights' | 'web_app' | 'website' | 'landing_page' | 'ecommerce' | 'mobile_app' | 'api'

export type ProjectDTO = {
	id: number
	title: string
	image: string | null
	categories: string[]
	roles: string[]
	behance: string | null
	github: string | null
	website: string | null
	highlighted: boolean
	stack: string[]
	year: number
	designer: string | null
	employer: string | null
	intro: Record<LocalesType, string>
	description: Record<LocalesType, string>
}

export type ProjectWithLocaleDTO = {
	id: number
	title: string
	image: string | null
	categories: string[]
	roles: string[]
	behance: string | null
	github: string | null
	website: string | null
	highlighted: boolean
	stack: string[]
	year: number
	designer: string | null
	employer: string | null
	intro: string
	description: string
}
