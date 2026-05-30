import type { LocalesType } from '@/i18n/config'
import { loadMessages } from '@/i18n/load-messages'
import type { HistoryItem } from '@/types/history'

export const getHistoryLists = async (locale: LocalesType): Promise<HistoryItem[]> => {
	const messages = await loadMessages(locale)
	const experiences = (messages.Experiences as unknown as { list: HistoryItem[] }).list
	const education = (messages.Education as unknown as { list: HistoryItem[] }).list

	return [...experiences, ...education]
}
