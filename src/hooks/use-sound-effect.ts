import { useRef } from 'react'

import { env } from '@/lib/env'

const SOUND_FILES = {
	'game-start': 'game-start.mp3',
	'game-points': 'game-points.mp3',
	'game-over': 'game-over.mp3',
	'confetti-pop': 'confetti-pop.mp3',
	cricket: 'cricket.mp3',
} as const

type SoundKey = keyof typeof SOUND_FILES

export function useSoundEffect() {
	const cricketAudioRef = useRef<HTMLAudioElement | null>(null)

	function playSound(name: SoundKey) {
		const audio = new Audio(`${env.NEXT_PUBLIC_APP_URL}/audio/${SOUND_FILES[name]}`)
		audio.play()
	}

	function getCricketAudio() {
		if (!cricketAudioRef.current) {
			cricketAudioRef.current = new Audio(`${env.NEXT_PUBLIC_APP_URL}/audio/${SOUND_FILES.cricket}`)
		}
		return cricketAudioRef.current
	}

	function playCricket() {
		const audio = getCricketAudio()
		audio.currentTime = 0
		audio.play()
	}

	function pauseCricket() {
		getCricketAudio().pause()
	}

	return { playSound, playCricket, pauseCricket }
}
