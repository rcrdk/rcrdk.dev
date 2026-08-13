'use client'

import { IconVolume } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

const SOUND_NOTE_ID = 'game-sound-note'

interface GameOptInProps {
	onActivateGame: VoidFunction
}

export function GameOptIn({ onActivateGame }: Readonly<GameOptInProps>) {
	const __ = useTranslations('Game')

	return (
		<>
			<Button
				variant="outline-warning"
				className="mt-8 mb-6 w-full font-semibold"
				onClick={onActivateGame}
				aria-describedby={SOUND_NOTE_ID}
				haptic
			>
				<span className="text-2xl">🤠</span>
				{__('optIn.button')}
			</Button>

			<p id={SOUND_NOTE_ID} className="flex items-center justify-center gap-1 text-sm opacity-50 dark:opacity-80">
				<IconVolume className="stroke-1" aria-hidden />
				{__('optIn.sound')}
			</p>
		</>
	)
}
