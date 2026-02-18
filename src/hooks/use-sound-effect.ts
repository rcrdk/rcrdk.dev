import { env } from '@/lib/env'

const SOUND_FILES = {
	'game-start': 'game-start.mp3',
	'game-points': 'game-points.mp3',
	'game-over': 'game-over.mp3',
	'confetti-pop': 'confetti-pop.mp3',
} as const

type SoundKey = keyof typeof SOUND_FILES

export function useSoundEffect() {
	function playSound(name: SoundKey) {
		const audio = new Audio(`${env.NEXT_PUBLIC_APP_URL}/audio/${SOUND_FILES[name]}`)
		audio.play()
	}

	return { playSound }
}
