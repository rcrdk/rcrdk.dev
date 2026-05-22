'use client'

import { useMemo } from 'react'
import { useMessages } from 'next-intl'

import type { HistoryItem } from '@/types/history'

type HistoryMessages = {
	Experiences?: { list: HistoryItem[] }
	Education?: { list: HistoryItem[] }
}

export function useHistoryItemBySlug(companySlug: string): HistoryItem | undefined {
	const messages = useMessages() as HistoryMessages

	return useMemo(() => {
		const experiences = messages.Experiences?.list ?? []
		const education = messages.Education?.list ?? []

		return [...experiences, ...education].find((item) => item.slug === companySlug)
	}, [messages, companySlug])
}
