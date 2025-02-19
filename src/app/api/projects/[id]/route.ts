/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'

import projects from '@/data/projects.json' assert { type: 'json' }
import { ProjectDTO, ProjectWithLocaleDTO } from '@/http/types/project'
import { cookies } from 'next/headers'
import { LocalesType } from '@/i18n/routing'


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
	const { id } = await params

	const cookieStore = await cookies()
	const locale = (cookieStore.get('NEXT_LOCALE')?.value ?? 'en') as LocalesType

	const data: ProjectDTO[] = projects
	const project = data.find((item) => item.id === Number(id))

	if (!project) {
		return NextResponse.json({ message: 'Not Found' }, { status: 404 })
	}
	
	const projectLocale: ProjectWithLocaleDTO = {
		...project,
		intro: project.intro[locale],
		description: project.description[locale],
	}

	return NextResponse.json({ project: projectLocale })
}
