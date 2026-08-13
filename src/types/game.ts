import type { ReactNode } from 'react'

import type { GameTaskTypes } from '@/data/game-tasks'

export interface GameTaskUser {
	id: GameTaskTypes
	icon: string
	listItem: { title: string; hint: string }
	toastItem: { title: string; hint: string }
	points: number
	completed: boolean
	button?: ReactNode
}
