import AnimatedContent from '@/components/animated/animated-content'
import FollowCursor from '@/components/animated/follow-cursor'
import SplitText from '@/components/animated/split-text'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

import '@/styles/globals.css'

import { Metadata } from 'next'
import { IconArrowLeft } from '@tabler/icons-react'
import { getTranslations } from 'next-intl/server'

import { NotFoundGameTask } from '@/components/game/tasks/not-found-task'

const FOLLOW_CURSOR_ROTATION_FACTOR = 50
const FOLLOW_CURSOR_CARD_WIDTH = '400px'
const FOLLOW_CURSOR_OFFSET_X = -200
const FOLLOW_CURSOR_OFFSET_Y = -200
const FOLLOW_CURSOR_Z_INDEX = 40
const FOLLOW_CURSOR_DURATION = 500
const SPLIT_TEXT_DELAY = 200
const BUTTON_HEIGHT_DEFAULT = 14
const BUTTON_HEIGHT_MD = 16
const BUTTON_MAX_WIDTH_XS = '90vw'

export async function generateMetadata(): Promise<Metadata> {
	const __ = await getTranslations('NotFound')

	return {
		title: __('title'),
	}
}

export default async function NotFound() {
	const gifs = [
		'https://media1.tenor.com/m/kSiC-0wGr4kAAAAC/monkey-technology.gif',
		'https://media1.tenor.com/m/M0na3YR-rTcAAAAd/enter-dev.gif',
		'https://media1.tenor.com/m/U69jGDWAjzsAAAAC/bis-125.gif',
		'https://media1.tenor.com/m/O33wFfiHweMAAAAd/break-smash.gif',
		'https://media1.tenor.com/m/UrOzKURAe4MAAAAd/dog-uncomfortable.gif',
		'https://media1.tenor.com/m/jbALD-i_9V8AAAAd/m%C3%A1rcia-sbt.gif',
		'https://media1.tenor.com/m/jZSWRcuhgV0AAAAd/pandlr-gretchen.gif',
		'https://media1.tenor.com/m/OKdC1U7Ma7MAAAAd/clodovil-straight-face.gif',
		'https://media1.tenor.com/m/NI3cA2KgJMoAAAAd/ines-brasil-lingua.gif',
		'https://media1.tenor.com/m/Q9oQu6dJwYwAAAAd/tulla-luana-tulla.gif',
		'https://media1.tenor.com/m/lTcMVpQWApAAAAAd/silvia-duas-caras.gif',
		'https://media1.tenor.com/m/WbLHCtYa5iEAAAAd/gloria-maria-shade.gif',
		'https://media1.tenor.com/m/CsRwaeb1ONUAAAAd/gloria-maria-gl%C3%B3ria-maria-matta-da-silva.gif',
		'https://media1.tenor.com/m/oGuA7Ahb3RIAAAAd/pandlr-lemonadetour.gif',
		'https://media1.tenor.com/m/6bZK0OnaKacAAAAd/pandlr-deb.gif',
		'https://media1.tenor.com/m/t4gXYxF8LlsAAAAd/debora-globo.gif',
		'https://media1.tenor.com/m/YGIC-2MFCa0AAAAd/gretchen.gif',
		'https://media1.tenor.com/m/0syjW3mh2TIAAAAd/really-tulla-luana.gif',
		'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXI3bGIxemtqMnphZnpnbW95cHprbnRlYndpYzVycTdoN290djJjcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BZFuCsqQEJndM5cLYU/giphy.gif',
		'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWxsYXMxdGhhNndlbHo1NnZ0ejJyNmxueXBhcXpubWVkZXh2NW9kMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HteV6g0QTNxp6/giphy.gif',
	]

	const randomGif = gifs[Math.floor(Math.random() * gifs.length)]

	const __ = await getTranslations('NotFound')

	return (
		<>
			<FollowCursor
				backgroundImage={randomGif}
				rotationFactor={FOLLOW_CURSOR_ROTATION_FACTOR}
				cardWidth={FOLLOW_CURSOR_CARD_WIDTH}
				offsetX={FOLLOW_CURSOR_OFFSET_X}
				offsetY={FOLLOW_CURSOR_OFFSET_Y}
				className={`pointer-events-none fixed inset-1/2 z-[${FOLLOW_CURSOR_Z_INDEX}] opacity-0 transition-opacity duration-${FOLLOW_CURSOR_DURATION} in-hover:!opacity-100`}
			/>

			<NotFoundGameTask />

			<div className="only-touch:opacity-100 absolute inset-0 bg-black opacity-0" />

			<div
				className="only-touch:opacity-25 absolute inset-0 bg-cover bg-center opacity-0"
				style={{ backgroundImage: `url(${randomGif})` }}
			/>

			<div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6">
				<h2 className="font-heading only-touch:text-white pr-4 text-[50vw] leading-none tracking-tighter sm:text-[40vw] md:text-[33vw] lg:text-[25vw] dark:text-white [&>span>span>span:last-child]:!hidden">
					<SplitText text="404" delay={SPLIT_TEXT_DELAY} />
				</h2>

				<AnimatedContent className="relative z-50">
					<Button
						as={Link}
						href="/"
						className={`max-xs:w-[${BUTTON_MAX_WIDTH_XS}] only-mouse:hidden !h-${BUTTON_HEIGHT_DEFAULT} font-medium backdrop-blur-sm md:!h-${BUTTON_HEIGHT_MD}`}
						size="lg"
						variant="outline-touch"
					>
						<IconArrowLeft aria-hidden />
						{__('button')}
					</Button>

					<Button
						as={Link}
						href="/"
						className={`max-xs:w-[${BUTTON_MAX_WIDTH_XS}] only-touch:hidden !h-${BUTTON_HEIGHT_DEFAULT} font-medium backdrop-blur-sm hover:!bg-white hover:!text-black md:!h-${BUTTON_HEIGHT_MD}`}
						size="lg"
						variant="outline"
					>
						<IconArrowLeft />
						{__('button')}
					</Button>
				</AnimatedContent>
			</div>
		</>
	)
}
