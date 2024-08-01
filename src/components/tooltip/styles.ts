import * as TooltipBase from '@radix-ui/react-tooltip'

import { styled } from '@/styles'
import { scaleIn } from '@/styles/animations'

export const TooltipContent = styled(TooltipBase.Content, {
	transformOrigin: 'var(--radix-tooltip-content-transform-origin)',
	animation: `${scaleIn} 300ms ease`,
})

export const TooltipInner = styled('div', {
	fontSize: '$small',
	fontWeight: 500,
	lineHeight: '$textThin',
	maxWidth: 180,
	textAlign: 'center',
	background: '$baseBackground',
	textWrap: 'balance',
	padding: '$gap2 $gap3',
	border: '1px solid $grayBorderShadow',
	borderRadius: '$tooltip',
	boxShadow: '$tooltip',
	userSelect: 'none',
	pointerEvents: 'none',
})
