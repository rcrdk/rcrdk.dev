import { memo } from 'react'

import { GameTaskUser } from '@/context/game-context'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	task: GameTaskUser
}

function GameTaskItemComponent({ task }: Props) {
	return (
		<div
			className={cn(
				'relative flex items-start rounded-lg border px-5 py-3 text-start',
				task.completed && 'border-black/15 dark:border-white/20',
				!task.completed && 'border-black/7 dark:border-white/12',
			)}
		>
			<span className={cn('shrink-0 text-3xl', !task.completed && 'opacity-35 grayscale-100 dark:opacity-50')}>
				{task.icon}
			</span>

			<div className="flex grow flex-col items-start gap-2">
				<div className="flex w-full items-start">
					<p key={task.id} className={cn('flex w-full flex-col gap-0.5 ps-3 pe-5', !task.completed && 'opacity-45')}>
						<strong>{task.listItem.title}</strong>
						<span className="text-sm leading-tight">{task.listItem.hint}</span>
					</p>

					<span
						className={cn(
							'flex aspect-square shrink-0 items-center self-center rounded-2xl border px-1 py-1 text-xs leading-none font-semibold text-nowrap',
							task.completed && 'bg-accent-blue border-accent-blue text-white',
							!task.completed && 'border-black/50 opacity-35 dark:border-white/50 dark:opacity-50',
						)}
					>
						+{task.points}
					</span>
				</div>

				{(!task.completed || task.id === 'tetris') && task.button}
			</div>
		</div>
	)
}

export const GameTaskItem = memo(GameTaskItemComponent)
