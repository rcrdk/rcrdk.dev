'use client'

import { useCallback, useEffect, useState } from 'react'

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

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			setInput((prev) => [...prev, event.key].slice(-KONAMI_CODE.length))

			if ([...input, event.key].slice(-KONAMI_CODE.length).join('') === KONAMI_CODE.join('')) {
				onCompleteTask('konami')
				setInput([])
			}
		},
		[input, onCompleteTask],
	)

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown, onCompleteTask])

	return null
}
