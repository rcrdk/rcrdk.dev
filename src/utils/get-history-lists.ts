import type { LocalesType } from '@/i18n/config'
import type { HistoryItem } from '@/types/history'

export const getHistoryLists = async (locale: LocalesType): Promise<HistoryItem[]> => {
	const experiences = (await import(`@/i18n/${locale}/experiences.json`)).default.Experiences.list as HistoryItem[]
	const education = (await import(`@/i18n/${locale}/education.json`)).default.Education.list as HistoryItem[]

	return [...experiences, ...education]
}
