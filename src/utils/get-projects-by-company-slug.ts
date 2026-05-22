import { PROJECTS } from '@/data/projects'
import type { HistoryProject } from '@/types/history'

export const getProjectsByCompanySlug = (companySlug: string): HistoryProject[] =>
	PROJECTS.filter((project) => project.companySlug === companySlug)
