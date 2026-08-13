import { NextResponse } from 'next/server'

import { LAST_FM_CONFIG } from '@/config/last-fm'
import { env } from '@/lib/env'
import { lastFmResponseSchema } from '@/schemas/last-fm'

const NOW_PLAYING_LABEL = 'Now Playing'
const UNKNOWN_COVER = ''
const INTERNAL_ERROR_MESSAGE = 'Internal server error.'
const UPSTREAM_ERROR_MESSAGE = 'Could not load the recently played tracks.'

export async function GET() {
	try {
		const lastPlayedTracksUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${env.LASTFM_USERNAME}&api_key=${env.LASTFM_API_KEY}&format=json&limit=${LAST_FM_CONFIG.MAX_TRACKS}`

		const response = await fetch(lastPlayedTracksUrl)
		const payload = await response.json()
		const parsed = lastFmResponseSchema.safeParse(payload)

		if (!parsed.success) {
			console.error('Unexpected Last.fm payload', parsed.error)
			return NextResponse.json({ message: UPSTREAM_ERROR_MESSAGE }, { status: 502 })
		}

		const tracks = parsed.data.recenttracks.track.map((track) => ({
			name: track.name,
			artist: track.artist['#text'],
			album: track.album['#text'],
			cover: track.image.at(-1)?.['#text'] ?? UNKNOWN_COVER,
			url: track.url,
			playedAt: track.date?.['#text'] ?? NOW_PLAYING_LABEL,
		}))

		return NextResponse.json({ tracks }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ message: INTERNAL_ERROR_MESSAGE }, { status: 500 })
	}
}
