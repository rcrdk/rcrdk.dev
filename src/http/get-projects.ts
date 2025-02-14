import { ProjectDTO, ProjectFilters } from '@/http/types/project'
import { env } from '@/lib/env'

type GetProjectsRequest = {
	filter: ProjectFilters
}

type GetProjectsResponse = {
	projects: ProjectDTO[]
}

export async function getProjects({ filter }: GetProjectsRequest): Promise<GetProjectsResponse | undefined> {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/projects?filter=${filter}`, {
			method: 'GET',
		})

		return await response.json()
	} catch (error) {
		console.error('Error :::', error)
	}
}
