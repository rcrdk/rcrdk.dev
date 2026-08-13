import { z } from 'zod'

import { GAME_TASKS, type GameTaskTypes } from '@/data/game-tasks'

const GAME_TASK_IDS = new Set<string>(GAME_TASKS.map((task) => task.id))

const isGameTaskType = (value: string): value is GameTaskTypes => GAME_TASK_IDS.has(value)

export const gameTasksCompletedSchema = z.array(z.string()).transform((tasks) => tasks.filter(isGameTaskType))
