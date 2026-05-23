import type { Swiper as SwiperInstance } from 'swiper'

const getEventTargetElement = (event: TouchEvent | MouseEvent | PointerEvent): Element | null => {
	if (event.target instanceof Element) return event.target
	return null
}

export const handleParentTouchStart = (swiper: SwiperInstance, event: TouchEvent | MouseEvent | PointerEvent) => {
	if (!swiper) return

	const target = getEventTargetElement(event)
	if (target?.closest('[data-nested-swiper]')) swiper.allowTouchMove = false
}

export const handleParentTouchEnd = (swiper: SwiperInstance) => {
	if (swiper) swiper.allowTouchMove = true
}
