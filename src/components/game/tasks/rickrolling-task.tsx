'use client'

import { useRef, useState } from 'react'
import { IconMicrophone } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'
import { env } from '@/lib/env'

type Props = {
	onShowAnimated: React.Dispatch<React.SetStateAction<boolean>>
}

export function RickRollingGameTaskButton({ onShowAnimated }: Props) {
	const ref = useRef<HTMLAudioElement>(null)
	const __ = useTranslations('Default')

	const [playing, setPlaying] = useState(false)

	const { onCompleteTask } = useGame()

	function handlePlaySong() {
		if (!ref.current) return

		setPlaying(true)
		onShowAnimated(true)

		ref.current.play()
	}

	function handleEnded() {
		if (!ref.current) return

		setPlaying(false)
		onShowAnimated(false)
		onCompleteTask('rick-rolling')

		ref.current.currentTime = 0
	}

	return (
		<>
			<Button
				onClick={handlePlaySong}
				variant="outline"
				size="lg"
				disabled={playing}
				className={
					playing
						? '!border-accent-blue pointer-events-none relative overflow-hidden border-2 bg-white dark:bg-black'
						: ''
				}
				icon
				aria-label={__('game.rickRolling')}
			>
				{playing ? (
					<div className="flex items-center">
						<div className="animate-wave bg-accent-blue mx-[2px] h-2 w-[3px] rounded-xl [animation-delay:-0.4s]" />
						<div className="animate-wave bg-accent-blue mx-[2px] h-3 w-[3px] rounded-xl [animation-delay:-0.2s]" />
						<div className="animate-wave bg-accent-blue mx-[2px] h-4 w-[3px] rounded-xl" />

						<div className="animate-rick-roll bg-accent-blue/25 absolute inset-y-0 left-0 w-full" />
					</div>
				) : (
					<IconMicrophone className="size-8" strokeWidth={1.5} aria-hidden />
				)}
			</Button>

			<audio src={`${env.NEXT_PUBLIC_APP_URL}/audio/rick-roll.mp3`} onEnded={handleEnded} ref={ref} />
		</>
	)
}
