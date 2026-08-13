'use client'

import { useEffect, useRef, type MouseEvent } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { createPortal } from 'react-dom'

import avatarPicture from '@/assets/avatar.jpg'
import { AvatarRainLayer } from '@/components/common/avatar-rain-layer'
import { AVATAR_RAIN_IMAGES, MAX_FALL_SIZE, useAvatarRain } from '@/hooks/use-avatar-rain'
import { useGame } from '@/hooks/use-game'
import { cn } from '@/utils'

const AVATAR_WIDTH = 200
const AVATAR_HEIGHT = 100
const MIN_CLICKS_TO_COMPLETE = 3

interface HeaderAvatarProps {
	className?: string
}

export function HeaderAvatar({ className }: Readonly<HeaderAvatarProps>) {
	const t = useTranslations('Default')
	const { isGameActive, gameSessionKey, onCompleteTask } = useGame()

	const clickCountRef = useRef(0)
	const taskCompletedRef = useRef(false)

	const { setAvatarRef, portalTarget, fallingAvatars, spawnFallingAvatar, removeFallingAvatar } = useAvatarRain({
		isGameActive,
		gameSessionKey,
	})

	function handleAvatarClick(event: MouseEvent) {
		if (!isGameActive) return

		event.preventDefault()
		event.stopPropagation()

		spawnFallingAvatar()

		clickCountRef.current += 1

		const hasEnoughClicks = clickCountRef.current >= MIN_CLICKS_TO_COMPLETE
		if (!hasEnoughClicks || taskCompletedRef.current) return

		taskCompletedRef.current = true
		onCompleteTask('avatar-rain')
	}

	useEffect(() => {
		clickCountRef.current = 0
		taskCompletedRef.current = false
	}, [gameSessionKey])

	return (
		<>
			<span ref={setAvatarRef} className="relative inline-flex shrink-0">
				<Image
					src={avatarPicture}
					width={AVATAR_WIDTH}
					height={AVATAR_HEIGHT}
					alt={t('avatarAlt')}
					className={cn(className, isGameActive && 'cursor-pointer active:scale-95 motion-reduce:active:scale-100')}
					onClick={handleAvatarClick}
				/>
			</span>

			{isGameActive && (
				<div className="pointer-events-none absolute size-0 overflow-hidden opacity-0" aria-hidden>
					{AVATAR_RAIN_IMAGES.map((image) => (
						<Image key={image.src} src={image} width={MAX_FALL_SIZE} height={MAX_FALL_SIZE} alt="" priority />
					))}
				</div>
			)}

			{portalTarget &&
				createPortal(
					<AvatarRainLayer fallingAvatars={fallingAvatars} onFallAnimationEnd={removeFallingAvatar} />,
					portalTarget,
				)}
		</>
	)
}
