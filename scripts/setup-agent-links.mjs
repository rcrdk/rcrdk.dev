import { spawnSync } from 'node:child_process'
import { existsSync, lstatSync, mkdirSync, readlinkSync, rmSync, symlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Listr } from 'listr2'

const isCi = ['1', 'true'].includes(String(process.env.CI ?? '').toLowerCase())

if (isCi) {
	console.log('Skipping agent symlinks in CI.')
	process.exit(0)
}

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')

const LINKS = [
	{ link: '.cursor/rules', target: '../agents/rules' },
	{ link: '.cursor/skills', target: '../agents/skills' },
	{ link: '.claude/rules', target: '../agents/rules' },
	{ link: '.claude/skills', target: '../agents/skills' },
	{ link: 'CLAUDE.md', target: 'AGENTS.md' },
	{ link: '.cursorrules', target: 'agents/commit-messages.cursorrules' },
]

const setupLink = (relativeLink, relativeTarget) => {
	const linkPath = join(ROOT, relativeLink)
	const parentDir = dirname(linkPath)

	if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true })

	if (existsSync(linkPath)) {
		const stats = lstatSync(linkPath)

		if (!stats.isSymbolicLink())
			throw new Error(`${relativeLink} exists and is not a symlink. Remove it manually and run again.`)

		const currentTarget = readlinkSync(linkPath)
		if (currentTarget === relativeTarget) return { status: 'unchanged', link: relativeLink, target: relativeTarget }

		rmSync(linkPath)
		symlinkSync(relativeTarget, linkPath)
		return { status: 'updated', link: relativeLink, target: relativeTarget, previousTarget: currentTarget }
	}

	symlinkSync(relativeTarget, linkPath)
	return { status: 'linked', link: relativeLink, target: relativeTarget }
}

const formatLinkStatus = ({ link, status, previousTarget }) => {
	if (status === 'linked') return `${link} — created`
	if (status === 'updated') return `${link} — updated from ${previousTarget}`

	return `${link} — already linked`
}

const removeStaleGitIndexEntries = () => {
	const listResult = spawnSync('git', ['ls-files', '.cursor/rules'], { cwd: ROOT, encoding: 'utf8' })

	if (listResult.status !== 0) return []

	const trackedFiles = listResult.stdout.trim().split('\n').filter(Boolean)
	if (trackedFiles.length === 0) return []

	for (const file of trackedFiles) spawnSync('git', ['update-index', '--force-remove', file], { cwd: ROOT })

	return trackedFiles
}

const incrementSummaryCount = (summary, status) => {
	if (status === 'linked') summary.created += 1
	if (status === 'updated') summary.updated += 1
	if (status === 'unchanged') summary.unchanged += 1
}

const formatSummaryLine = (summary) => {
	const parts = []

	if (summary.created > 0) {
		const label = summary.created === 1 ? 'symlink' : 'symlinks'
		parts.push(`${summary.created} ${label} created`)
	}

	if (summary.updated > 0) {
		const label = summary.updated === 1 ? 'symlink' : 'symlinks'
		parts.push(`${summary.updated} ${label} updated`)
	}

	if (summary.gitEntriesRemoved > 0) {
		const label = summary.gitEntriesRemoved === 1 ? 'entry' : 'entries'
		parts.push(`${summary.gitEntriesRemoved} git index ${label} removed`)
	}

	return parts.join(', ')
}

const summary = {
	created: 0,
	updated: 0,
	unchanged: 0,
	gitEntriesRemoved: 0,
}

console.log('Setting up agent symlinks...\n')

const tasks = new Listr(
	[
		...LINKS.map(({ link, target }) => ({
			title: link,
			task: (_ctx, task) => {
				const result = setupLink(link, target)
				const taskTitle = formatLinkStatus(result)

				incrementSummaryCount(summary, result.status)
				task.title = taskTitle
			},
		})),
		{
			title: '.cursor/rules — checking git index',
			task: async (_ctx, task) => {
				const removedFiles = removeStaleGitIndexEntries()

				if (removedFiles.length === 0) {
					task.title = '.cursor/rules — no stale git index entries'
					return
				}

				summary.gitEntriesRemoved = removedFiles.length

				return task.newListr(
					removedFiles.map((file) => ({
						title: file,
						task: (_ctx, subtask) => {
							subtask.title = `${file} — removed from git index`
						},
					})),
					{ concurrent: false },
				)
			},
		},
	],
	{ concurrent: false },
)

try {
	await tasks.run()

	const summaryLine = formatSummaryLine(summary)
	const hasChanges = summary.created > 0 || summary.updated > 0 || summary.gitEntriesRemoved > 0

	if (hasChanges) console.log(`\n✅ Agent symlinks updated — ${summaryLine}.`)
	else console.log('\n✅ Agent symlinks are up to date.')
} catch (error) {
	const detail = error instanceof Error ? error.message : String(error)

	console.error('\n❌ Failed to set up agent symlinks')
	console.error(detail)
	process.exit(1)
}
