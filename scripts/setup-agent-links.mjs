import { spawnSync } from 'node:child_process'
import { existsSync, lstatSync, mkdirSync, readlinkSync, rmSync, symlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

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

		if (!stats.isSymbolicLink()) {
			throw new Error(`${relativeLink} exists and is not a symlink. Remove it manually and run again.`)
		}

		const currentTarget = readlinkSync(linkPath)
		if (currentTarget === relativeTarget) {
			console.log(`ok ${relativeLink} -> ${relativeTarget}`)
			return
		}

		rmSync(linkPath)
	}

	symlinkSync(relativeTarget, linkPath)
	console.log(`linked ${relativeLink} -> ${relativeTarget}`)
}

const removeStaleGitIndexEntries = () => {
	const listResult = spawnSync('git', ['ls-files', '.cursor/rules'], { cwd: ROOT, encoding: 'utf8' })

	if (listResult.status !== 0) return

	const trackedFiles = listResult.stdout.trim().split('\n').filter(Boolean)
	if (trackedFiles.length === 0) return

	for (const file of trackedFiles) {
		spawnSync('git', ['update-index', '--force-remove', file], { cwd: ROOT })
	}

	const entryLabel = trackedFiles.length === 1 ? 'entry' : 'entries'
	console.log(`removed ${trackedFiles.length} stale git index ${entryLabel} under .cursor/rules`)
}

for (const { link, target } of LINKS) {
	setupLink(link, target)
}

removeStaleGitIndexEntries()

console.log('Agent symlinks ready.')
