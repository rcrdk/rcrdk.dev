'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'
import { createPortal } from 'react-dom'

import avatarPicture from '@/assets/avatar.jpg'
import { useGame } from '@/hooks/use-game'
import { useSoundEffect } from '@/hooks/use-sound-effect'
import { cn } from '@/utils/tailwind-cn'

const AVATAR_RAIN_IMAGES: StaticImageData[] = [avatarPicture]

const AVATAR_WIDTH = 200
const AVATAR_HEIGHT = 100
const MIN_CLICKS_TO_COMPLETE = 3
const MIN_FALL_SIZE = 16
const MAX_FALL_SIZE = 64
const MIN_FALL_DURATION_MS = 1400
const MAX_FALL_DURATION_MS = 2800
const MAX_HORIZONTAL_OFFSET = 48
const MIN_HORIZONTAL_DRIFT = -80
const MAX_HORIZONTAL_DRIFT = 80

type FallingAvatar = {
	id: string
	image: StaticImageData
	left: number
	top: number
	size: number
	durationMs: number
	rotation: number
	drift: number
}

interface HeaderAvatarProps {
	className?: string
}

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)
const randomIntBetween = (min: number, max: number) => Math.floor(randomBetween(min, max + 1))

const pickRandomRainImage = () => {
	const lastIndex = AVATAR_RAIN_IMAGES.length - 1
	const index = randomIntBetween(0, lastIndex)
	return AVATAR_RAIN_IMAGES.at(index) ?? avatarPicture
}

const preloadRainImages = () => {
	for (const image of AVATAR_RAIN_IMAGES) {
		const preload = new window.Image()
		preload.src = image.src
	}
}

export function HeaderAvatar({ className }: Readonly<HeaderAvatarProps>) {
	const t = useTranslations('Default')
	const { isGameActive, gameSessionKey, onCompleteTask } = useGame()
	const { playSound } = useSoundEffect()

	const avatarRef = useRef<HTMLSpanElement>(null)
	const clickCountRef = useRef(0)
	const taskCompletedRef = useRef(false)
	const fallingAvatarIdRef = useRef(0)

	const [fallingAvatars, setFallingAvatars] = useState<FallingAvatar[]>([])
	const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

	const setAvatarRef = useCallback((node: HTMLSpanElement | null) => {
		avatarRef.current = node
		if (node && typeof document !== 'undefined') setPortalTarget(document.body)
	}, [])

	function spawnFallingAvatar() {
		const rect = avatarRef.current?.getBoundingClientRect()
		if (!rect) return

		const size = randomIntBetween(MIN_FALL_SIZE, MAX_FALL_SIZE)
		const horizontalOffset = randomBetween(-MAX_HORIZONTAL_OFFSET, MAX_HORIZONTAL_OFFSET)
		const left = rect.left + rect.width / 2 - size / 2 + horizontalOffset
		const top = rect.top + rect.height / 2 - size / 2
		const durationMs = randomIntBetween(MIN_FALL_DURATION_MS, MAX_FALL_DURATION_MS)
		const rotation = randomIntBetween(-540, 540)
		const drift = randomIntBetween(MIN_HORIZONTAL_DRIFT, MAX_HORIZONTAL_DRIFT)

		fallingAvatarIdRef.current += 1

		const fallingAvatar: FallingAvatar = {
			id: String(fallingAvatarIdRef.current),
			image: pickRandomRainImage(),
			left,
			top,
			size,
			durationMs,
			rotation,
			drift,
		}

		setFallingAvatars((previous) => [...previous, fallingAvatar])
		playSound('bubble-pop')
	}

	function handleAvatarClick(event: React.MouseEvent) {
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

	function handleFallAnimationEnd(id: string) {
		setFallingAvatars((previous) => previous.filter((avatar) => avatar.id !== id))
	}

	useEffect(() => {
		clickCountRef.current = 0
		taskCompletedRef.current = false
		setFallingAvatars([])
	}, [gameSessionKey])

	useEffect(() => {
		if (!isGameActive) return
		preloadRainImages()
	}, [isGameActive])

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
					<div className="pointer-events-none fixed inset-0 z-100 overflow-hidden" aria-hidden>
						{fallingAvatars.map((avatar) => (
							<Image
								key={avatar.id}
								src={avatar.image}
								width={avatar.size}
								height={avatar.size}
								alt=""
								className="animate-avatar-fall absolute rounded-full object-cover"
								style={{
									left: avatar.left,
									top: avatar.top,
									width: avatar.size,
									height: avatar.size,
									animationDuration: `${avatar.durationMs}ms`,
									'--avatar-size': `${avatar.size}px`,
									'--fall-start-top': `${avatar.top}px`,
									'--fall-rotate': `${avatar.rotation}deg`,
									'--fall-drift': `${avatar.drift}px`,
								}}
								onAnimationEnd={() => handleFallAnimationEnd(avatar.id)}
							/>
						))}
					</div>,
					portalTarget,
				)}
		</>
	)
}
