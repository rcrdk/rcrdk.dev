'use client'

import { useRef, useState } from 'react'
import { IconMicrophone } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'
import { env } from '@/lib/env'
import { cn } from '@/utils/tailwind-cn'

interface RickRollingGameTaskButtonProps {
	onShowAnimated: React.Dispatch<React.SetStateAction<boolean>>
}

export function RickRollingGameTaskButton({ onShowAnimated }: Readonly<RickRollingGameTaskButtonProps>) {
	const ref = useRef<HTMLAudioElement>(null)
	const __ = useTranslations('Game')

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
			<div className={cn('inline-block origin-center', playing && 'animate-sound-pulse-scale')}>
				<Button
					onClick={handlePlaySong}
					variant="outline"
					size="lg"
					disabled={playing}
					className={cn(
						playing &&
							'animate-sound-pulse pointer-events-none relative overflow-hidden border-2 border-black bg-black',
					)}
					icon
					aria-label={__('rickRolling')}
					haptic
				>
					{playing && (
						<div className="flex items-center">
							<div className="animate-wave mx-[2px] h-2 w-[3px] rounded-xl bg-white [animation-delay:-0.4s]" />
							<div className="animate-wave mx-[2px] h-3 w-[3px] rounded-xl bg-white [animation-delay:-0.2s]" />
							<div className="animate-wave mx-[2px] h-4 w-[3px] rounded-xl bg-white" />
							<div className="animate-rick-roll absolute inset-y-0 left-0 w-full bg-white/25" />
						</div>
					)}

					{!playing && <IconMicrophone aria-hidden />}
				</Button>
			</div>

			<audio src={`${env.NEXT_PUBLIC_APP_URL}/audio/rick-roll.mp3`} onEnded={handleEnded} ref={ref} />
		</>
	)
}
