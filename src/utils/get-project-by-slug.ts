import { PROJECTS } from '@/data/projects'
import type { HistoryProject } from '@/types/history'

export const getProjectBySlug = (projectSlug: string): HistoryProject | undefined =>
	PROJECTS.find((project) => project.slug === projectSlug)
