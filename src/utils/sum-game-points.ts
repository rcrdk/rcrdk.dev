import type { GameTaskTypes } from '@/data/game-tasks'
import { GAME_TASKS } from '@/data/game-tasks'

export const sumGamePoints = (tasksCompleted?: GameTaskTypes[]): number => {
	const tasks = tasksCompleted ? GAME_TASKS.filter((task) => tasksCompleted.includes(task.id)) : GAME_TASKS
	const points = tasks.reduce((previous, current) => previous + current.points, 0)

	return points
}
