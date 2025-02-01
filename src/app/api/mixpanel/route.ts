import Mixpanel from 'mixpanel'
import { NextResponse } from 'next/server'

import { env } from '@/lib/env'

const mixpanelEvent = env.MIXPANEL_SECRET
	? Mixpanel.init(env.MIXPANEL_SECRET)
	: undefined

export async function POST(request: Request) {
	if (!mixpanelEvent) {
		return NextResponse.json({ message: 'Nothing to do.' }, { status: 200 })
	}

	try {
		const data = await request.json()

		const { event, properties } = data
		mixpanelEvent.track(event, properties)

		return NextResponse.json({ status: 'Event tracked successfully.' })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error.' },
			{ status: 500 },
		)
	}
}
