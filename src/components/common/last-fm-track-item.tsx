'use client'

import Image from 'next/image'

import { LAST_FM_NOW_PLAYING_LABEL } from '@/config/last-fm'
import { lastFmRelativeTime } from '@/lib/dayjs'
import type { PlayedTracks } from '@/schemas/last-fm'

const COVER_IMAGE_SIZE = 150

type PlayedTrack = PlayedTracks['tracks'][number]

interface LastFmTrackItemProps {
	track: PlayedTrack
	locale: string
}

export function LastFmTrackItem({ track, locale }: Readonly<LastFmTrackItemProps>) {
	const isNowPlaying = track.playedAt === LAST_FM_NOW_PLAYING_LABEL
	const artistAndAlbum = `${track.artist} • ${track.album}`

	return (
		<div className="flex min-w-0 items-center gap-3 py-2.5 pr-5 pl-3">
			<Image
				className="block size-10 shrink-0 rounded-sm bg-black/5 shadow shadow-black/20 dark:bg-white/15"
				src={track.cover}
				width={COVER_IMAGE_SIZE}
				height={COVER_IMAGE_SIZE}
				alt={`${artistAndAlbum} - ${track.name}`}
			/>

			<div className="min-w-0 grow pr-4 capitalize">
				<h2 className="overflow-hidden text-sm font-semibold tracking-tight overflow-ellipsis" title={track.name}>
					{track.name}
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
					{lastFmRelativeTime(track.playedAt, locale)}
				</div>
			)}
		</div>
	)
}
