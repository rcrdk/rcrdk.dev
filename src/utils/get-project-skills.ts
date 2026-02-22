import { SKILLS_LIST, type SkillItem } from '@/data/skills'
import type { HistoryProject } from '@/types/history'

export function getProjectSkills(project: HistoryProject): SkillItem[] {
	if (!project?.stack?.length) return []
	return SKILLS_LIST.filter((skill) => project.stack.includes(skill.title))
}
