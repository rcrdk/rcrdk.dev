'use client'

import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

interface TetrisStatusProps {
	emoji: string
	title: string
	text: string
	buttonLabel: string
	icon: ReactNode
	onAction: VoidFunction
}

export function TetrisStatus({ emoji, title, text, buttonLabel, icon, onAction }: Readonly<TetrisStatusProps>) {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50">
			<div className="dark:bg-dropdown-dark flex w-9/12 flex-col items-center justify-center rounded-xl border border-black/20 bg-white p-6 text-center shadow-2xl dark:border-white/20">
				<span className="text-5xl">{emoji}</span>
				<strong className="text-xl text-black dark:text-white">{title}</strong>
				<span className="mt-1 mb-4 text-balance">{text}</span>

				<Button variant="solid" size="sm" className="font-medium" onClick={onAction}>
					{icon}
					{buttonLabel}
				</Button>
			</div>
		</div>
	)
}
