import { LocalesType } from '@/i18n/routing'

export type GameTaskTypes =
	| 'has-opened-hints'
	| 'switch-theme'
	| 'switch-language' // should apply
	| 'now-playing'
	| 'screensaver'
	| 'not-found'
	| 'dev-tools' // should apply
	| 'konami' // should apply
	| 'random-fact' // should apply
	| 'about-me'

type GameTaskObject = {
	id: GameTaskTypes
	title: Record<LocalesType, string>
	hint: Record<LocalesType, string>
	points: number
}

export const GAME_TASKS: GameTaskObject[] = [
	{
		id: 'has-opened-hints',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'switch-theme',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'switch-language',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'now-playing',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'screensaver',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'not-found',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'dev-tools',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'konami',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'random-fact',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
	{
		id: 'about-me',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
]
