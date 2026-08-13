'use client'

import Image from 'next/image'

import type { FallingAvatar } from '@/hooks/use-avatar-rain'

interface AvatarRainLayerProps {
	fallingAvatars: FallingAvatar[]
	onFallAnimationEnd: (id: string) => void
}

export function AvatarRainLayer({ fallingAvatars, onFallAnimationEnd }: Readonly<AvatarRainLayerProps>) {
	return (
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
					onAnimationEnd={() => onFallAnimationEnd(avatar.id)}
				/>
			))}
		</div>
	)
}
