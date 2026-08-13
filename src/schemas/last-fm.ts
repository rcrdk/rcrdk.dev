import { z } from 'zod'

const lastFmTextSchema = z.object({ '#text': z.string() })

export const lastFmResponseSchema = z.object({
	recenttracks: z.object({
		track: z.array(
			z.object({
				name: z.string(),
				url: z.string(),
				artist: lastFmTextSchema,
				album: lastFmTextSchema,
				image: z.array(lastFmTextSchema),
				date: lastFmTextSchema.optional(),
			}),
		),
	}),
})

export const playedTrackSchema = z.object({
	name: z.string(),
	artist: z.string(),
	album: z.string(),
	cover: z.string(),
	url: z.string(),
	playedAt: z.string(),
})

export const playedTracksSchema = z.object({ tracks: z.array(playedTrackSchema) })

export type PlayedTracks = z.infer<typeof playedTracksSchema>
