'use client'

import { useEffect, useState } from 'react'

import { useGame } from '@/hooks/use-game'

export function KonamiCodeGameTask() {
	const [input, setInput] = useState<string[]>([])
	const { onCompleteTask } = useGame()

	useEffect(() => {
		const konamiCode = [
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

		const handleKeyDown = (event: KeyboardEvent) => {
			setInput((prev) => [...prev, event.key].slice(-konamiCode.length))

			if ([...input, event.key].slice(-konamiCode.length).join('') === konamiCode.join('')) {
				onCompleteTask('konami')
				setInput([])
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [input, onCompleteTask])

	return null
}
