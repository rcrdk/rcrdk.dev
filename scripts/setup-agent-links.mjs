/**
 * Point every agent tool at the project's own agents/ folder and regenerate the
 * files derived from it.
 *
 * Rules, personas, commands and skills are plain committed files under agents/ —
 * copied in from agent-kit by hand, not fetched from a submodule. This script only
 * owns what is generated: the .cursor/.claude symlinks, CLAUDE.md, .cursorrules,
 * agents/commit-messages.cursorrules, and the rules index inside AGENTS.md.
 */

import { spawnSync } from 'node:child_process'
import {
	existsSync,
	lstatSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	readlinkSync,
	rmSync,
	symlinkSync,
	writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'

const useColor = process.stdout.isTTY && !process.env.NO_COLOR

const styles = {
	reset: useColor ? '\x1b[0m' : '',
	bold: useColor ? '\x1b[1m' : '',
	dim: useColor ? '\x1b[2m' : '',
	green: useColor ? '\x1b[32m' : '',
	blue: useColor ? '\x1b[34m' : '',
	yellow: useColor ? '\x1b[33m' : '',
	cyan: useColor ? '\x1b[36m' : '',
	red: useColor ? '\x1b[31m' : '',
}

const fmt = (style, text) => (useColor ? `${style}${text}${styles.reset}` : text)

const log = {
	skip: (message) => console.log(fmt(styles.dim, message)),
	title: () => console.log(`\n${fmt(styles.bold, 'Agent symlinks:')}`),
	subtitle: (message) => console.log(fmt(styles.dim, `\n  ${message}`)),
	linkOk: (link, target) =>
		console.log(
			`  ${fmt(styles.green, '✓')} ${fmt(styles.cyan, link)} ${fmt(styles.dim, '→')} ${fmt(styles.dim, target)}`,
		),
	linkCreated: (link, target) =>
		console.log(
			`  ${fmt(styles.blue, '+')} ${fmt(styles.cyan, link)} ${fmt(styles.dim, '→')} ${fmt(styles.dim, target)}`,
		),
	linkUpdated: (link, target) =>
		console.log(
			`  ${fmt(styles.yellow, '↻')} ${fmt(styles.cyan, link)} ${fmt(styles.dim, '→')} ${fmt(styles.dim, target)}`,
		),
	fileOk: (file, source) =>
		console.log(
			`  ${fmt(styles.green, '✓')} ${fmt(styles.cyan, file)} ${fmt(styles.dim, '⇐')} ${fmt(styles.dim, source)}`,
		),
	fileUpdated: (file, source) =>
		console.log(
			`  ${fmt(styles.yellow, '↻')} ${fmt(styles.cyan, file)} ${fmt(styles.dim, '⇐')} ${fmt(styles.dim, source)}`,
		),
	warn: (message) => console.log(`  ${fmt(styles.yellow, '!')} ${message}`),
	error: (message) => console.error(`\n${fmt(styles.red, '✗')} ${fmt(styles.bold, message)}\n`),
	done: ({ created, updated, ok }) => {
		const parts = [
			created > 0 && `${created} created`,
			updated > 0 && `${updated} updated`,
			ok > 0 && `${ok} up to date`,
		].filter(Boolean)

		const summary = parts.length > 0 ? fmt(styles.dim, ` (${parts.join(', ')})`) : ''

		console.log(`\n${fmt(styles.green, '✓')} ${fmt(styles.bold, 'Agent symlinks ready')}${summary}\n`)
	},
}

const isCi = ['1', 'true'].includes(String(process.env.CI ?? '').toLowerCase())

if (isCi) {
	log.skip('Skipping agent symlinks in CI.')
	process.exit(0)
}

/**
 * This script lives at <repo>/scripts/, so its parent directory is the repo root.
 * Falls back to git, then cwd.
 */
const resolveRoot = () => {
	const entryScript = process.argv[1]

	if (entryScript) {
		const candidate = join(dirname(entryScript), '..')

		if (existsSync(join(candidate, 'package.json'))) return candidate
	}

	const fromGit = spawnSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' })

	if (fromGit.status === 0 && fromGit.stdout.trim()) return fromGit.stdout.trim()

	return process.cwd()
}

const ROOT = resolveRoot()
const RULES_DIR = 'agents/rules'
const CURSORRULES_FILE = 'agents/commit-messages.cursorrules'
const AGENTS_MD_FILE = 'AGENTS.md'
const RULES_BEGIN_MARKER = '<!-- BEGIN:agent-kit-rules -->'
const RULES_END_MARKER = '<!-- END:agent-kit-rules -->'

const LINKS = [
	{ link: '.cursor/rules', target: '../agents/rules' },
	{ link: '.cursor/skills', target: '../agents/skills' },
	{ link: '.cursor/commands', target: '../agents/commands' },
	{ link: '.cursor/agents', target: '../agents/personas' },
	{ link: '.claude/rules', target: '../agents/rules' },
	{ link: '.claude/skills', target: '../agents/skills' },
	{ link: '.claude/commands', target: '../agents/commands' },
	{ link: '.claude/agents', target: '../agents/personas' },
	{ link: 'CLAUDE.md', target: AGENTS_MD_FILE },
	{ link: '.cursorrules', target: CURSORRULES_FILE },
]

const counts = { created: 0, updated: 0, ok: 0 }

const pathExists = (path) => {
	try {
		lstatSync(path)
		return true
	} catch {
		return false
	}
}

const setupLink = (relativeLink, relativeTarget) => {
	const linkPath = join(ROOT, relativeLink)
	const parentDir = dirname(linkPath)

	if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true })

	if (pathExists(linkPath)) {
		const stats = lstatSync(linkPath)

		if (!stats.isSymbolicLink()) {
			throw new Error(`${relativeLink} exists and is not a symlink. Remove it manually and run again.`)
		}

		const currentTarget = readlinkSync(linkPath)

		if (currentTarget === relativeTarget) {
			counts.ok += 1
			log.linkOk(relativeLink, relativeTarget)
			return
		}

		rmSync(linkPath, { force: true })
		symlinkSync(relativeTarget, linkPath)
		counts.updated += 1
		log.linkUpdated(relativeLink, relativeTarget)
		return
	}

	symlinkSync(relativeTarget, linkPath)
	counts.created += 1
	log.linkCreated(relativeLink, relativeTarget)
}

