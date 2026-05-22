import { PROJECTS } from '@/data/projects'

export const getAllProjectSlugs = (): string[] => PROJECTS.map((project) => project.slug)
