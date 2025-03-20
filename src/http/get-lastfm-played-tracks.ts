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

export async function getLastFmPlayedTracks(): Promise<GetLastFmPlayedTracks> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 500))

		const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/lastfm`, {
			next: {
				revalidate: 60 * 10, // 10min
				tags: ['LASTFM_LAST_PLAYED_TRACKS'],
			},
		})

		const data = await response.json()

		return data
	} catch (error) {
		console.error(error)

		return {
			tracks: [],
		}
	}
}
