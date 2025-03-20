import { useQuery } from '@tanstack/react-query'

import { getProject } from '@/http/get-project'

type Props = {
	projectId: number
	enabled: boolean
}

export function useProject({ projectId, enabled }: Props) {
	return useQuery({
		queryKey: ['PROJECT', projectId],
		enabled,
		queryFn: async () => await getProject({ id: projectId }),
		refetchOnWindowFocus: false,
	})
}
