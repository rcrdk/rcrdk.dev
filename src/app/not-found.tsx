import { AnimatedContent } from '@/components/animated/animated-content'
import { AnimatedSplitText } from '@/components/animated/animated-split-text'
import FollowCursor from '@/components/animated/follow-cursor'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

import '@/styles/globals.css'

import type { Metadata } from 'next'
import { IconArrowLeft } from '@tabler/icons-react'
import { getTranslations } from 'next-intl/server'

import { NotFoundGameTask } from '@/components/game/tasks/not-found-task'
import { NOT_FOUND_GIFS } from '@/config/gifs'

const FOLLOW_CURSOR_ROTATION_FACTOR = 50
const FOLLOW_CURSOR_CARD_WIDTH = '400px'
const FOLLOW_CURSOR_OFFSET_X = -200
const FOLLOW_CURSOR_OFFSET_Y = -200
const FOLLOW_CURSOR_Z_INDEX = 40
const FOLLOW_CURSOR_DURATION = 500
const SPLIT_TEXT_DELAY = 200

export async function generateMetadata(): Promise<Metadata> {
	const __ = await getTranslations('NotFound')

	return {
		title: __('title'),
	}
}

export default async function NotFound() {
	const randomGif = NOT_FOUND_GIFS[Math.floor(Math.random() * NOT_FOUND_GIFS.length)]

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
					<AnimatedSplitText text="404" delay={SPLIT_TEXT_DELAY} />
				</h2>

				<AnimatedContent className="relative z-50">
					<Link href="/">
						<Button
							as="span"
							className={`max-xs:w-[90vw] only-mouse:hidden !h-14 font-medium backdrop-blur-sm md:!h-16`}
							size="lg"
							variant="outline-touch"
						>
							<IconArrowLeft aria-hidden />
							{__('button')}
						</Button>
					</Link>

					<Link href="/">
						<Button
							as="span"
							className={`max-xs:w-[90vw] only-touch:hidden !h-14 font-medium backdrop-blur-sm hover:!bg-white hover:!text-black md:!h-16`}
							size="lg"
							variant="outline"
						>
							<IconArrowLeft aria-hidden />
							{__('button')}
						</Button>
					</Link>
				</AnimatedContent>
			</div>
		</>
	)
}
