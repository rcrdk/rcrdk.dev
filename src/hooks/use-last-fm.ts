import { useQuery } from '@tanstack/react-query'

import { getLastFmPlayedTracks } from '@/http/get-lastfm-played-tracks'

interface UseLastFmParams {
	enabled: boolean
}

export function useLastFM({ enabled }: UseLastFmParams) {
	return useQuery({
		queryKey: ['GET_LASTFM_TRACKS'],
		enabled,
		queryFn: async () => await getLastFmPlayedTracks(),
		refetchOnWindowFocus: false,
	})
}
