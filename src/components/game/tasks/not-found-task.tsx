'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

export function NotFoundGameTaskButton() {
	const __ = useTranslations('Game')

	return (
		<Button variant="outline" size="xs" href="/non-existent-page" as={Link} className="text-sm font-semibold" haptic>
			{__('taskButtons.notFound')}
		</Button>
	)
}

const DELAY_NOT_FOUND = 700

export function NotFoundGameTask() {
	const { onCompleteTask } = useGame()

	useEffect(() => {
		const timer = setTimeout(() => onCompleteTask('not-found'), DELAY_NOT_FOUND)
		return () => clearTimeout(timer)
	}, [onCompleteTask])

	return null
}
