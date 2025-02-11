'use client'

import { IconArrowUp } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/utils/scroll-to-section'
import { cn } from '@/utils/tailwind-cn'

export function ScrollStart() {
	const [showButton, setShowButton] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShowButton(true)
				} else {
					setShowButton(false)
				}

				// observer.unobserve(element)
			},
			{ threshold: 0.1 },
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	return (
		<>
			<div
				className="inset-top-0 pointer-events-none absolute inset-x-0 h-dvh"
				ref={ref}
			/>

			<div
				className={cn(
					'xs:right-6 xs:bottom-6 layout:right-11 fixed right-4 bottom-4 z-50 transition-transform sm:right-8 sm:bottom-8 md:right-10 md:bottom-10',
					showButton
						? 'translate-y-[200%] duration-1000'
						: 'translate-y-0 duration-300',
				)}
			>
				<Button
					as="a"
					href="#home"
					variant="discret"
					className="backdrop-blur-xs"
					tabIndex={showButton ? 0 : -1}
					onClick={(e) => scrollToSection(e, '#home')}
					icon
				>
					<IconArrowUp />
				</Button>
			</div>
		</>
	)
}
