import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { styled } from '@/styles'

export const HomeContainer = styled(Container, {
	maxWidth: 768,
	paddingTop: '$yAxisLarge',
	paddingBottom: '$yAxisMedium',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'center',

	[`> ${Heading}`]: {
		marginBottom: '$betweenNodesLarge',
	},

	[`> ${Text}`]: {
		marginBottom: '$betweenNodesNormal',

		a: {
			fontWeight: 600,
			color: '$baseHeading',
			textDecoration: 'underline',
		},
	},
})
