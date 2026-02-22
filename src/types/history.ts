import type { CSSProperties } from 'react'

import type { ATTRIBUTIONS_TYPE, ROLES_KEYS_TYPE } from '@/data/attributions'
import type { SkillsKeys } from '@/data/skills'
import type { LocalesType } from '@/i18n/routing'

export type HistoryGalleryItem = {
	url: string
	format: 'desktop' | 'mobile'
}

export type HistoryItem = {
	id: string
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

type HistoryProjectTranslatedObject = {
	title: string
	description: string
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
	companyId: string
	categories: string[]
	image: string | null
	links: HistoryProjectLinks
	stack: SkillsKeys[]
	year: number | string
	gallery: HistoryGalleryItem[]
	attributions: HistoryProjectAttribution[]
	handler?: {
		backgroundColor: CSSProperties['backgroundColor']
		opacity: CSSProperties['opacity']
	}
}
