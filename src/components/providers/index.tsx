'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { GameContextProvider } from '@/context/game-context'
import { env } from '@/lib/env'
import { queryClient } from '@/lib/react-query'

const TOASTER_OFFSET = 40
const TOASTER_MOBILE_OFFSET = 24
const TOASTER_MAX_WIDTH = 540
const TOASTER_MAX_MOBILE_WIDTH = 48

type Props = {
	children: React.ReactNode
	i18n: {
		locale: string
		messages: AbstractIntlMessages
	}
	shouldEnableGA: boolean
}

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function Providers({ children, i18n, shouldEnableGA }: Readonly<Props>) {
	return (
		<NextIntlClientProvider messages={i18n.messages} locale={i18n.locale} timeZone={timeZone}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute="data-mode">
					<GameContextProvider>
						{children}

						<Toaster
							offset={TOASTER_OFFSET}
							mobileOffset={TOASTER_MOBILE_OFFSET}
							className="!pointer-events-auto"
							toastOptions={{
								unstyled: false,
								classNames: {
									content: 'grow',
									toast: `select-none !py-3 !px-5 xs:!py-4 xs!px-7 squircle-rounded !rounded-3xl !h-auto !border-black/15 !shadow-2xl max-[600px]:!w-[calc(100vw-${TOASTER_MAX_MOBILE_WIDTH}px)] !w-[${TOASTER_MAX_WIDTH}px] !gap-2 xs:!gap-3 !bg-white/90 backdrop-blur-xs dark:!bg-dropdown-dark dark:!border-white/20 max-xs:!flex-col`,
									title:
										'!text-sm text-balance !leading-[1.25] !text-content-light dark:!text-white max-xs:!text-center',
									icon: '!text-3xl !size-auto',
								},
							}}
						/>

						{shouldEnableGA && <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />}
					</GameContextProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</NextIntlClientProvider>
	)
}
