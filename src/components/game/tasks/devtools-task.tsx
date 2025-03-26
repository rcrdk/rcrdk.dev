'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

export function DevToolsGameTaskButton() {
	const { onCompleteTask } = useGame()
	const __ = useTranslations('Default')

	return (
		<Button variant="outline" size="xs" className="text-sm font-semibold" onClick={() => onCompleteTask('dev-tools')}>
			{__('game.taskButtons.devTools')}
		</Button>
	)
}
