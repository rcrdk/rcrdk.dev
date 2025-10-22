'use client'

import { useEffect, useState } from 'react'

import { useGame } from '@/hooks/use-game'

const KONAMI_CODE = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a',
]

export function KonamiCodeGameTask() {
	const [input, setInput] = useState<string[]>([])
	const { onCompleteTask } = useGame()

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			setInput((prev) => [...prev, event.key].slice(-KONAMI_CODE.length))

			if ([...input, event.key].slice(-KONAMI_CODE.length).join('') === KONAMI_CODE.join('')) {
				onCompleteTask('konami')
				setInput([])
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [input, onCompleteTask])

	return null
}
