import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const useColor = process.stdout.isTTY && !process.env.NO_COLOR

const styles = {
	reset: useColor ? '\x1b[0m' : '',
	bold: useColor ? '\x1b[1m' : '',
	dim: useColor ? '\x1b[2m' : '',
	green: useColor ? '\x1b[32m' : '',
	red: useColor ? '\x1b[31m' : '',
}

const fmt = (style, text) => (useColor ? `${style}${text}${styles.reset}` : text)

const log = {
	skip: (message) => console.log(fmt(styles.dim, message)),
	title: () => console.log(`\n${fmt(styles.bold, 'Agent submodules:')}`),
	done: () => console.log(`\n${fmt(styles.green, '✓')} ${fmt(styles.bold, 'Submodules ready')}\n`),
	error: (message) => console.error(`\n${fmt(styles.red, '✗')} ${fmt(styles.bold, message)}\n`),
}

const isCi = ['1', 'true'].includes(String(process.env.CI ?? '').toLowerCase())

if (isCi) {
	log.skip('Skipping submodule init in CI.')
	process.exit(0)
}

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const gitmodulesPath = join(ROOT, '.gitmodules')

if (!existsSync(gitmodulesPath)) {
	log.skip('No .gitmodules — skipping submodule init.')
	process.exit(0)
}

log.title()

// Not --recursive: agent-kit has no nested submodules, and staying shallow keeps
// the auto-executed code surface limited to what this repo pins directly.
const result = spawnSync('git', ['submodule', 'update', '--init'], {
	cwd: ROOT,
	stdio: 'inherit',
})

if (result.status !== 0) {
	log.error('git submodule update --init failed.')
	process.exit(result.status ?? 1)
}

log.done()
