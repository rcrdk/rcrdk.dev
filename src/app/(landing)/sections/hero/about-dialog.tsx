'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { IconUserCircle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'
import { useHaptics } from '@/hooks/use-haptics'
import { useLazyMount } from '@/hooks/use-lazy-mount'

const HeroAboutDialogPanel = dynamic(
	() =>
		import('@/app/(landing)/sections/hero/about-dialog-panel').then((module) => ({
			default: module.HeroAboutDialogPanel,
		})),
	{ ssr: false },
)

export function HeroAboutDialog() {
	const [showContents, setShowContents] = useState(false)
	const shouldMountPanel = useLazyMount(showContents)

	const { onCompleteTask } = useGame()
	const { triggerHaptic } = useHaptics()

	const __ = useTranslations('Hero')

	function handleShowContents() {
		setShowContents((prev) => !prev)
		onCompleteTask('about-me')
		triggerHaptic()
	}

	return (
		<>
			<Button variant="outline" size="lg" className="grow" onClick={handleShowContents}>
				<IconUserCircle aria-hidden />
				<span className="font-medium">{__('buttons.about')}</span>
			</Button>

			{shouldMountPanel && <HeroAboutDialogPanel open={showContents} onOpenChange={setShowContents} />}
		</>
	)
}
