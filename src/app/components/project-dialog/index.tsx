'use client'

import { useLocale } from 'next-intl'

import { Content } from '@/app/components/project-dialog/content'
import { Shell } from '@/app/components/project-dialog/shell'
import type { LocalesType } from '@/i18n/config'
import type { HistoryProject } from '@/types/history'

interface ProjectDialogProps {
	data: HistoryProject
	open: boolean
	onOpenChange: (open: boolean) => void
	disableTheme?: boolean
}

export function ProjectDialog({ data, open, onOpenChange, disableTheme = false }: Readonly<ProjectDialogProps>) {
	const locale = useLocale() as LocalesType
	const hasGallery = data.gallery.length > 0
	const variant = hasGallery ? 'gallery' : 'cover'

	return (
		<Shell
			open={open}
			onOpenChange={onOpenChange}
			variant={variant}
			disableTheme={disableTheme}
			aria-describedby={undefined}
		>
			<Content data={data} locale={locale} hasGallery={hasGallery} />
		</Shell>
	)
}
