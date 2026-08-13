'use client'

import { useEffect, useState } from 'react'
import { Root as DropdownRoot, Trigger as DropdownTrigger } from '@radix-ui/react-dropdown-menu'
import { IconArrowRight, IconBrandSpotify, IconMusic } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'

import { LastFmSkeletons } from '@/components/common/last-fm-skeletons'
import { LastFmTrackItem } from '@/components/common/last-fm-track-item'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { LAST_FM_CONFIG } from '@/config/last-fm'
import { LINKS } from '@/config/links'
import { useGame } from '@/hooks/use-game'
import { useLastFM } from '@/hooks/use-last-fm'

const DROPDOWN_SIDE_OFFSET = 40

export function LastFmHistory() {
	const [open, setOpen] = useState(false)

	const { onCompleteTask } = useGame()

	const locale = useLocale()
	const __ = useTranslations('Default')

	const { data, isFetching, isLoading } = useLastFM({ enabled: open })

	const tracks = data?.tracks?.slice(0, LAST_FM_CONFIG.MAX_TRACKS)
	const hasLoadedTracks = Boolean(tracks?.length) && !isFetching && !isLoading

	useEffect(() => {
		if (!open || !hasLoadedTracks) return
		onCompleteTask('now-playing')
	}, [open, hasLoadedTracks, onCompleteTask])

	const shouldDisplayList = hasLoadedTracks
	const shouldDisplaySkeletons = isLoading || isFetching || !tracks

	return (
		<DropdownRoot open={open} onOpenChange={setOpen}>
			<DropdownTrigger asChild>
				<Button variant="discret" icon className="layout:flex hidden" aria-label={__('lastfm.title')}>
					<IconMusic aria-hidden />
				</Button>
			</DropdownTrigger>

			<DropdownMenu
				className="scrollbar-hidden z-1000 max-h-[calc(var(--radix-dropdown-menu-content-available-height)-2.5rem)] w-[500px] overflow-x-hidden overflow-y-auto"
				side="right"
				align="end"
				avoidCollisions={false}
				sideOffset={DROPDOWN_SIDE_OFFSET}
			>
				<div className="dark:bg-dropdown-dark sticky top-0 z-10 flex items-center gap-2 bg-white py-3 pr-4 pl-3">
					<IconBrandSpotify className="size-7 stroke-[1.5]" aria-hidden />
					<strong className="block grow">{__('lastfm.title')}</strong>
					<Button
						as="a"
						href={LINKS.spotify}
						target="_blank"
						variant="discret"
						aria-label={__('lastfm.button')}
						size="xs"
						icon
					>
						<IconArrowRight aria-hidden />
					</Button>
				</div>

				{shouldDisplaySkeletons && <LastFmSkeletons quantity={LAST_FM_CONFIG.MAX_TRACKS} />}

				{shouldDisplayList &&
					tracks?.map((track) => (
						<LastFmTrackItem key={`${track.name}-${track.playedAt}`} track={track} locale={locale} />
					))}
			</DropdownMenu>
		</DropdownRoot>
	)
}
