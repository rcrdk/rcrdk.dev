import type { GameTaskTypes } from '@/data/game-tasks'

export interface GameState {
	isGameActive: boolean
	gameSessionKey: number
	tasksCompleted: GameTaskTypes[]
	showGameDialog: boolean
	showGameTetris: boolean
	showGameTasks: boolean
	isScreenSizeAllowed: boolean
}

export const INITIAL_GAME_STATE: GameState = {
	isGameActive: false,
	gameSessionKey: 0,
	tasksCompleted: [],
	showGameDialog: false,
	showGameTetris: false,
	showGameTasks: false,
	isScreenSizeAllowed: false,
}

export type GameHydratePayload = Partial<Pick<GameState, 'tasksCompleted' | 'showGameTasks' | 'isGameActive'>>

export type GameAction =
	| { type: 'game/activate' }
	| { type: 'game/stop' }
	| { type: 'game/reset' }
	| { type: 'game/completeTask'; taskId: GameTaskTypes }
	| { type: 'game/toggleDialog' }
	| { type: 'game/setTetrisOpen'; open: boolean }
	| { type: 'game/showTasks' }
	| { type: 'game/setScreenSizeAllowed'; allowed: boolean }
	| { type: 'game/hydrate'; payload: GameHydratePayload }

export function gameReducer(state: GameState, action: GameAction): GameState {
	switch (action.type) {
		case 'game/activate':
			return { ...state, isGameActive: true }

		case 'game/stop':
			return {
				...state,
				isGameActive: false,
				tasksCompleted: [],
				showGameTasks: false,
				showGameTetris: false,
				gameSessionKey: state.gameSessionKey + 1,
			}

		case 'game/reset':
			return {
				...state,
				tasksCompleted: [],
				showGameTasks: false,
				gameSessionKey: state.gameSessionKey + 1,
			}

		case 'game/completeTask':
			if (state.tasksCompleted.includes(action.taskId)) return state
			return { ...state, tasksCompleted: [...state.tasksCompleted, action.taskId] }

		case 'game/toggleDialog':
			return { ...state, showGameDialog: !state.showGameDialog }

		case 'game/setTetrisOpen':
			if (action.open) return { ...state, showGameDialog: false, showGameTetris: true }
			return { ...state, showGameTetris: false }

		case 'game/showTasks':
			return { ...state, showGameTasks: true }

		case 'game/setScreenSizeAllowed':
			return { ...state, isScreenSizeAllowed: action.allowed }

		case 'game/hydrate':
			return { ...state, ...action.payload }

		default:
			return state
	}
}
