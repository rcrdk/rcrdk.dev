import * as TooltipBase from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface TooltipProps {
	children: ReactNode
	content: string | ReactNode
}

export default function Tooltip({ children, content }: TooltipProps) {
	return (
		<TooltipBase.Root>
			<TooltipBase.Trigger asChild>{children}</TooltipBase.Trigger>

			<TooltipBase.Portal>
				<TooltipBase.Content>
					<TooltipBase.Arrow />
					{content}
				</TooltipBase.Content>
			</TooltipBase.Portal>
		</TooltipBase.Root>
	)
}
