import type { HistoryItem } from '@/types/history'

export const toHistoryItems = (value: unknown): HistoryItem[] => (Array.isArray(value) ? value : [])
