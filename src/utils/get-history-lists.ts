import type { LocalesType } from '@/i18n/config'
import { loadMessages } from '@/i18n/load-messages'
import type { HistoryItem } from '@/types/history'
import { toHistoryItems } from '@/utils/to-history-items'

const getNamespaceList = (namespace: unknown): HistoryItem[] => {
	if (typeof namespace !== 'object' || !namespace || !('list' in namespace)) return []

	return toHistoryItems(namespace.list)
}

export const getHistoryLists = async (locale: LocalesType): Promise<HistoryItem[]> => {
	const messages = await loadMessages(locale)
	const experiences = getNamespaceList(messages.Experiences)
	const education = getNamespaceList(messages.Education)

	return [...experiences, ...education]
}
