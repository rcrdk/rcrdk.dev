'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

export function DevToolsGameTaskButton() {
	const { onCompleteTask } = useGame()
	const __ = useTranslations('Game')

	return (
		<Button
			variant="outline"
			size="xs"
			className="text-sm font-semibold"
			onClick={() => onCompleteTask('dev-tools')}
			haptic
		>
			{__('taskButtons.devTools')}
		</Button>
	)
}
