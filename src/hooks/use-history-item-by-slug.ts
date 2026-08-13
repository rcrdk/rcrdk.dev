'use client'

import { useMemo } from 'react'
import { useMessages } from 'next-intl'

import type { HistoryItem } from '@/types/history'
import { toHistoryItems } from '@/utils'

const getNamespaceList = (namespace: unknown): HistoryItem[] => {
	if (typeof namespace !== 'object' || !namespace || !('list' in namespace)) return []

	return toHistoryItems(namespace.list)
}

export function useHistoryItemBySlug(companySlug: string): HistoryItem | undefined {
	const messages = useMessages()

	return useMemo(() => {
		const experiences = getNamespaceList(messages.Experiences)
		const education = getNamespaceList(messages.Education)
		const historyItem = [...experiences, ...education].find((item) => item.slug === companySlug)

		return historyItem
	}, [messages, companySlug])
}
