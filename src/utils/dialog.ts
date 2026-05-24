export const onDialogOpenAutoFocus = (event: Event) => event.preventDefault()

export const onDialogPointerDownOutside = (event: CustomEvent<{ originalEvent: PointerEvent }>) => {
	const isToast = event.target instanceof Element && event.target.closest('[data-sonner-toast]')
	if (isToast) event.preventDefault()
}
