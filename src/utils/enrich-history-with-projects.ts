import type { HistoryItem, HistoryProject } from '@/types/history'

export const enrichHistoryWithProjects = (list: HistoryItem[], projects: HistoryProject[]): HistoryItem[] =>
	list.map((item) => ({
		...item,
		projects: projects.filter((project) => project.companySlug === item.slug),
	}))
