import { useState } from 'react'
import { IconUserCircle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHandler, DrawerTitle } from '@/components/ui/drawer'
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

	return (
		<Drawer open={showContents} onOpenChange={setShowContents}>
			<Button variant="outline" size="lg" className="grow" onClick={handleShowContents}>
				<IconUserCircle aria-hidden />
				<span className="font-medium">{__('buttons.about')}</span>
			</Button>

			{/* TODO: Add contents */}
			<DrawerContent size="full" className="h-auto">
				<DrawerHandler />
				<DrawerTitle className="text-center text-[10rem]">👀</DrawerTitle>
			</DrawerContent>
		</Drawer>
	)
}
