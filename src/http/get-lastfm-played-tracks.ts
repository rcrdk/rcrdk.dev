// Tech Debt: CLAUDE.md requires `server-only` in every src/http/ module, but this
// fetcher runs in the browser through the useLastFM React Query hook. Applying the
// rule needs either a new dependency or moving the fetch server-side — both need approval.
import { env } from '@/lib/env'
import { playedTracksSchema, type PlayedTracks } from '@/schemas/last-fm'

const TEN_MINUTES = 60 * 10
const DELAY_LAST_FM = 500

export async function getLastFmPlayedTracks(): Promise<PlayedTracks | undefined> {
	try {
		await new Promise((resolve) => setTimeout(resolve, DELAY_LAST_FM))

		const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/last-fm`, {
			next: {
				revalidate: TEN_MINUTES,
				tags: ['LASTFM_LAST_PLAYED_TRACKS'],
			},
		})

		const payload = await response.json()
		const parsed = playedTracksSchema.safeParse(payload)

		if (!parsed.success) return undefined

		return parsed.data
	} catch (error) {
		console.error(error)
	}
}
