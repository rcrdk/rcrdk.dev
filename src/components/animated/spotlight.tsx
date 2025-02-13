'use client'

import { useEffect, useRef, useState } from 'react'

export const Spotlight = ({ className = '' }) => {
	const divRef = useRef<HTMLDivElement>(null)
	const [isFocused, setIsFocused] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [opacity, setOpacity] = useState(0)

	useEffect(() => {
		if (!divRef.current || isFocused) return

		const handleMouseMove = (e: MouseEvent) => {
			if (!divRef.current) return

			const rect = divRef.current.getBoundingClientRect()
			setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
		}

		const handleFocus = () => {
			setIsFocused(true)
			setOpacity(1)
		}

		const handleBlur = () => {
			setIsFocused(false)
			setOpacity(0)
		}

		const handleMouseEnter = () => {
			setOpacity(1)
		}

		const handleMouseLeave = () => {
			setOpacity(0)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('focus', handleFocus)
		document.addEventListener('blur', handleBlur)
		document.addEventListener('mouseenter', handleMouseEnter)
		document.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('focus', handleFocus)
			document.removeEventListener('blur', handleBlur)
			document.removeEventListener('mouseenter', handleMouseEnter)
			document.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [isFocused])

	return (
		<div ref={divRef} className={`pointer-events-none fixed inset-0 z-9999 overflow-hidden ${className}`}>
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
				style={{
					opacity,
					background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgb(0 166 188 / 16%), transparent 80%)`,
				}}
			/>
		</div>
	)
}
