'use client'

import { useEffect, useState } from 'react'

export function useLazyMount(active: boolean) {
	const [shouldMount, setShouldMount] = useState(active)

	useEffect(() => {
		if (active) setShouldMount(true)
	}, [active])

	return shouldMount
}
