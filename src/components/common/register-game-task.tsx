'use client'

import { useEffect } from 'react'

import { GameTaskTypes } from '@/data/game-tasks'
import { useGame } from '@/hooks/use-game'

type Props = {
	taskId: GameTaskTypes
}

export function RegisterGameTask({ taskId }: Props) {
	'use client'

	const { onCompleteTask } = useGame()

	useEffect(() => {
		onCompleteTask(taskId)
	}, [onCompleteTask, taskId])

	return null
}
