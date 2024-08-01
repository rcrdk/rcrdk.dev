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

export const SrOnly = styled('span', {
	display: 'block',
	width: '1px',
	height: '1px',
	overflow: 'hidden',
	position: 'absolute',
	padding: 0,
	margin: '-1px',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: 0,
})
