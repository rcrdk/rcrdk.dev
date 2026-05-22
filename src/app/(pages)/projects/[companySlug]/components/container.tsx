import { PageContact } from '@/app/(pages)/components/contact'
import { CompanyProjectsHero } from '@/app/(pages)/projects/[companySlug]/components/hero'
import { CompanyProjectsList } from '@/app/(pages)/projects/[companySlug]/components/projects-list'
import { Container } from '@/components/ui/container'
import type { HistoryProject } from '@/types/history'

interface Props {
	companySlug: string
	projects: HistoryProject[]
}

export function CompanyProjectsContainer({ companySlug, projects }: Readonly<Props>) {
	return (
		<Container sideSpacing="pageContent">
			<CompanyProjectsHero companySlug={companySlug} />
			<CompanyProjectsList projects={projects} />
			<PageContact />
		</Container>
	)
}
