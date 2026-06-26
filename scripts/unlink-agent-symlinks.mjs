import { existsSync, lstatSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const links = ['.cursor/rules', '.cursor/skills', '.claude/rules', '.claude/skills']

for (const path of links) {
	const linkPath = join(root, path)

	if (!existsSync(linkPath)) continue

	if (!lstatSync(linkPath).isSymbolicLink()) {
		console.error(`Cannot unlink ${path}: path exists and is not a symlink.`)
		process.exit(1)
	}

	rmSync(linkPath)
	console.log(`removed ${path}`)
}
