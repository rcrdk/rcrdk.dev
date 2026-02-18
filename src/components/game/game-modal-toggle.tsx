import { IconDeviceGamepad2, IconTrophy } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

export function GameModalToggle() {
	const { onShowGameModal, isGameCompleted } = useGame()
	const __ = useTranslations('Game')

	return (
		<div className="layout:flex relative mt-2 hidden">
			<div className="animate-glowing-rotate game-gradient absolute inset-0 -z-10 block [background-size:400%] blur-md" />

			<Button variant="glowing" className="relative z-10" icon aria-label={__('title')} onClick={onShowGameModal}>
				{isGameCompleted && <IconTrophy aria-hidden />}
				{!isGameCompleted && <IconDeviceGamepad2 aria-hidden />}
			</Button>
		</div>
	)
}
