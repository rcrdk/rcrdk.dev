import { useState } from 'react'
import Image from 'next/image'
import * as DialogComponent from '@radix-ui/react-dialog'
import { IconArrowLeft, IconUserCircle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import avatarPicture from '@/assets/avatar-v2.jpeg'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { useGame } from '@/hooks/use-game'
import { useHaptics } from '@/hooks/use-haptics'

export function HeroAboutDrawer() {
	const [showContents, setShowContents] = useState(false)

	const { onCompleteTask } = useGame()
	const { triggerHaptic } = useHaptics()

	const __ = useTranslations('Hero')

	function handleShowContents() {
		setShowContents((prev) => !prev)
		onCompleteTask('about-me')
		triggerHaptic()
	}

	function handleCloseDrawer() {
		setShowContents(false)
		triggerHaptic()
	}

	return (
		<>
			<Button variant="outline" size="lg" className="grow" onClick={handleShowContents}>
				<IconUserCircle aria-hidden />
				<span className="font-medium">{__('buttons.about')}</span>
			</Button>

			<Dialog open={showContents} onOpenChange={setShowContents} mode="fullscreen" aria-describedby={undefined}>
				<div className="flex min-h-full flex-col items-center justify-center gap-8 px-6 py-10 text-center sm:gap-6 sm:px-12 sm:py-14">
					<Image
						src={avatarPicture}
						width={280}
						height={280}
						alt={__('title')}
						className="size-60 rounded-full object-cover"
						priority
					/>

					<div className="flex max-w-[768px] flex-col gap-5">
						<DialogComponent.Title className="font-heading xs:text-5xl text-4xl leading-none font-black tracking-tight text-balance sm:text-6xl dark:text-white">
							{__('aboutDrawer.title')}
						</DialogComponent.Title>

						<p className="text-lg leading-relaxed text-balance text-black/75 sm:text-lg dark:text-white/75">
							{__('aboutDrawer.description')}
						</p>
					</div>

					<DialogComponent.Close asChild>
						<Button variant="outline" size="lg" haptic onClick={handleCloseDrawer} className="mt-4 max-sm:w-full">
							<span>{__('aboutDrawer.button')}</span>
							<IconArrowLeft className="rotate-180" aria-hidden />
						</Button>
					</DialogComponent.Close>
				</div>
			</Dialog>
		</>
	)
}
