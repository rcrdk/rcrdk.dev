import * as Dropdown from '@radix-ui/react-dropdown-menu'

import { styled } from '@/styles'

export const DropdownMenu = styled(Dropdown.DropdownMenuContent, {
	display: 'flex',
	minWidth: 140,
	flexDirection: 'column',
	textAlign: 'center',
	background: '$baseBackground',
	padding: '$gap2 $gap3',
	border: '1px solid $grayBorderShadow',
	borderRadius: '$tooltip',
	boxShadow: '$tooltip',
})

export const DropdownItem = styled(Dropdown.Item, {
	display: 'block',
	padding: '$gap2',
	lineHeight: '$base',
	boxShadow: 'none',
	transition: '$button',
	borderRadius: '$buttons',

	'@hover': {
		'&:hover': {
			background: '$grayBackground',
		},
	},

	variants: {
		active: {
			true: {
				fontWeight: 500,
				color: '$brandBase',
			},
		},
	},
})
