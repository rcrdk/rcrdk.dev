import * as Avatar from '@radix-ui/react-avatar'

import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { styled } from '@/styles'

export const HeaderContainer = styled('header', {
	// position: 'sticky',
	// top: 0,
	padding: '$gap6 0 0',
	background: '$baseTranslucid',
	backdropFilter: 'blur(4px)',

	[`> ${Container}`]: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})

export const BrandContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '$betweenNodesSmall',
	userSelect: 'none',

	[`> ${Heading}`]: {
		span: {
			color: '$brandBase',
		},
	},
})

export const BrandAvatar = styled(Avatar.Root, {
	display: 'block',
	aspectRatio: '1',
	flex: '0 0 2.5rem',
	borderRadius: '50%',
	overflow: 'hidden',
	background: '$grayBackground',

	'@max575': {
		flex: '0 0 2.25rem',
	},
})

export const HeaderButtons = styled('div', {
	display: 'flex',
	gap: '$gap3',
})
