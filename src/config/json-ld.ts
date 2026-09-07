type GetSiteJsonLdParams = {
	url: string
	name: string
	description: string
	jobTitle: string
	image: string
	sameAs: string[]
	locale: string
}

export const getSiteJsonLd = ({
	url,
	name,
	description,
	jobTitle,
	image,
	sameAs,
	locale,
}: Readonly<GetSiteJsonLdParams>) => {
	const personId = `${url}/#person`
	const websiteId = `${url}/#website`
	const profileId = `${url}/#profile`

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ProfilePage',
				'@id': profileId,
				url,
				name,
				description,
				inLanguage: locale,
				mainEntity: { '@id': personId },
				isPartOf: { '@id': websiteId },
			},
			{
				'@type': 'WebSite',
				'@id': websiteId,
				url,
				name,
				description,
				inLanguage: locale,
				publisher: { '@id': personId },
			},
			{
				'@type': 'Person',
				'@id': personId,
				name,
				birthDate: '1996-03-03',
				image,
				url,
				description,
				sameAs,
				jobTitle,
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Timbó',
					addressRegion: 'Santa Catarina',
					addressCountry: 'BR',
				},
				knowsAbout: [
					'Front-end Development',
					'React',
					'Next.js',
					'TypeScript',
					'Node.js',
					'JavaScript',
					'PHP',
					'Laravel',
					'Web Development',
					'UI/UX Design',
					'Responsive Design',
					'Web Performance',
					'Accessibility',
				],
				alumniOf: {
					'@type': 'Organization',
					name: 'Uniasselvi',
					url: 'https://portal.uniasselvi.com.br/',
				},
				hasOccupation: {
					'@type': 'Occupation',
					name: jobTitle,
					occupationLocation: {
						'@type': 'City',
						name: 'Timbó',
						addressRegion: 'Santa Catarina',
						addressCountry: 'BR',
					},
				},
			},
		],
	}

	return jsonLd
}
