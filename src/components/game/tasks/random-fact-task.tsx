'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

export function RandomFactGameTaskButton() {
	const { onCompleteTask } = useGame()
	const __ = useTranslations('Default')

	const handleCompleteTask = () => onCompleteTask('random-fact')

	return (
		<Button variant="outline" size="xs" className="text-sm font-semibold" onClick={handleCompleteTask}>
			{__('game.taskButtons.randomFact')}
		</Button>
	)
}
