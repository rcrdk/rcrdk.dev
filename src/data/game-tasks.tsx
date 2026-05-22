import { DevToolsGameTaskButton } from '@/components/game/tasks/devtools-task'
import { NotFoundGameTaskButton } from '@/components/game/tasks/not-found-task'
import { RandomFactGameTaskButton } from '@/components/game/tasks/random-fact-task'
import { TetrisGameTaskButton } from '@/components/game/tasks/tetris-task'
import type { LocalesType } from '@/i18n/config'

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
	| 'tetris'
	| 'rick-rolling'

type GameTaskObject = {
	id: GameTaskTypes
	icon: string
	listItem: {
		title: Record<LocalesType, string>
		hint: Record<LocalesType, string>
	}
	toastItem: {
		title: Record<LocalesType, string>
		hint: Record<LocalesType, string>
	}
	points: number
	button?: React.ReactNode
}

export const GAME_TASKS: GameTaskObject[] = [
	{
		id: 'has-opened-hints',
		icon: '🕵🏼',
		listItem: {
			title: { en: 'Spoiler hunter', 'pt-br': 'Caçador de spoilers' },
			hint: {
				en: "You can't live without a good spoiler.",
				'pt-br': 'Você não consegue viver sem um bom spoiler.',
			},
		},
		toastItem: {
			title: { en: 'Spoiler hunter on sight!', 'pt-br': 'Você é um caçador de spoilers!' },
			hint: {
				en: "Yeah, you can't live without a good spoiler. I can relate!",
				'pt-br': 'Você não consegue viver sem um bom spoiler. Eu entendo bem!',
			},
		},
		points: 10,
	},
	{
		id: 'switch-theme',
		icon: '🕯️',
		listItem: {
			title: { en: 'Color theme', 'pt-br': 'Tema do site' },
			hint: {
				en: 'You changed the site color theme.',
				'pt-br': 'Você mudou as cores do site.',
			},
		},
		toastItem: {
			title: { en: 'You just changed the theme!', 'pt-br': 'Você acabou de mudar o tema!' },
			hint: {
				en: 'What is your favorite color theme? Mine is the light one.',
				'pt-br': 'Qual o seu modo de cores favorito? O meu é o claro.',
			},
		},
		points: 10,
	},
	{
		id: 'switch-language',
		icon: '🌎',
		listItem: {
			title: { en: 'Bilingual', 'pt-br': 'Bilingue' },
			hint: { en: 'You changed the site language.', 'pt-br': 'Você mudou o idioma do site.' },
		},
		toastItem: {
			title: { en: 'You just changed the language!', 'pt-br': 'Você acabou de mudar o idioma!' },
			hint: {
				en: 'Can you get to know me best in english?',
				'pt-br': 'Acha que consegue me conhecer melhor em português?',
			},
		},
		points: 10,
	},
	{
		id: 'now-playing',
		icon: '🎸',
		listItem: {
			title: { en: 'Music lover', 'pt-br': 'Amante de música' },
			hint: { en: "Checked what I've been listening on Spotify.", 'pt-br': 'Viu o que andei ouvindo no Spotify.' },
		},
		toastItem: {
			title: { en: 'So, what do you think?', 'pt-br': 'Então, o que achou?' },
			hint: {
				en: 'Have you ever listened to one o those songs?',
				'pt-br': 'Já ouviu alguma vez algumas dessas músicas?',
			},
		},
		points: 10,
	},
	{
		id: 'screensaver',
		icon: '😴',
		listItem: {
			title: { en: 'Screensaver', 'pt-br': 'Protetor de tela' },
			hint: {
				en: 'Just close this dialog and take your hand of your mouse for a while. Hint: repeat it some times.',
				'pt-br': 'Feche essa modal e tire a mão do seu mouse por um tempinho. Dica: faça mais de uma vez.',
			},
		},
		toastItem: {
			title: { en: 'Knock, Knock! Are you there?', 'pt-br': 'Toc, Toc! Ainda está aí?' },
			hint: { en: "I don't see any movment around here.", 'pt-br': 'Não estou vendo nenhuma movimentação por aqui.' },
		},
		points: 10,
	},
	{
		id: 'konami',
		icon: '🎮',
		listItem: {
			title: { en: 'Konami code', 'pt-br': 'Código Konami' },
			hint: { en: 'Simply: ↑ ↑ ↓ ↓ ← → ← → B A', 'pt-br': 'Resumo: ↑ ↑ ↓ ↓ ← → ← → B A' },
		},
		toastItem: {
			title: { en: "You did't miss a key!", 'pt-br': 'Você não errou um dígito!' },
			hint: {
				en: 'Konami code is a classic easter egg, it seemed fundamental.',
				'pt-br': 'Não podia faltar o código Konami, um clássico necessário.',
			},
		},
		points: 10,
	},
	{
		id: 'about-me',
		icon: '👽',
		listItem: {
			title: { en: 'More about me', 'pt-br': 'Mais sobre mim' },
			hint: { en: 'Get to know more about my history.', 'pt-br': 'Conheça um pouco da minha história.' },
		},
		toastItem: {
			title: { en: 'Are you curious or a game player?', 'pt-br': 'Você é curioso ou um grande jogador?' },
			hint: {
				en: "If you are curious about me, I'm happy. If you a game player, I'm happy with you 10 extra points.",
				'pt-br':
					'Se você está curioso a meu respeito, fico feliz. Se você é um jogador, fico feliz com seus 10 pontos extras.',
			},
		},
		points: 10,
	},
	{
		id: 'rick-rolling',
		icon: '🔮',
		listItem: {
			title: { en: 'Mysterious button', 'pt-br': 'Botão misterioso' },
			hint: {
				en: "Find a button that doesn't seems to be... right. Hint: wait some seconds to grab your points.",
				'pt-br':
					'Encontre um botão que não parece ser... certo. Dica: aguarde alguns segundos para pegar seus pontos. ',
			},
		},
		toastItem: {
			title: { en: 'Easter eggs without rickrolling?', 'pt-br': 'Easter eggs sem rickrolling?' },
			hint: {
				en: 'Impossible! Well done, you listened till the end.',
				'pt-br': 'Impossível! Muito bem, você ouviu até o fim.',
			},
		},
		points: 10,
	},
	{
		id: 'random-fact',
		icon: '🤓',
		listItem: {
			title: { en: 'Random fact', 'pt-br': 'Fato aleatório' },
			hint: { en: 'Have you ever listened to CSS?', 'pt-br': 'Você já ouviu CSS nos streamings?' },
		},
		toastItem: {
			title: { en: 'CSS: Cansei de Ser Sexy', 'pt-br': 'CSS: Cansei de Ser Sexy' },
			hint: {
				en: "Translated to I'm Tired of Being Sexy, CSS is a 2000's brazilian indie band, and like Cascading Style Sheets, I LOVE IT!",
				'pt-br':
					'CSS é uma banda brasileira indie que surgiu nos anos 2000, e assim como Cascading Style Sheets, É BOM DEMAISSSS.',
			},
		},
		button: <RandomFactGameTaskButton />,
		points: 10,
	},
	{
		id: 'dev-tools',
		icon: '👨🏼‍💻',
		listItem: {
			title: { en: 'Opened DevTools', 'pt-br': 'Abriu o DevTools' },
			hint: { en: 'Look at the console message.', 'pt-br': 'Olhou a mensagem no console.' },
		},
		toastItem: {
			title: { en: 'You just opened the DevTools!', 'pt-br': 'Você acabou de abrir o DevTools!' },
			hint: {
				en: "Do you also love front-end? If you say no, I think you're crazy!",
				'pt-br': 'Você também ama o front-end? Se não amar eu acho que está doido!',
			},
		},
		button: <DevToolsGameTaskButton />,
		points: 10,
	},
	{
		id: 'tetris',
		icon: '👾',
		listItem: {
			title: { en: 'Tetris', 'pt-br': 'Tetris' },
			hint: {
				en: 'What about an actual game?',
				'pt-br': 'Que tal um jogo de verdade?',
			},
		},
		toastItem: {
			title: { en: 'Finally an actual game!', 'pt-br': 'Finalmente um jogo de verdade!' },
			hint: {
				en: 'I probably spend more time playing than developing this feature. P.s.: I marked over 7,000 points.',
				'pt-br':
					'Eu devo ter passado mais tempo jogando do que implementando o jogo. P.s.: Marquei mais de 7.000 pontos.,',
			},
		},
		button: <TetrisGameTaskButton />,
		points: 10,
	},
	{
		id: 'not-found',
		icon: '😵',
		listItem: {
			title: { en: 'Page not found', 'pt-br': 'Página não encontrada' },
			hint: { en: 'Hint: refresh the page as long as you want.', 'pt-br': 'Dica: atualize a página algumas vezes.' },
		},
		toastItem: {
			title: { en: 'Feeling lost?', 'pt-br': 'Se sentido pedido?' },
			hint: {
				en: 'The bad news is: you are lost. The good news: you just earned 10 points.',
				'pt-br': 'O lado negativo: estar perdido. O lado positivo: ganhar 10 pontos.',
			},
		},
		points: 10,
		button: <NotFoundGameTaskButton />,
	},
]
