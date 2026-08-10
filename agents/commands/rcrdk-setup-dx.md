---
name: rcrdk-setup-dx
description: Install selected DX tooling from rcrdk/utils — ESLint, Prettier, TypeScript, EditorConfig, VS Code, Husky, commitlint
argument-hint: "[tools to install, e.g. eslint prettier husky]"
allowed-tools: Bash, Read, Edit, Write, Glob, Grep
---

# Set up developer experience (DX)

When this command runs, install **selected** developer-experience tooling in the **current project**, using agent-kit [`templates/dx/`](../templates/dx/) (vendored from [rcrdk/utils](https://github.com/rcrdk/utils)) as the primary source, with GitHub raw as fallback.

Do **not** commit unless the user explicitly asks. Do **not** push.

## Goal

Align linting, formatting, TypeScript, editor settings, and git hooks with the rcrdk/utils stack — without blindly overwriting configs the user did not choose.

## Step 1 — Ask which modules to install (required)

**Before reading files or writing anything**, use **AskQuestion** (or equivalent) so the user picks what to implement. Allow **multiple** selections.

Present these options:

| ID | Label | What it adds |
| -- | ----- | ------------ |
| `typescript` | TypeScript baseline | `tsconfig.json` — strict, `@/*` → `./src/*`, Next.js plugin |
| `eslint` | ESLint (flat config) | `eslint.config.mjs` — Next.js 16, Prettier integration, `@/` imports, a11y warnings |
| `prettier` | Prettier | `.prettierrc.json`, `.prettierignore` — import sort, Tailwind sort, JSON sort |
| `editorconfig` | EditorConfig | `.editorconfig` — tabs (2), LF, markdown spaces |
| `vscode` | VS Code / Cursor workspace | `.vscode/settings.json`, `extensions.json`, `README.md` |
| `commitlint` | Commitlint | `commitlint.config.mjs` — Conventional Commits |
| `lint-staged` | lint-staged | `.lintstagedrc.json` — ESLint + Prettier on staged files |
| `husky` | Husky git hooks | `.husky/pre-commit`, `commit-msg`, `pre-push` |
| `package-scripts` | package.json scripts | `lint`, `lint:fix`, `format`, `format:check`, `typecheck`, `prepare` |
| `readme-dx` | README-DX.md | Project DX documentation (adapted from utils) |

**Recommended presets** (offer as first options or a follow-up if the user wants a shortcut):

| Preset | Includes |
| ------ | -------- |
| **Full stack** | All of the above |
| **Lint & format only** | `eslint`, `prettier`, `editorconfig`, `package-scripts` |
| **Editor only** | `editorconfig`, `vscode` |
| **Git hooks only** | `commitlint`, `lint-staged`, `husky`, `package-scripts` (minimal) |

If the user already named modules in the invocation (e.g. “install eslint and prettier”), pre-select those and confirm once — do not skip the ask entirely unless every module is explicitly listed.

## Step 2 — Detect project state

From the repository root (`git rev-parse --show-toplevel`):

1. Read `package.json` — resolve the package manager (`packageManager` field, then lockfile: `pnpm-lock.yaml`, `yarn.lock`, `bun.lock`, `package-lock.json`), existing scripts, devDependencies. Every command below is written with `<pm>` / `<run>` — substitute the detected one (`pnpm x`, `yarn x`, `npm run x`, `bun run x`). See [package-installation](../rules/package-installation.mdc).
2. Note which config files **already exist** (do not overwrite without confirmation):

   | Module | Paths |
   | ------ | ----- |
   | typescript | `tsconfig.json` |
   | eslint | `eslint.config.mjs`, `.eslintrc*` |
   | prettier | `.prettierrc*`, `.prettierignore` |
   | editorconfig | `.editorconfig` |
   | vscode | `.vscode/settings.json`, `.vscode/extensions.json` |
   | commitlint | `commitlint.config.mjs`, `commitlint.config.js` |
   | lint-staged | `.lintstagedrc.json`, `lint-staged` in `package.json` |
   | husky | `.husky/`, `"prepare": "husky"` |
   | readme-dx | `README-DX.md` |

3. Detect source layout: default lint glob is `src/**/*.{ts,tsx}` (utils). If the project uses a different app root, adjust ESLint `files` / script globs accordingly and say so in the summary.

4. Detect the test runner for **pre-push** (`devDependencies`: `vitest` or `jest` — see [test-runner](../rules/test-runner.mdc)) and use the project's single-run script. If the project has no tests, omit `test:run` from pre-push — **ask** if unclear.

## Step 3 — Load canonical configs

**Prefer** `templates/dx/` from a local agent-kit checkout (see [templates/dx/README.md](../templates/dx/README.md)). Fall back to a local [rcrdk/utils](https://github.com/rcrdk/utils) clone, then GitHub raw.

| Module | Template path(s) | Install as |
| ------ | ---------------- | ---------- |
| typescript | `tsconfig.json` | `tsconfig.json` |
| eslint | `eslint.config.mjs` | `eslint.config.mjs` |
| prettier | `prettierrc.json`, `prettierignore` | `.prettierrc.json`, `.prettierignore` |
| editorconfig | `editorconfig` | `.editorconfig` |
| vscode | `.vscode/settings.json`, `.vscode/extensions.json`, `.vscode/README.md` | same |
| commitlint | `commitlint.config.mjs` | `commitlint.config.mjs` |
| lint-staged | `lintstagedrc.json` | `.lintstagedrc.json` |
| husky | `.husky/pre-commit`, `.husky/commit-msg`, `.husky/pre-push` | `.husky/` |
| package-scripts | `package-scripts.json` | merge into `package.json` |
| readme-dx | `README-DX.md` | `README-DX.md` |

Also read `templates/dx/README-DX.md` (or [utils/README-DX.md](https://github.com/rcrdk/utils/blob/main/README-DX.md)) for dependency versions and behavior.

## Step 4 — Install selected modules

For each **selected** module, in dependency order:

### Dependency order

1. `typescript` (if selected)
2. `prettier`, `editorconfig` (no deps)
3. `eslint` (after typescript + prettier configs exist or are selected together)
4. `commitlint`, `lint-staged`
5. `husky` (after lint-staged + commitlint if those hooks are used)
6. `package-scripts` (merge scripts; add `prepare: "husky"` only when husky is selected)
7. `vscode`, `readme-dx` (last — documentation)

### Per-module rules

**typescript**

- Copy utils `tsconfig.json` baseline; merge with existing `compilerOptions` / `include` if file exists — **ask** before overwriting.
- Ensure `"paths": { "@/*": ["./src/*"] }` unless the project uses a different alias.

**eslint**

- Copy `eslint.config.mjs` from utils.
- Adjust lint target if not `src/` (e.g. `app/` for some Next layouts).
- Add devDependencies from utils `package.json`: `eslint`, `eslint-config-next`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-import-resolver-typescript` (match Next/ESLint versions to the project's `next` version when possible).

**prettier**

- Copy `prettierrc.json` → `.prettierrc.json` and `prettierignore` → `.prettierignore`.
- Keep `tailwindAttributes` regex for custom `*ClassName*` props: `["classes", "/.*ClassName.*/"]`.
- Add devDependencies: `prettier`, `@ianvs/prettier-plugin-sort-imports`, `prettier-plugin-tailwindcss`, `prettier-plugin-sort-json`.

**editorconfig**

- Copy `.editorconfig` as-is unless the user asked to customize.

**vscode**

- Create `.vscode/` if missing.
- Copy `settings.json` and `extensions.json` from templates.
- Keep Tailwind IntelliSense `classAttributes`: `["class", "classes", "className", ".*ClassName.*"]` for custom `*ClassName*` props.
- Copy or adapt `.vscode/README.md`.
- If files exist, **merge** keys and extension IDs — do not wipe unrelated settings.

**commitlint**

- Copy `commitlint.config.mjs`.
- Add `@commitlint/cli`, `@commitlint/config-conventional`.

**lint-staged**

- Copy `.lintstagedrc.json`.
- Add `lint-staged` devDependency.
- Requires eslint + prettier configs if those globs are used — warn if selected without eslint/prettier.

**husky**

- Run `<pm> exec husky init` (or `npx husky init`) if `.husky/` is missing.
- Write hooks from utils:
  - `pre-commit` → `<run> lint-staged`
  - `commit-msg` → `<run> commitlint --edit "$1"`
  - `pre-push` → `<run> typecheck && <run> test:run` (adapt to the project's test script)
- Set `"prepare": "husky"` in `package.json`. If a `prepare` script already exists, append `husky` rather than replacing what is there.

**package-scripts**

Merge into `package.json` `scripts` (skip if script exists with different command — report and ask):

```json
"lint": "eslint \"src/**/*.+(ts|tsx)\"",
"lint:fix": "eslint \"src/**/*.+(ts|tsx)\" --fix",
"format": "prettier . --write",
"format:check": "prettier . --check",
"typecheck": "tsc --noEmit"
```

**readme-dx**

- Copy `README-DX.md` from utils and adapt project name, script table, and config paths to what was actually installed.

### Install packages

After adding devDependencies, run:

```bash
<pm> install
```

Use the project's dev-dependency add command (`<pm> add -D <packages>`) for new deps. Match utils versions when reasonable; bump patch/minor only if the project's Next/React versions require it.

## Step 5 — Verify

For each installed module, run when applicable:

| Module | Verify |
| ------ | ------ |
| eslint | `<run> lint` (or `<run> lint:fix` if fixing the existing codebase is in scope — ask first) |
| prettier | `<run> format:check` |
| typescript | `<run> typecheck` |
| husky | `ls .husky` and confirm hooks are executable |
| vscode | Confirm `.vscode/settings.json` and `extensions.json` exist |

Do not fix the entire codebase unless the user asks — report error counts if the baseline surfaces existing issues.

## Step 6 — Summarize

```markdown
## DX setup complete

- **Installed**: <comma-separated module IDs>
- **Skipped** (user choice): <list>
- **Already present** (merged / left unchanged): <list>
- **Package manager**: <detected>
- **Verify**: `<run> lint`, `<run> format:check`, `<run> typecheck`

### Next steps

1. Reload Cursor / VS Code; accept **Install Recommended Extensions**.
2. Run `<pm> install` if hooks were not enabled yet.
3. Commit config files when ready.
4. See `README-DX.md` (if installed) for day-to-day usage.
```

## Hard boundaries

1. **Always ask** which modules to install (Step 1) — never install the full stack silently.
2. Do not overwrite existing config files without confirming when content differs materially.
3. Do not commit or push unless the user explicitly asks.
4. Do not change application source code — config, hooks, docs, and `package.json` only (unless user asks to fix lint errors).
5. Do not install release-please or other saas-template-only DX unless the user selects it separately.

## Reference

| Resource | Link |
| -------- | ---- |
| DX templates (primary) | [templates/dx/](../templates/dx/) |
| utils DX guide | https://github.com/rcrdk/utils/blob/main/README-DX.md |
| VS Code setup | https://github.com/rcrdk/utils/blob/main/.vscode/README.md |
| saas-template DX | https://github.com/rcrdk/saas-template/blob/main/README-DX.md (extends utils with release-please) |
