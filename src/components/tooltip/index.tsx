import * as TooltipBase from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

import { TooltipContent, TooltipInner } from './styles'

interface TooltipProps {
	children: ReactNode
	content: string | ReactNode
}

export default function Tooltip({ children, content }: TooltipProps) {
	return (
		<TooltipBase.Root>
			<TooltipBase.Trigger asChild>{children}</TooltipBase.Trigger>

			<TooltipBase.Portal>
				<TooltipContent sideOffset={10}>
					<TooltipInner>{content}</TooltipInner>
				</TooltipContent>
			</TooltipBase.Portal>
		</TooltipBase.Root>
	)
}
