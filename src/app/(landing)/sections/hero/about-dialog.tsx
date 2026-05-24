import { useState } from 'react'
import * as DialogComponent from '@radix-ui/react-dialog'
import { IconArrowLeft, IconUserCircle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { AboutDialogWrapper } from '@/app/(landing)/sections/hero/about-dialog-wrapper'
import avatarPicture from '@/assets/avatar-v2.jpeg'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { useGame } from '@/hooks/use-game'
import { useHaptics } from '@/hooks/use-haptics'

export function HeroAboutDialog() {
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

			<AboutDialogWrapper open={showContents} onOpenChange={setShowContents} aria-describedby={undefined}>
				<div className="xs:gap-8 flex min-h-full flex-col items-center justify-center gap-6 px-6 py-10 text-center sm:gap-6 sm:px-12 sm:py-14">
					<Image
						src={avatarPicture}
						width={280}
						height={280}
						alt={__('title')}
						className="xs:size-50 size-36 rounded-full object-cover sm:size-60"
					/>

					<div className="xs:gap-5 flex max-w-[768px] flex-col gap-4">
						<DialogComponent.Title className="font-heading xs:text-5xl text-3xl leading-none font-black tracking-tight text-balance sm:text-6xl dark:text-white">
							{__('aboutDialog.title')}
						</DialogComponent.Title>

						<p className="xs:text-lg text-base leading-relaxed text-balance text-black/75 sm:text-lg dark:text-white/75">
							{__('aboutDialog.description')}
						</p>
					</div>

					<DialogComponent.Close asChild>
						<Button variant="outline" size="lg" haptic onClick={handleCloseDrawer} className="mt-4 max-sm:w-full">
							<span>{__('aboutDialog.button')}</span>
							<IconArrowLeft className="rotate-180" aria-hidden />
						</Button>
					</DialogComponent.Close>
				</div>
			</AboutDialogWrapper>
		</>
	)
}
