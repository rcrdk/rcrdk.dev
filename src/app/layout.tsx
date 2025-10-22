import '@/styles/globals.css'
import '@/styles/tetris.css'

import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'

import { env } from '@/lib/env'
import { Providers } from '@/providers'

type Props = {
	children: React.ReactNode
}

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	applicationName: 'Ricardo Augusto Kowalski',
	authors: { name: 'Ricardo Augusto Kowalski', url: env.NEXT_PUBLIC_APP_URL },
	generator: 'Next.js',
	formatDetection: { telephone: false },
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
	],
}

export default async function RootLayout({ children }: Props) {
	const messages = await getMessages()

	const cookieStore = await cookies()
	const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'en'

	const shouldEnableGA = process.env.NODE_ENV === 'production' && !!env.NEXT_PUBLIC_GOOGLE_ANALYTICS

	return (
		<html
			lang={locale}
			translate="no"
			className="text-content-light dark:text-content-dark layout:overflow-hidden w-full scroll-smooth bg-white font-sans antialiased dark:bg-black"
			suppressHydrationWarning
		>
			<body className="text-content-light dark:text-content-dark layout:overflow-y-auto layout:snap-y layout:snap-mandatory layout:h-dvh w-full overflow-x-hidden scroll-smooth">
				<Providers i18n={{ messages, locale }}>
					{children}

					<Toaster
						offset={40}
						mobileOffset={24}
						className="!pointer-events-auto"
						toastOptions={{
							unstyled: false,
							classNames: {
								content: 'grow',
								toast:
									'select-none !py-3 !px-5 xs:!py-4 xs!px-7 !rounded-3xl !h-auto !border-black/15 !shadow-2xl max-[600px]:!w-[calc(100vw-48px)] !w-[540px] !gap-2 xs:!gap-3 !bg-white/90 backdrop-blur-xs dark:!bg-dropdown-dark dark:!border-white/20 max-xs:!flex-col',
								title: '!text-sm text-balance !leading-[1.25] !text-content-light dark:!text-white max-xs:!text-center',
								icon: '!text-3xl !size-auto',
							},
						}}
					/>

					{shouldEnableGA && <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />}
				</Providers>
			</body>
		</html>
	)
}
