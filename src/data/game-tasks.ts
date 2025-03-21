import { LocalesType } from '@/i18n/routing'

export type GameTaskTypes =
	| 'has-opened-hints'
	| 'switch-theme'
	| 'switch-language'
	| 'now-playing'
	| 'screensaver'
	| 'not-found'
	| 'dev-tools'
	| 'konami'
	| 'random-fact'
	| 'about-me'

type GameTaskObject = {
	id: GameTaskTypes
	title: Record<LocalesType, string>
	hint: Record<LocalesType, string>
	points: number
}

export const GAME_TASKS: GameTaskObject[] = [
	{
		id: 'switch-theme',
		title: { en: '', 'pt-br': '' },
		hint: { en: '', 'pt-br': '' },
		points: 10,
	},
]
