'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'
import { Link } from '@/i18n/routing'

export function NotFoundGameTaskButton() {
	const __ = useTranslations('Default')

	return (
		<Button variant="outline" size="xs" href="/non-existent-page" as={Link} className="text-sm font-semibold">
			{__('game.taskButtons.notFound')}
		</Button>
	)
}

export function NotFoundGameTask() {
	const { onCompleteTask } = useGame()

	useEffect(() => {
		const timer = setTimeout(() => {
			onCompleteTask('not-found')
		}, 700)

		return () => clearTimeout(timer)
	}, [onCompleteTask])

	return null
}
