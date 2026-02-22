'use client'

import { useState } from 'react'
import Image from 'next/image'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { IconArrowRight, IconBrandSpotify, IconMusic } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { LINKS } from '@/config/links'
import { useGame } from '@/hooks/use-game'
import { useLastFM } from '@/hooks/use-last-fm'
import { lastFmRelativeTime } from '@/lib/dayjs'

export function LastFmHistory() {
	const [open, setOpen] = useState(false)

	const { onCompleteTask } = useGame()

	const locale = useLocale()
	const __ = useTranslations('Default')

	const { data, isFetching, isLoading } = useLastFM({ enabled: open })

	function handleToggleVisibility() {
		setOpen((prev) => !prev)
		onCompleteTask('now-playing')
	}

	const tracks = data?.tracks?.slice(0, 7)

	const shouldDisplayList = tracks && !isFetching && !isLoading
	const shouldDisplaySkeletons = isLoading || isFetching || !tracks

	return (
		<Dropdown.Root open={open} onOpenChange={handleToggleVisibility}>
			<Dropdown.Trigger asChild>
				<Button variant="discret" icon className="layout:flex hidden" aria-label={__('lastfm.title')}>
					<IconMusic aria-hidden />
				</Button>
			</Dropdown.Trigger>

			<DropdownMenu
				className="scrollbar-hidden max-h-[calc(var(--radix-dropdown-menu-content-available-height)-2.5rem)] w-[500px] overflow-x-hidden overflow-y-auto"
				side="right"
				align="end"
				avoidCollisions={false}
				sideOffset={40}
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

				{shouldDisplaySkeletons &&
					Array.from({ length: 7 }).map((_, i) => (
						<div className="flex items-center gap-3 py-2.5 pr-5 pl-3" key={i}>
							<div className="size-10 animate-pulse rounded-sm bg-black/10 [animation-duration:1s] dark:bg-white/15" />
							<div className="flex flex-col items-start gap-2">
								<span className="block h-3 w-72 animate-pulse rounded-sm bg-black/10 [animation-duration:1s] dark:bg-white/15" />
								<span className="block h-2 w-52 animate-pulse rounded-sm bg-black/10 [animation-duration:1s] dark:bg-white/15" />
							</div>
						</div>
					))}

				{shouldDisplayList &&
					tracks?.map((item, index) => {
						const isNowPlaying = item.playedAt === 'Now Playing'
						const artistAndAlbum = `${item.artist} • ${item.album}`

						return (
							<div key={index} className="flex min-w-0 items-center gap-3 py-2.5 pr-5 pl-3">
								<Image
									className="block size-10 shrink-0 rounded-sm bg-black/5 shadow shadow-black/20 dark:bg-white/15"
									src={item.cover}
									width={150}
									height={150}
									alt={`${artistAndAlbum} - ${item.name}`}
								/>

								<div className="min-w-0 grow pr-4 capitalize">
									<h2
										className="overflow-hidden text-sm font-semibold tracking-tight overflow-ellipsis"
										title={item.name}
									>
										{item.name}
									</h2>

									<p
										className="overflow-hidden text-xs tracking-tight overflow-ellipsis text-black/75 dark:text-white/75"
										title={artistAndAlbum}
									>
										{artistAndAlbum}
									</p>
								</div>

								{isNowPlaying && (
									<div className="bg-accent-blue/15 flex size-10 shrink-0 items-center justify-center rounded-full">
										<div className="animate-wave bg-accent-blue mx-[2px] h-2 w-[3px] rounded-xl [animation-delay:-0.4s]" />
										<div className="animate-wave bg-accent-blue mx-[2px] h-3 w-[3px] rounded-xl [animation-delay:-0.2s]" />
										<div className="animate-wave bg-accent-blue mx-[2px] h-4 w-[3px] rounded-xl" />
									</div>
								)}

								{!isNowPlaying && (
									<div className="shrink-0 text-xs text-black/50 dark:text-white/50">
										{lastFmRelativeTime(item.playedAt, locale)}
									</div>
								)}
							</div>
						)
					})}
			</DropdownMenu>
		</Dropdown.Root>
	)
}
