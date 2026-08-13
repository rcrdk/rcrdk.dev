import { useContext } from 'react'

import { HapticsContext, type HapticsContextValue } from '@/contexts/haptics-context'

export function useHaptics(): HapticsContextValue {
	const value = useContext(HapticsContext)
	if (!value) throw new Error('useHaptics must be used within HapticsProvider')
	return value
}
