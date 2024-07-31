import { styled } from '@/styles'

export const Button = styled('button', {
	all: 'unset',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontFamily: '$base',
	fontSize: '$base',
	fontWeight: 500,
	textAlign: 'center',
	whiteSpace: 'nowrap',
	lineHeight: '$base',
	borderRadius: '$buttons',
	cursor: 'pointer',
	userSelect: 'none',
	boxSizing: 'border-box',
	userDrag: 'none',
	flexShrink: 0,
	transition:
		'color 300ms ease, background 300ms ease, border 300ms ease, transform 100ms ease, opacity 300ms ease',

	'&:active': {
		transform: 'scale(.93)',
	},

	svg: {
		flexShrink: 0,
	},

	variants: {
		size: {
			default: {
				height: '2.8rem',
				padding: '0 $gap4',
				gap: '$gap3',

				'&:has(svg:only-child)': {
					padding: 0,
					width: '2.8rem',

					svg: {
						color: 'currentColor !important',
					},
				},
			},
			lead: {
				height: '3.25rem',
				gap: '$gap3',
				padding: '0 1.5rem',

				'&:has(svg:only-child)': {
					padding: 0,
					width: '3.25rem',

					svg: {
						color: 'currentColor !important',
					},
				},
			},
		},

		mode: {
			text: {
				'@hover': {
					'&:hover': {
						background: '$grayBackground',
					},
				},

				'&:focus-visible': {
					boxShadow: '$buttonFocus',
					borderColor: 'transparent',
				},

				'&:active': {
					background: '$grayButtonActive',
				},

				svg: {
					color: '$brandBase',
				},
			},

			filled: {
				background: '$brandBase',
				color: '$brandContrast',

				'@hover': {
					'&:hover': {
						background: '$brandTint',
					},
				},

				'&:focus-visible': {
					boxShadow: '$buttonFilledFocus',
					borderColor: 'transparent',
				},

				'&:active': {
					background: '$brandShade',
				},
			},

			outline: {
				border: '1px solid $grayBorder',

				'@hover': {
					'&:hover': {
						borderColor: '$brandBase',
						color: '$brandBase',
					},
				},

				'&:focus-visible': {
					boxShadow: '$buttonFocus',
					borderColor: 'transparent',
				},

				'&:active': {
					background: '$brandButtonOutlineActive',
					borderColor: '$brandBase',
					color: '$brandBase',
				},

				svg: {
					color: '$brandBase',
				},
			},

			filledGray: {
				background: '$grayBackground',

				'@hover': {
					'&:hover': {
						background: '$grayButtonHover',
					},
				},

				'&:focus-visible': {
					boxShadow: '$buttonFocus',
				},

				'&:active': {
					background: '$grayButtonActive',
				},
			},
		},
	},

	defaultVariants: {
		size: 'default',
		mode: 'text',
	},
})