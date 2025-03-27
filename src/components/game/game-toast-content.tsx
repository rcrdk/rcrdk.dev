import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { GameTaskUser } from '@/context/game-context'

type Props = {
	task: GameTaskUser
}

export function GameToastContent({ task }: Props) {
	const __ = useTranslations('Default')

	const handleDismissToast = useCallback(() => {
		toast.dismiss(task.id)
	}, [task.id])

	return (
		<div className="xs:gap-3 flex items-center gap-2">
			<span className="size-auto shrink-0 text-3xl">{task.icon}</span>

			<p className="flex grow flex-col gap-0.5">
				<strong className="text-content-light max-xs:text-center flex grow items-center gap-2 text-sm leading-[1.25] text-balance dark:text-white">
					{task.toastItem.title}

					<span className="bg-accent-blue rounded-xl px-2 py-1 text-xs leading-none font-semibold text-nowrap text-white">
						+{task.points}
					</span>
				</strong>

				<span className="text-content-light dark:text-content-dark">{task.toastItem.hint}</span>
			</p>

			<Button size="xs" onClick={handleDismissToast}>
				{__('game.dismiss')}
			</Button>
		</div>
	)
}
