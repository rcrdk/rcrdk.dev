import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import { HeaderContent } from '@/components/common/header-content'
import { ignorePagesRobots } from '@/config/metadata'

export const metadata: Metadata = {
	robots: ignorePagesRobots,
}

interface ShareLayoutProps {
	children: ReactNode
}

export default function ShareLayout({ children }: Readonly<ShareLayoutProps>) {
	return (
		<div className="disable-themes text-content-light flex min-h-dvh flex-col bg-white">
			<HeaderContent />

			<main className="flex-1">{children}</main>
		</div>
	)
}
