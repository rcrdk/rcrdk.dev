import type { GameTaskTypes } from '@/data/game-tasks'
import { GAME_TASKS } from '@/data/game-tasks'

const sumPoints = (tasks: typeof GAME_TASKS) => tasks.reduce((previous, current) => previous + current.points, 0)

export const sumGamePoints = (tasksCompleted: GameTaskTypes[]): number => {
	const completedTasks = GAME_TASKS.filter((task) => tasksCompleted.includes(task.id))
	const points = sumPoints(completedTasks)

	return points
}

export const getTotalGamePoints = (): number => sumPoints(GAME_TASKS)