const writeManagedFile = (relativePath, content, source) => {
	const filePath = join(ROOT, relativePath)
	const parentDir = dirname(filePath)

	if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true })

	if (existsSync(filePath) && readFileSync(filePath, 'utf8') === content) {
		counts.ok += 1
		log.fileOk(relativePath, source)
		return
	}

	writeFileSync(filePath, content)
	counts.updated += 1
	log.fileUpdated(relativePath, source)
}

const stripFrontMatter = (content) => content.replace(/^---[\s\S]*?---\n?/, '')

const parseFrontMatter = (content) => {
	const match = content.match(/^---\n([\s\S]*?)\n---/)
	if (!match) return { description: '', alwaysApply: false, globs: [] }

	const block = match[1]
	const description = block.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? ''
	const alwaysApply = /^alwaysApply:\s*true\s*$/m.test(block)
	const inlineGlobs = block.match(/^globs:[^\S\n]*(\S[^\n]*)$/m)?.[1]?.trim()
	const listGlobs = [...block.matchAll(/^\s+-\s*(.+)$/gm)].map((entry) => entry[1].trim())

	const globs = inlineGlobs ? [inlineGlobs] : listGlobs

	return { description, alwaysApply, globs: globs.map((glob) => glob.replace(/^['"]|['"]$/g, '')) }
}

const listRuleFiles = () => {
	const rulesPath = join(ROOT, RULES_DIR)
	if (!existsSync(rulesPath)) return []

	return readdirSync(rulesPath, { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith('.mdc'))
		.map((entry) => entry.name)
		.sort()
}

const readRuleMetadata = () =>
	listRuleFiles().map((fileName) => ({
		fileName,
		...parseFrontMatter(readFileSync(join(ROOT, RULES_DIR, fileName), 'utf8')),
	}))

const replaceMarkedBlock = ({ content, beginMarker, endMarker, body, fileLabel }) => {
	const beginIndex = content.indexOf(beginMarker)
	const endIndex = content.indexOf(endMarker)

	if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) {
		log.warn(`${fileLabel} has no ${beginMarker} block — skipped`)
		return null
	}

	return `${content.slice(0, beginIndex + beginMarker.length)}\n\n${body}\n\n${content.slice(endIndex)}`
}

const buildRulesBlock = (rules) => {
	const alwaysApply = rules.filter((rule) => rule.alwaysApply)
	const scoped = rules.filter((rule) => !rule.alwaysApply)

	const imports = alwaysApply.map((rule) => `@${RULES_DIR}/${rule.fileName}`).join('\n')

	const scopedLines = scoped
		.map((rule) => {
			const globs = rule.globs.length > 0 ? rule.globs.map((glob) => `\`${glob}\``).join(', ') : 'related files'
			const name = rule.fileName.replace(/\.mdc$/, '')

			return `- [${name}](${RULES_DIR}/${rule.fileName}) — ${globs}`
		})
		.join('\n')

	return `## Rules

Coding rules live in \`${RULES_DIR}/\` as committed files, copied in from [agent-kit](https://github.com/rcrdk/agent-kit). Cursor loads them from \`.cursor/rules\`; the imports below load the always-on ones for Claude Code.

${imports}

Read these when touching matching files:

${scopedLines}`
}

const syncAgentsMd = () => {
	const agentsMdPath = join(ROOT, AGENTS_MD_FILE)

	if (!existsSync(agentsMdPath)) {
		log.warn(`${AGENTS_MD_FILE} not found — skipped rules injection`)
		return
	}

	const rules = readRuleMetadata()

	if (rules.length === 0) {
		log.warn(`No rules found in ${RULES_DIR} — skipped rules injection`)
		return
	}

	log.subtitle(`${AGENTS_MD_FILE} rules index (${rules.length} rules)`)

	const originalContent = readFileSync(agentsMdPath, 'utf8')

	const content = replaceMarkedBlock({
		content: originalContent,
		beginMarker: RULES_BEGIN_MARKER,
		endMarker: RULES_END_MARKER,
		body: buildRulesBlock(rules),
		fileLabel: AGENTS_MD_FILE,
	})

	if (!content || content === originalContent) {
		counts.ok += 1
		log.fileOk(AGENTS_MD_FILE, RULES_DIR)
		return
	}

	writeFileSync(agentsMdPath, content)
	counts.updated += 1
	log.fileUpdated(AGENTS_MD_FILE, RULES_DIR)
}

const syncCursorrules = () => {
	const rulePath = join(ROOT, RULES_DIR, 'commit-messages.mdc')

	if (!existsSync(rulePath)) {
		log.warn(`${RULES_DIR}/commit-messages.mdc not found — skipped ${CURSORRULES_FILE}`)
		return
	}

	const body = stripFrontMatter(readFileSync(rulePath, 'utf8')).trim()
	const content = `When Cursor auto-generates a Git commit message for this repository, follow these rules.\n\n${body}\n`

	log.subtitle('commit messages')
	writeManagedFile(CURSORRULES_FILE, content, `${RULES_DIR}/commit-messages.mdc`)
}

log.title()

try {
	syncCursorrules()

	log.subtitle(`tool links (${LINKS.length})`)
	for (const { link, target } of LINKS) setupLink(link, target)

	syncAgentsMd()

	log.done(counts)
} catch (error) {
	const message = error instanceof Error ? error.message : 'Failed to set up agent symlinks.'
	log.error(message)
	process.exit(1)
}
