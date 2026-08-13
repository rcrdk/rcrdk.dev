'use client'

import { Fragment } from 'react'
import {
	Content as HoverCardContent,
	Root as HoverCardRoot,
	Trigger as HoverCardTrigger,
} from '@radix-ui/react-hover-card'
import { IconHelpCircle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

const HOVER_CARD_SIDE_OFFSET = 8

const INSTRUCTIONS = [
	{ keys: ['Shift', 'C'], action: 'hold' },
	{ keys: ['P'], action: 'status' },
	{ keys: ['↓'], action: 'move_down' },
	{ keys: ['←'], action: 'move_left' },
	{ keys: ['→'], action: 'move_right' },
	{ keys: ['Space'], action: 'hard_drop' },
	{ keys: ['z'], action: 'flip_counterclockwise' },
	{ keys: ['x', '↑'], action: 'flip_clockwise' },
]

export function TetrisInstructions() {
	const __ = useTranslations('Game')

	return (
		<HoverCardRoot openDelay={0}>
			<HoverCardTrigger className="flex cursor-help items-center gap-0.5 text-sm font-medium text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">
				<IconHelpCircle className="size-4" aria-hidden />
				{__('tetris.instructions.popover')}
			</HoverCardTrigger>

			<HoverCardContent
				className="dark:bg-dropdown-dark z-50 flex flex-col gap-1 rounded-xl border border-black/20 bg-white p-6 text-start text-sm shadow-2xl dark:border-white/20"
				side="bottom"
				align="start"
				sideOffset={HOVER_CARD_SIDE_OFFSET}
			>
				{INSTRUCTIONS.map(({ keys, action }) => (
					<p key={action}>
						{keys.map((key, index) => (
							<Fragment key={key}>
								{index > 0 && <> {__('tetris.instructions.or')} </>}
								<kbd>{key}</kbd>
							</Fragment>
						))}
						: {__(`tetris.instructions.${action}`)}
					</p>
				))}
			</HoverCardContent>
		</HoverCardRoot>
	)
}
