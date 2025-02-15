/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'

import projects from '@/data/projects.json' assert { type: 'json' }
import { ProjectDTO, ProjectFilters } from '@/http/types/project'

export async function GET(req: NextRequest) {
	const data: ProjectDTO[] = projects
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
