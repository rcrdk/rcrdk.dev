import { IconDeviceGamepad2 } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

export function Game() {
	const { onShowGameModal } = useGame()
	const __ = useTranslations('Default')

	return (
		<div className="layout:flex relative mt-2 hidden">
			<div className="animate-glowing-rotate absolute inset-0 -z-10 block bg-[linear-gradient(45deg,_#ff0000,_#ff7300,_#fffb00,_#48ff00,_#00ffd5,_#002bff,_#7a00ff,_#ff00c8,_#ff0000)] [background-size:400%] blur-md" />

			<Button
				variant="glowing"
				className="relative z-10"
				icon
				aria-label={__('game.title')}
				onClick={() => onShowGameModal()}
			>
				<IconDeviceGamepad2 />
			</Button>
		</div>
	)
}
