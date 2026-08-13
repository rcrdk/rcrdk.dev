'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { StaticImageData } from 'next/image'

import avatarPicture from '@/assets/avatar.jpg'
import { useSoundEffect } from '@/hooks/use-sound-effect'

export const AVATAR_RAIN_IMAGES: StaticImageData[] = [avatarPicture]

export const MIN_FALL_SIZE = 16
export const MAX_FALL_SIZE = 64

const MIN_FALL_DURATION_MS = 1400
const MAX_FALL_DURATION_MS = 2800
const MAX_HORIZONTAL_OFFSET = 48
const MIN_HORIZONTAL_DRIFT = -80
const MAX_HORIZONTAL_DRIFT = 80
const MIN_ROTATION = -540
const MAX_ROTATION = 540
const HALF = 2

export type FallingAvatar = {
	id: string
	image: StaticImageData
	left: number
	top: number
	size: number
	durationMs: number
	rotation: number
	drift: number
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

type ElementRect = ReturnType<Element['getBoundingClientRect']>

const createFallingAvatar = (rect: ElementRect, id: string): FallingAvatar => {
	const size = randomIntBetween(MIN_FALL_SIZE, MAX_FALL_SIZE)
	const horizontalOffset = randomBetween(-MAX_HORIZONTAL_OFFSET, MAX_HORIZONTAL_OFFSET)

	return {
		id,
		image: pickRandomRainImage(),
		left: rect.left + rect.width / HALF - size / HALF + horizontalOffset,
		top: rect.top + rect.height / HALF - size / HALF,
		size,
		durationMs: randomIntBetween(MIN_FALL_DURATION_MS, MAX_FALL_DURATION_MS),
		rotation: randomIntBetween(MIN_ROTATION, MAX_ROTATION),
		drift: randomIntBetween(MIN_HORIZONTAL_DRIFT, MAX_HORIZONTAL_DRIFT),
	}
}

type UseAvatarRainParams = {
	isGameActive: boolean
	gameSessionKey: number
}

export function useAvatarRain({ isGameActive, gameSessionKey }: UseAvatarRainParams) {
	const { playSound } = useSoundEffect()

	const avatarRef = useRef<HTMLSpanElement>(null)
	const fallingAvatarIdRef = useRef(0)

	const [fallingAvatars, setFallingAvatars] = useState<FallingAvatar[]>([])
	const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

	const setAvatarRef = useCallback((node: HTMLSpanElement | null) => {
		avatarRef.current = node
		if (node && typeof document !== 'undefined') setPortalTarget(document.body)
	}, [])

	const spawnFallingAvatar = useCallback(() => {
		const rect = avatarRef.current?.getBoundingClientRect()
		if (!rect) return

		fallingAvatarIdRef.current += 1

		const fallingAvatar = createFallingAvatar(rect, String(fallingAvatarIdRef.current))

		setFallingAvatars((previous) => [...previous, fallingAvatar])
		playSound('bubble-pop')
	}, [playSound])

	const removeFallingAvatar = useCallback((id: string) => {
		setFallingAvatars((previous) => previous.filter((avatar) => avatar.id !== id))
	}, [])

	useEffect(() => {
		setFallingAvatars([])
	}, [gameSessionKey])

	useEffect(() => {
		if (!isGameActive) return
		preloadRainImages()
	}, [isGameActive])

	return { setAvatarRef, portalTarget, fallingAvatars, spawnFallingAvatar, removeFallingAvatar }
}
