'use client'

import type { ReactNode } from 'react'
import { IconRefresh, IconSkull } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

const ACTION_BUTTON_CLASSNAME =
	'focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue squircle-rounded flex cursor-pointer items-center gap-1 rounded-lg p-1 text-sm font-medium transition-all outline-none hover:bg-black/5 focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/5'

const ICON_SIZE = 16

interface ScoreActionButtonProps {
	label: string
	ariaLabel: string
	icon: ReactNode
	onClick: VoidFunction
	disabled?: boolean
}

function ScoreActionButton({ label, ariaLabel, icon, onClick, disabled = false }: Readonly<ScoreActionButtonProps>) {
	return (
		<button onClick={onClick} disabled={disabled} className={ACTION_BUTTON_CLASSNAME} aria-label={ariaLabel}>
			{icon}
			{label}
		</button>
	)
}

interface GameScoreboardProps {
	pointsEarned: number
	pointsTotal: number
	onStopGame: VoidFunction
	onResetGame: VoidFunction
}

export function GameScoreboard({ pointsEarned, pointsTotal, onStopGame, onResetGame }: Readonly<GameScoreboardProps>) {
	const __ = useTranslations('Game')

	return (
		<div className="squircle-rounded mt-6 mb-10 flex items-center gap-1 rounded-2xl bg-black/5 py-3 pr-4 pl-5 dark:bg-white/10">
			<p className="grow p-1 text-start text-sm text-black dark:text-white">
				<strong className="font-semibold">{__('score')}</strong> {pointsEarned}/{pointsTotal}
			</p>

			<ScoreActionButton
				label={__('stop')}
				ariaLabel={__('ariaLabels.stopGame')}
				icon={<IconSkull size={ICON_SIZE} aria-hidden />}
				onClick={onStopGame}
			/>

			<ScoreActionButton
				label={__('reset')}
				ariaLabel={__('ariaLabels.resetGame')}
				icon={<IconRefresh size={ICON_SIZE} aria-hidden />}
				onClick={onResetGame}
				disabled={pointsEarned === 0}
			/>
		</div>
	)
}
