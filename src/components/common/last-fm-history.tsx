'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { IconArrowRight, IconBrandSpotify, IconMusic } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { LINKS } from '@/config/links'
import { useLastFM } from '@/hooks/use-last-fm'
import { lastFmRelativeTime } from '@/lib/dayjs'

export function LastFmHistory() {
	const [open, setOpen] = useState(false)

	const locale = useLocale()
	const __ = useTranslations('Default')

	const { data, isFetching, isLoading } = useLastFM({ enabled: open })

	const tracks = useMemo(() => {
		return data?.tracks?.slice(0, 7)
	}, [data?.tracks])

	const shouldDisplayList = tracks && !isFetching && !isLoading
	const shouldDisplaySkeletons = isLoading || isFetching || !tracks

	return (
		<Dropdown.Root open={open} onOpenChange={() => setOpen((prev) => !prev)}>
			<Dropdown.Trigger asChild>
				<Button variant="discret" icon className="layout:flex hidden" aria-label={__('lastfm.title')}>
					<IconMusic />
				</Button>
			</Dropdown.Trigger>

			<Dropdown.Content
				side="right"
				align="end"
				avoidCollisions={false}
				sideOffset={40}
				className="data-[state='open']:animate-dropdown-in data-[state='closed']:animate-dropdown-out shadow-dialog dark:bg-dropdown-dark w-[500px] [transform-origin:var(--radix-dropdown-menu-content-transform-origin)] divide-y divide-black/10 rounded-xl border border-black/20 bg-white whitespace-nowrap will-change-transform dark:divide-white/15 dark:border-white/20"
			>
				<div className="flex items-center gap-2 py-3 pr-4 pl-3">
					<IconBrandSpotify className="size-7 stroke-[1.5]" />
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
						<IconArrowRight className="stroke-[1.25]" />
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
					tracks?.map((item, index) => (
						<div key={index} className="flex min-w-0 items-center gap-3 py-2.5 pr-5 pl-3">
							<Image
								className="block size-10 shrink-0 rounded-sm bg-black/5 dark:bg-white/15"
								src={item.cover}
								width={150}
								height={150}
								alt={`${item.artist} - ${item.name}`}
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
									title={`${item.artist} • ${item.album}`}
								>
									{item.artist} • {item.album}
								</p>
							</div>

							{item.playedAt === 'Now Playing' ? (
								<div className="bg-accent-blue/15 flex size-10 shrink-0 items-center justify-center rounded-full">
									<div className="animate-wave bg-accent-blue mx-[2px] h-2 w-[3px] rounded-xl [animation-delay:-0.4s]" />
									<div className="animate-wave bg-accent-blue mx-[2px] h-3 w-[3px] rounded-xl [animation-delay:-0.2s]" />
									<div className="animate-wave bg-accent-blue mx-[2px] h-4 w-[3px] rounded-xl" />
								</div>
							) : (
								<div className="shrink-0 text-xs text-black/50 dark:text-white/50">
									{lastFmRelativeTime(item.playedAt, locale)}
								</div>
							)}
						</div>
					))}
			</Dropdown.Content>
		</Dropdown.Root>
	)
}
