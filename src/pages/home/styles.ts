import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { styled } from '@/styles'

export const HomeContainer = styled(Container, {
	margin: 'auto',
	maxWidth: 768,
	paddingTop: '$yAxisLarge',
	paddingBottom: '$yAxisExtraLarge',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'center',

	[`> ${Heading}`]: {
		marginBottom: '$betweenNodesLarge',

		'@max767': {
			maxWidth: '1rem',
			overflowWrap: 'normal',
		},

		'@max575': {
			fontSize: '$display',
		},
	},

	[`> ${Text}`]: {
		marginBottom: '$betweenNodesNormal',

		a: {
			fontWeight: 600,
			color: '$baseHeading',
			textDecoration: 'underline',
			transition: '$color',

			'@hover': {
				'&:hover': {
					color: '$brandBase',
				},
			},
		},
	},
})

export const Buttons = styled('nav', {
	display: 'flex',
	gap: '$betweenNodesSmall',
	alignItems: 'center',
	marginTop: '$betweenNodesMedium',
})
