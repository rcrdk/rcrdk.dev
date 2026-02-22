'use client'

import { useRef } from 'react'
import { IconArrowUp } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { scrollToSection } from '@/utils/scroll-to-section'
import { cn } from '@/utils/tailwind-cn'

export function ScrollStart() {
	const ref = useRef<HTMLDivElement>(null)

	const showButton = useIntersectionObserver(ref, { threshold: 0.1, once: false })

	const tabIndex = showButton ? 0 : -1

	return (
		<>
			<div className="inset-top-0 pointer-events-none absolute inset-x-0 h-dvh" ref={ref} />

			<div
				className={cn(
					'xs:right-6 xs:bottom-6 layout:right-11 fixed right-4 bottom-4 z-50 transition-transform sm:right-8 sm:bottom-8 md:right-10 md:bottom-10',
					showButton && 'translate-y-[200%] duration-1000',
					!showButton && 'translate-y-0 duration-300',
				)}
			>
				<Button
					as="a"
					href="#about"
					variant="discret"
					className="backdrop-blur-xs"
					tabIndex={tabIndex}
					onClick={(e) => scrollToSection(e, '#about')}
					icon
				>
					<IconArrowUp aria-hidden />
				</Button>
			</div>
		</>
	)
}
