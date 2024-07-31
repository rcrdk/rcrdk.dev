import { styled } from '@/styles'

export const Container = styled('section', {
	padding: '0 $containerLarge',
	maxWidth: '100vw',
	margin: 'auto',

	'@max575': {
		padding: '0 $containerSmall',
	},
})

export const ContainerVertical = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '$betweenNodesNormal',

	variants: {
		align: {
			center: {
				alignItems: 'center',
				textAlign: 'center',
			},
		},
	},
})
