import type { ATTRIBUTIONS_TYPE, ROLES_KEYS_TYPE } from '@/data/attributions'
import type { SkillsKeys } from '@/data/skills'
import type { LocalesType } from '@/i18n/config'

export type HistoryGalleryItem = {
	url: string
	format: 'desktop' | 'mobile'
}

export type HistoryItem = {
	id: string
	slug: string
	title: string
	timeRange: string
	location: string
	remoteOrPresencial: string
	description: string[]
	companyWebsiteUrl: string
	companyLinkedinUrl: string
	companyLogo: string
	companyLogoAlt: string
	projects: HistoryProject[]
}

export type HistoryProjectDescription = string | { type: 'title' | 'text'; value: string }[]

type HistoryProjectTranslatedObject = {
	title: string
	description: HistoryProjectDescription
}

type TranslatedRecord = Record<LocalesType, HistoryProjectTranslatedObject>

type HistoryProjectLinks = {
	behance: string | null
	github: string | null
	website: string | null
}

export type HistoryProjectAttribution = {
	id: ATTRIBUTIONS_TYPE
	roles: ROLES_KEYS_TYPE[]
}

export type HistoryProject = TranslatedRecord & {
	id: string
	slug: string
	companySlug: string
	categories: string[]
	image: string | null
	links: HistoryProjectLinks
	stack: SkillsKeys[]
	year: number | string
	gallery: HistoryGalleryItem[]
	attributions: HistoryProjectAttribution[]
}
