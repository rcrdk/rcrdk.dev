import { promises as fs } from 'node:fs'
import { NextRequest, NextResponse } from 'next/server'

import { ProjectDTO, ProjectFilters } from '@/http/types/project'

export async function GET(req: NextRequest) {
	const file = await fs.readFile(process.cwd() + '/src/data/projects.json', 'utf8')
	const data: ProjectDTO[] = JSON.parse(file)

	const filter = req.nextUrl.searchParams.get('filter') as ProjectFilters | undefined

	if (filter === 'highlights') {
		const highlightedProjects = data.filter((item) => item.highlighted)
		return NextResponse.json({ projects: highlightedProjects })
	}

	if (filter) {
		const filteredProducts = data.filter((item) => item.categories.includes(filter))
		return NextResponse.json({ projects: filteredProducts })
	}

	return NextResponse.json({ projects: data })
}
