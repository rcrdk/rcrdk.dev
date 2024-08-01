/* eslint-disable prettier/prettier */
import { createStitches } from '@stitches/react'
import localFont from 'next/font/local'

const circularSTD = localFont({
	src: [
		{
			path: '../fonts/CircularStd-Black.woff2',
			weight: '900',
			style: 'normal',
		},
	],
})

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
			baseTranslucid: 'rgb(255 255 255 / 80%)',
			baseText: '#3f3f3f',
			baseHeading: '#161616',

			brandBase: '#00a5bc',
			brandContrast: '#ffffff',
			brandTint: '#32b7c9',
			brandShade: '#0094a9',
			brandButtonOutlineActive: 'rgb(50 183 201 / 12%)',

			grayText: '#808080',
			grayBorder: '#e6e6e6',
			grayBorderShadow: '#d6d6d6',
			grayBackground: '#efefef',

			grayButtonHover: '#e0e0e0',
			grayButtonActive: '#d0d0d0',
		},
		fonts: {
			base: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
			heading: `${circularSTD.style.fontFamily}, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
		},
		shadows: {
			defaultFocus: '0 0 0 1px #fff, 0 0 0 3px #00a5bc',
	
			buttonFocus: '0 0 0 2px #00a5bc',
			buttonFilledFocus: '0 0 0 2px #ffffff, 0 0 0 4px #00a5bc',
	
			tooltip: 'rgba(0 0 0 / 20%) 0px 5px 15px',
		},
		fontWeights: {
			heading: '900',
		},
		fontSizes: {
			iconDefault: '1.65rem',
			iconLead: '1.95rem',

			thin: '.85rem',
			small: '.9rem',
			base: '1rem',
			lead: '1.1rem',

			leadSmall: '1.05rem',

			display: '3.75rem',

			h1: '3.25rem',
			h2: '2.5rem',
			h3: '2rem',
			h4: '1.5rem',
			h5: '1.25rem',
			h6: '1rem',
			
			h1ExtraSmall: '3rem',
			h2ExtraSmall: '2.25rem',
			h3ExtraSmall: '1.75rem',
			h4ExtraSmall: '1.4rem',
			h5ExtraSmall: '1.15rem',
			h6ExtraSmall: '1rem',
		},
		lineHeights: {
			base: '1',
			text: '1.9',
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
			h1: '-0.03em',
			h2: '-0.03em',
			h3: '-0.03em',
		},
		space: {
			betweenNodesLarge: '1.9rem',
			betweenNodesMedium: '1.25rem',
			betweenNodesNormal: '1rem',
			betweenNodesSmall: '0.66rem',

			containerLarge: '2.5rem',
			containerSmall: '1.5rem',

			yAxisExtraLarge: '4.25rem',
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
			tooltip: '1rem',
		},
		transitions: {
			color: 'color 300ms ease',
			colorBorder: 'color 300ms ease, border 300ms ease',
			button: 'color 300ms ease, background 300ms ease, border 300ms ease, transform 100ms ease, opacity 300ms ease',
		},
	},
})

export const lightTheme = createTheme({
	colors: {
		baseBackground: '#ffffff',
		baseTranslucid: 'rgb(255 255 255 / 80%)',
		baseText: '#3f3f3f',
		baseHeading: '#161616',

		brandBase: '#00a5bc',
		brandContrast: '#ffffff',
		brandTint: '#32b7c9',
		brandShade: '#0094a9',
		brandButtonOutlineActive: 'rgb(50 183 201 / 12%)',

		grayText: '#808080',
		grayBorder: '#e6e6e6',
		grayBorderShadow: '#d6d6d6',
		grayBackground: '#efefef',

		grayButtonHover: '#e0e0e0',
		grayButtonActive: '#d0d0d0',
	},
	shadows: {
		defaultFocus: '0 0 0 1px #fff, 0 0 0 3px #00a5bc',

		buttonFocus: '0 0 0 2px #00a5bc',
		buttonFilledFocus: '0 0 0 2px #ffffff, 0 0 0 4px #00a5bc',

		tooltip: 'rgba(0 0 0 / 20%) 0px 5px 15px',
	},
})

export const darkTheme = createTheme({
	colors: {
		baseBackground: '#000000',
		baseTranslucid: 'rgb(0 0 0 / 66%)',
		baseText: '#b0b0b0',
		baseHeading: '#f0f0f0',

		brandBase: '#009bba',
		brandContrast: '#ffffff',
		brandTint: '#32afc7',
		brandShade: '#008ba7',
		brandButtonOutlineActive: 'rgb(0 155 186 / 24%)',

		grayText: '#808080',
		grayBorder: '#2b2b2b',
		grayBorderShadow: '#3b3b3b',
		grayBackground: '#1f1f1f',

		grayButtonHover: '#252525',
		grayButtonActive: '#2f2f2f',
	},
	shadows: {
		defaultFocus: '0 0 0 1px #fff, 0 0 0 3px #009bba',

		buttonFocus: '0 0 0 2px #009bba',
		buttonFilledFocus: '0 0 0 2px #000000, 0 0 0 4px #009bba',

		tooltip: 'rgba(133 133 133 / 20%) 0px 5px 15px',
	},
})
