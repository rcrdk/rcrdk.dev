import { SKILLS_LIST, type SkillItem } from '@/data/skills'
import type { HistoryProject } from '@/types/history'

export const getProjectSkills = (project: HistoryProject): SkillItem[] => {
	if (!project?.stack?.length) return []

	const projectSkills = SKILLS_LIST.filter((skill) => project.stack.includes(skill.title))

	return projectSkills
}
