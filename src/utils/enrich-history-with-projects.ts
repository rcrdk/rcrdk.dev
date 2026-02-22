import type { HistoryItem, HistoryProject } from '@/types/history'

export function enrichHistoryWithProjects(list: HistoryItem[], projects: HistoryProject[]): HistoryItem[] {
	return list.map((item) => ({
		...item,
		projects: projects.filter((project) => project.companyId === item.id),
	}))
}
