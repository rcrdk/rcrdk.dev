'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

export function TetrisGameTaskButton() {
	const __ = useTranslations('Game')

	const { onShowGameTetris } = useGame()

	return (
		<Button variant="outline" size="xs" className="text-sm font-semibold" onClick={onShowGameTetris}>
			{__('taskButtons.tetris')}
		</Button>
	)
}
