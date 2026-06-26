import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const links = [
	{ path: '.cursor/rules', target: '../agents/rules' },
	{ path: '.cursor/skills', target: '../agents/skills' },
	{ path: '.claude/rules', target: '../agents/rules' },
	{ path: '.claude/skills', target: '../agents/skills' },
]

for (const { path, target } of links) {
	const linkPath = join(root, path)
	const parentDir = dirname(linkPath)

	if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true })

	if (existsSync(linkPath)) {
		const stat = lstatSync(linkPath)

		if (stat.isSymbolicLink()) {
			rmSync(linkPath)
		} else {
			console.error(`Cannot link ${path}: path exists and is not a symlink. Remove it manually.`)
			process.exit(1)
		}
	}

	symlinkSync(target, linkPath)
	console.log(`linked ${path} -> ${target}`)
}
