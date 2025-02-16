import { ProjectWithLocaleDTO } from '@/http/types/project'
import { env } from '@/lib/env'

type GetProjectRequest = {
	id: number
}

type GetProjectResponse = {
	project: ProjectWithLocaleDTO
}

export async function getProject({ id }: GetProjectRequest): Promise<GetProjectResponse | undefined> {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/projects/${id}`, {
			method: 'GET',
		})

		return await response.json()
	} catch (error) {
		console.error('Error :::', error)
	}
}
