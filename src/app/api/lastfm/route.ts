import { NextResponse } from 'next/server'

import { env } from '@/lib/env'

export async function GET() {
	try {
		const lastPlayedTracksUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${env.LASTFM_USENAME}&api_key=${env.LASTFM_API_KEY}&format=json&limit=10`

		const response = await fetch(lastPlayedTracksUrl)
		const data = await response.json()

		const tracks = data.recenttracks.track.map((track: any) => {
			return {
				name: track.name,
				artist: track.artist['#text'],
				album: track.album['#text'],
				cover: track.image[track.image.length - 1]['#text'],
				url: track.url,
				playedAt: track.date ? track.date['#text'] : 'Now Playing',
			}
		})

		return NextResponse.json({ tracks }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ message: error.message ?? 'Internal server error.' }, { status: 500 })
	}
}
