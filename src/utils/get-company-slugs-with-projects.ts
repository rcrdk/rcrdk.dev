import { PROJECTS } from '@/data/projects'

export const getCompanySlugsWithProjects = (): string[] => [...new Set(PROJECTS.map((project) => project.companySlug))]
