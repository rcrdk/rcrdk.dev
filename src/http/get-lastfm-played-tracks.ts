import { env } from '@/lib/env'

type GetLastFmPlayedTracks = {
	tracks: {
		name: string
		artist: string
		album: string
		cover: string
		url: string
		playedAt: string
	}[]
}

const TEN_MINUTES = 60 * 10
const DELAY_LAST_FM = 500

export async function getLastFmPlayedTracks(): Promise<GetLastFmPlayedTracks | undefined> {
	try {
		await new Promise((resolve) => setTimeout(resolve, DELAY_LAST_FM))

		const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/last-fm`, {
			next: {
				revalidate: TEN_MINUTES,
				tags: ['LASTFM_LAST_PLAYED_TRACKS'],
			},
		})

		const data = await response.json()

		return data
	} catch (error) {
		console.error(error)
	}
}
