'use client'

import { useTranslations } from 'next-intl'

import { HistoryListMobile } from '@/app/[locale]/components/history-list-mobile'
import { HistorySliderDesktop } from '@/app/[locale]/components/history-slider-desktop'
import { Section } from '@/components/ui/section'
import { APP_CONFIG } from '@/config/app'
import { PROJECTS } from '@/data/projects/index'
import { useWindowSize } from '@/hooks/use-window-size'
import type { HistoryItem } from '@/types/history'
import { enrichHistoryWithProjects } from '@/utils/enrich-history-with-projects'

export function Experiences() {
	const __ = useTranslations('Experiences')
	const { width } = useWindowSize()

	const isDesktop = width >= APP_CONFIG.DESKTOP_LAYOUT_BREAKPOINT

	const { list, ...rest } = {
		list: __.raw('list') as HistoryItem[],
		title: __('title'),
		buttonNextSlideText: __('scrollButton'),
		text: __.raw('text'),
	}

	const listWithProjects = enrichHistoryWithProjects(list, PROJECTS)

	return (
		<Section>
			{isDesktop && <HistorySliderDesktop list={listWithProjects} {...rest} />}
			{!isDesktop && <HistoryListMobile {...rest} list={listWithProjects} />}
		</Section>
	)
}
