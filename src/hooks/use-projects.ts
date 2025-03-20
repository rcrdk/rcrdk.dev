import { useQuery } from '@tanstack/react-query'

import { getProjects } from '@/http/get-projects'
import { ProjectFilters } from '@/http/types/project'

type Props = {
	filter: ProjectFilters
}

export function useProjects({ filter }: Props) {
	return useQuery({
		queryKey: ['PROJECTS', filter],
		queryFn: async () => await getProjects({ filter }),
		refetchOnWindowFocus: false,
	})
}
