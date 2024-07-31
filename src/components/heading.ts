import { styled } from '@/styles'

export const Heading = styled('h1', {
	textWrap: 'balance',
	fontFamily: '$heading',
	fontWeight: '$heading',
	overflowWrap: 'break-word',
	margin: 0,
	color: '$baseHeading',

	variants: {
		mode: {
			h1: {
				fontSize: '$h1',
				lineHeight: '$h1',
				letterSpacing: '$h1',
			},

			h2: {
				fontSize: '$h2',
				lineHeight: '$h2',
				letterSpacing: '$h2',
			},

			h3: {
				fontSize: '$h3',
				lineHeight: '$h3',
				letterSpacing: '$h3',
			},

			h4: {
				fontSize: '$h4',
				lineHeight: '$h4',
				fontWeight: 600,
			},

			h5: {
				fontSize: '$h5',
				lineHeight: '$h5',
				fontWeight: 600,
			},

			h6: {
				fontSize: '$h6',
				lineHeight: '$h6',
				fontWeight: 600,
			},
		},
	},

	defaultVariants: {
		mode: 'h1',
	},
})
