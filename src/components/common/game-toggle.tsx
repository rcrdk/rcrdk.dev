import { useCallback, useState } from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { IconAlertTriangle, IconDeviceGamepad2, IconRefresh } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'
import { cn } from '@/utils/tailwind-cn'

export function Game() {
	const [open, setOpen] = useState(false)

	const { onShowGameHistory, onCompleteTask, pointsEarned, pointsTotal, onResetGame } = useGame()
	const __ = useTranslations('Default')
	const locale = useLocale()

	const handleToggleVisibility = useCallback(() => {
		setOpen((prev) => !prev)
		onCompleteTask('now-playing')
	}, [onCompleteTask])

	return (
		<div className="layout:flex relative mt-2 hidden">
			<div className="animate-glowing absolute inset-0 -z-10 block bg-[linear-gradient(45deg,_#ff0000,_#ff7300,_#fffb00,_#48ff00,_#00ffd5,_#002bff,_#7a00ff,_#ff00c8,_#ff0000)] [background-size:400%] blur-md" />

			<Dropdown.Root open={open} onOpenChange={() => handleToggleVisibility()}>
				<Dropdown.Trigger asChild>
					<Button variant="glowing" className="relative z-10" icon aria-label={__('game.title')}>
						<IconDeviceGamepad2 />
					</Button>
				</Dropdown.Trigger>

				<Dropdown.Content
					side="right"
					align="end"
					avoidCollisions={false}
					sideOffset={40}
					className={cn(
						'data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out shadow-dialog dark:bg-dropdown-dark flex [transform-origin:var(--radix-dropdown-menu-content-transform-origin)] flex-col gap-2 rounded-xl border border-black/20 bg-white px-5 py-6 text-center text-balance will-change-transform dark:border-white/20',
						locale === 'en' ? 'w-[280px]' : 'w-[320px]',
					)}
				>
					<div className="flex items-center justify-center gap-2">
						<IconDeviceGamepad2 size={28} />
						<strong className="text-bold text-lg">{__('game.title')}</strong>
					</div>

					<p className="dark:text-content-dark text-content-light text-sm">{__('game.text')}</p>

					<div className="mt-3 mb-4 flex items-center justify-between border-y border-black/10 py-3 dark:border-white/15">
						<p className="text-sm text-black dark:text-white">
							<strong className="font-medium">{__('game.score')}</strong> {pointsEarned}/{pointsTotal}
						</p>

						<Dropdown.Item asChild>
							<button
								onClick={() => onResetGame()}
								disabled={pointsEarned === 0}
								className="focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue flex cursor-pointer items-center gap-1 rounded-lg text-sm font-medium transition-all outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-35"
							>
								<IconRefresh size={16} />
								{__('game.reset')}
							</button>
						</Dropdown.Item>
					</div>

					<Dropdown.Item asChild>
						<Button onClick={() => onShowGameHistory()} className="w-full font-medium" size="sm" variant="outline">
							<IconAlertTriangle size={20} />
							<span>{__('game.button')}</span>
						</Button>
					</Dropdown.Item>
				</Dropdown.Content>
			</Dropdown.Root>
		</div>
	)
}
