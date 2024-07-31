import { styled } from '@/styles'

export const Text = styled('p', {
	margin: 0,
	fontSize: '$base',
	lineHeight: '$text',
	overflowWrap: 'break-word',

	strong: {
		fontWeight: 600,
		color: '$baseHeading',
	},

	variants: {
		size: {
			thin: {
				fontSize: '$thin',
				lineHeight: '$textThin',
			},
			small: {
				fontSize: '$small',
				lineHeight: '$textSmall',
			},
			lead: {
				fontSize: '$lead',

				'@max575': {
					fontSize: '$leadSmall',
				},
			},
		},

		theme: {
			gray: {
				color: '$grayText',
			},
		},

		balance: {
			true: {
				textWrap: 'balance',
			},
		},
	},

	defaultVariants: {
		balance: false,
		size: 'normal',
		theme: 'current',
	},
})
