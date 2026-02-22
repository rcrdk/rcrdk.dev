import { ATTRIBUTIONS, ROLES } from '@/data/attributions'
import type { LocalesType } from '@/i18n/routing'
import type { HistoryProjectAttribution } from '@/types/history'

export type ProjectWithAttribution = {
	id: string
	name: string
	roles: string[]
	avatarUrl: string
	url: string
}

export const getProjectAttributions = (
	attributions: HistoryProjectAttribution[] | undefined,
	locale: LocalesType,
): ProjectWithAttribution[] => {
	if (!attributions) return []

	return attributions.map(({ id, roles }) => {
		const attribution = ATTRIBUTIONS[id]
		const rolesTranslated = roles.map((role) => ROLES[role][locale])

		return {
			id,
			name: attribution.name,
			avatarUrl: attribution.avatarUrl,
			url: attribution.url,
			roles: rolesTranslated,
		}
	})
}
