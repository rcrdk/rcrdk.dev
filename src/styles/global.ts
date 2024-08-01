import { globalCss } from '.'

export const globalStyles = globalCss({
	'*, *:before, &:after': {
		margin: 0,
		padding: 0,
		boxSizing: 'border-box',
		'-webkit-font-smoothing': 'antialiased',
	},

	':focus': {
		outline: 0,
	},

	':focus-visible': {
		outline: 0,
		boxShadow: '$defaultFocus',
		borderRadius: '$buttons',
	},

	'::selection': {
		background: '$brandBase',
		color: '$brandContrast',
	},

	'html, body': {
		background: '$baseBackground',
		color: '$baseText',
		lineHeight: '$text',
		scrollBehavior: 'smooth',
		textSizeAdjust: 'none',
	},

	'body, input, textarea, button': {
		fontFamily: '$base',
		fontWeight: 400,
		lineHeight: '$text',
	},

	'img, picture, svg, video, canvas': {
		maxWidth: '100%',
		height: 'auto',
	},

	button: {
		userDrag: 'none',
	},

	a: {
		textDecoration: 'none',
		color: 'currentColor',
		userDrag: 'none',
	},

	img: {
		display: 'block',
		width: 'auto',
		height: 'auto',
		maxWidth: '100%',
		userDrag: 'none',
	},

	'.tabler-icon': {
		fontSize: '$iconDefault',
		strokeWidth: '1.5',
		width: '1em',
		height: '1em',
	},

	'[data-radix-popper-content-wrapper]': {
		zIndex: '1000 !important',
	},
})
