/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'

import projects from '@/data/projects.json' assert { type: 'json' }
import { ProjectDTO, ProjectFilters, ProjectWithLocaleDTO } from '@/http/types/project'
import { cookies } from 'next/headers'
import { LocalesType } from '@/i18n/routing'

export async function GET(req: NextRequest) {
	const filter = req.nextUrl.searchParams.get('filter') as ProjectFilters | undefined

	const cookieStore = await cookies()
	const locale = (cookieStore.get('NEXT_LOCALE')?.value ?? 'en') as LocalesType

	const data: ProjectDTO[] = projects

	let projectsFiltered: ProjectWithLocaleDTO[] = data.map((item) => ({
		...item,
		intro: item.intro[locale],
		description: item.description[locale],
	}))

	if (filter === 'highlights') {
		projectsFiltered = projectsFiltered.filter((item) => item.highlighted)
	}

	if (filter && filter !== 'highlights') {
		projectsFiltered = projectsFiltered.filter((item) => item.categories.includes(filter))
	}

	return NextResponse.json({ projects: projectsFiltered })
}
