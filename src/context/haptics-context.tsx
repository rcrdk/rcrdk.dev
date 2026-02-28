'use client'

import { createContext, useCallback, useEffect, useRef } from 'react'

export interface HapticsContextValue {
	triggerHaptic: () => void
}

export const HapticsContext = createContext<HapticsContextValue | null>(null)

const HAPTIC_DURATION = 5

export function HapticsProvider({ children }: { children: React.ReactNode }) {
	const inputRef = useRef<React.ComponentRef<'input'> | null>(null)
	const labelRef = useRef<React.ComponentRef<'label'> | null>(null)

	const triggerHaptic = useCallback(() => {
		const hasNavigator = typeof window !== 'undefined'
		const userAgentList = [/iPhone/i, /iPad/i, /iPod/i]
		const isIOS = hasNavigator && userAgentList.some((re) => re.test(navigator.userAgent))

		if (!isIOS && navigator?.vibrate) {
			navigator.vibrate(HAPTIC_DURATION)
			return
		}

		labelRef.current?.click()
	}, [])

	useEffect(() => {
		const el = inputRef.current
		if (el) el.setAttribute('switch', '')
	}, [])

	return (
		<HapticsContext.Provider value={{ triggerHaptic }}>
			{children}

			<label htmlFor="haptic-switch" className="sr-only fixed top-0 left-0" tabIndex={-1} aria-hidden ref={labelRef} />
			<input
				id="haptic-switch"
				type="checkbox"
				className="sr-only fixed top-0 left-0"
				tabIndex={-1}
				aria-hidden
				ref={inputRef}
			/>
		</HapticsContext.Provider>
	)
}
