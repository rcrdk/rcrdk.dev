import { createStitches } from '@stitches/react'

export const {
	config,
	styled,
	globalCss,
	getCssText,
	keyframes,
	theme,
	createTheme,
	css,
} = createStitches({
	media: {
		hover: '(hover: hover)',
		hoverNone: '(hover: none)',

		min1400: '(min-width: 1400px)',
		max1399: '(max-width: 1399px)',

		min1200: '(min-width: 1200px)',
		max1199: '(max-width: 1199px)',

		min992: '(min-width: 992px)',
		max991: '(max-width: 991px)',

		min768: '(min-width: 768px)',
		max767: '(max-width: 767px)',

		min576: '(min-width: 576px)',
		max575: '(max-width: 575px)',
	},
	theme: {
		colors: {
			baseBackground: '#ffffff',
			baseText: '#161616',

			brandBase: '#e51872',
			brandContrast: '#ffffff',

			grayText: '#808080',
			grayBorder: '#e6e6e6',
			grayBorderDialog: '#d6d6d6',
			grayBackground: '#efefef',
		},
		fonts: {
			base: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
		},
		fontSizes: {
			iconDefault: '1.5rem',

			thin: '.85rem',
			small: '.93rem',
			base: '1rem',
			lead: '1.13rem',

			leadSmall: '1.07rem',

			navigationLinkLead: '1.45rem',

			h1: '3.25rem',
			h2: '2.5rem',
			h3: '2rem',
			h4: '1.5rem',
			h5: '1.25rem',
			h6: '1rem',
		},
		lineHeights: {
			base: '1',
			text: '1.75',
			textThin: '1.35',
			textSmall: '1.5',
			h1: '1.1',
			h2: '1.2',
			h3: '1.2',
			h4: '1.25',
			h5: '1.25',
			h6: '1.25',
		},
		letterSpacings: {
			h1: '-0.01em',
			h2: '-0.005em',
		},
		shadows: {
			defaultFocus: '0 0 0 1px #fff, 0 0 0 3px #e51872',

			buttonFocus: '0 0 0 2px #e51872',
			buttonFilledFocus: '0 0 0 2px #ffffff, 0 0 0 4px #e51872',
		},
		space: {
			betweenNodesLarge: '1.25rem',
			betweenNodesMedium: '1rem',

			containerLarge: '2.5rem',
			containerSmall: '1.5rem',
			containerExtraSmall: '1.3rem',

			yAxisLarge: '3.5rem',
			yAxisMedium: '3.125rem',
			yAxisSmall: '2.5rem',
			yAxisExtraSmall: '1.75rem',

			gap0: 0,
			gap1: '0.25rem',
			gap2: '0.5rem',
			gap3: '0.75rem',
			gap4: '1rem',
			gap5: '1.25rem',
			gap6: '1.5rem',
			gap7: '1.75rem',
			gap8: '2rem',
		},
		radii: {
			buttons: '0.75rem',
			card: '1.5rem',
		},
		transitions: {
			color: 'color 300ms ease',
			colorBorder: 'color 300ms ease, border 300ms ease',
		},
	},
})
