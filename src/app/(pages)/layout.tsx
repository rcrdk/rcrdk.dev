import type { Metadata } from 'next'

import { HeaderContent } from '@/components/common/header-content'
import { ignorePagesRobots } from '@/config/metadata'

export const metadata: Metadata = {
	robots: ignorePagesRobots,
}

interface Props {
	children: React.ReactNode
}

export default function ShareLayout({ children }: Readonly<Props>) {
	return (
		<div className="disable-themes text-content-light flex min-h-dvh flex-col bg-white">
			<HeaderContent />

			<main className="flex-1">{children}</main>
		</div>
	)
}
