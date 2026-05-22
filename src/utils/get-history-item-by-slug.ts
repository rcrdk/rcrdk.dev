import type { LocalesType } from '@/i18n/config'
import type { HistoryItem } from '@/types/history'
import { getHistoryLists } from '@/utils/get-history-lists'

export const getHistoryItemBySlug = async (
	companySlug: string,
	locale: LocalesType,
): Promise<HistoryItem | undefined> => {
	const list = await getHistoryLists(locale)

	return list.find((item) => item.slug === companySlug)
}
