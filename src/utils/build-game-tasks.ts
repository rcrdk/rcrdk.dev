import type { GameTaskTypes } from '@/data/game-tasks'
import { GAME_TASKS } from '@/data/game-tasks'
import type { LocalesType } from '@/i18n/config'
import type { GameTaskUser } from '@/types/game'

type BuildGameTasksParams = {
	locale: LocalesType
	tasksCompleted: GameTaskTypes[]
}

export const buildGameTasks = ({ locale, tasksCompleted }: BuildGameTasksParams): GameTaskUser[] =>
	GAME_TASKS.map((task) => ({
		id: task.id,
		icon: task.icon,
		listItem: {
			title: task.listItem.title[locale],
			hint: task.listItem.hint[locale],
		},
		toastItem: {
			title: task.toastItem.title[locale],
			hint: task.toastItem.hint[locale],
		},
		points: task.points,
		completed: tasksCompleted.includes(task.id),
		button: task.button,
	}))
