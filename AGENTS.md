# rcrdk.dev — AI Agent Guide

You are a senior engineer working on rcrdk.dev, a Next.js portfolio site. Prioritize type safety, small reviewable diffs, and existing project conventions.

## Engineering Principles

- Do not preserve backward compatibility — remove obsolete paths instead of adding compatibility layers, fallbacks, or migrations
- Choose the simplest implementation that fully meets the current requirements — avoid speculative abstractions, configuration, and indirection
- Grow the system in layers: start from the smallest version that works end to end, then add each new capability on top of a product that already works
- Never trade a working product for unfinished complexity
- Keep components modular and concerns clearly separated
- Prefer established, well-maintained libraries when they reduce overall complexity or improve reliability — do not reimplement common functionality without a clear reason
- Lean on the dependencies already in the project before writing your own implementation or adding packages; check a library's docs and types before assuming it lacks a capability (adding a new dependency still needs approval — see [Ask first](#ask-first))
- Make architectural decisions for the long term — do not accept a stopgap that only works for now and is meant to be replaced later

## Do

- Use `import type { X }` for TypeScript type-only imports
- Use early returns to reduce nesting
- Keep functions focused on a single responsibility; extract helpers when needed
- Use an object parameter when a function has three or more arguments
- Prefer functional style: `const`, immutability, `map`/`filter`/`reduce`, and pure functions
- Omit curly braces for single-statement blocks; use arrow implicit return for single-expression functions (not components)
- Assign function results and complex conditions to `const` before returning or branching
- Use `.at()` instead of bracket notation for array access
- Use optional chaining when accessing nested properties that may be undefined
- Use `@/` absolute imports when the relative path goes up more than one folder level
- Use named exports (no default exports for components)
- Use `interface` for React component props wrapped in `Readonly`
- Pin exact dependency versions (`pnpm add -E <package>`)
- Run `pnpm typecheck` before concluding CI failures are unrelated to your changes

## Don't

- Never use `any` — use proper types, `unknown`, or generics
- Never use wildcard imports (`import * from`)
- Never use barrel wildcard exports (`export * from`)
- Never commit secrets or `.env` files
- Never skip hooks (`--no-verify`) unless explicitly requested
- Never use default exports for React components

## Commands

This project uses **pnpm**. No test runner is configured — ignore test steps in the shared rules until one is added. See [agents/commands.md](agents/commands.md) for the full reference. Key commands:

```bash
pnpm typecheck   # Type check
pnpm lint:fix    # Lint and fix
pnpm dev         # Dev server
```

## Workflow (Strict / Lean)

Agent-kit provides slash **personas** (`/intake`, `/plan`, `/do`, `/debug`, `/test`, `/review`, `/secure`, …) routed by [`workflow-orchestrator`](agents/rules/workflow-orchestrator.mdc). Quality mode and the `/secure` gate live in `project.mdc` (create or refresh with `/intake`).

| Mode       | Typical pipeline                                                                       |
| ---------- | -------------------------------------------------------------------------------------- |
| **Strict** | `/plan` → `/do` → `/debug` → `/test` → `/review` → `/secure` if gate → `/doc` / `/git` |
| **Lean**   | `/do` → `/debug` if needed → `/review` → `/git`                                        |

Macros such as `/rcrdk-full-delivery` and `/rcrdk-hotfix` run multi-phase flows in one request. Close deliveries per [`honest-delivery`](agents/rules/honest-delivery.mdc) (symptom / cause / evidence). See [agent-kit docs](https://github.com/rcrdk/agent-kit/blob/main/docs/flows-and-adoption.md).

## Boundaries

### Always do

- Run typecheck on changed files before committing
- Follow commit format: `type(scope): subject` (see [agents/rules/commit-messages.mdc](agents/rules/commit-messages.mdc))
- Match existing naming and file structure conventions
- Call the GitHub CLI only through the `gh-personal` alias — `zsh -ic 'gh-personal …'` (see [agents/rules/github-cli.mdc](agents/rules/github-cli.mdc))

### Ask first

- Adding new dependencies
- Deleting files
- Large refactors spanning many modules

### Never do

- Commit secrets or API keys
- Force push to shared branches
- Modify unrelated code in the same PR
- Run plain `gh`, `gh-myside`, or `GH_CONFIG_DIR=… gh` — always `gh-personal`

## PR Checklist

- [ ] Commit includes scoped subject (when applicable) and valid type
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Lint passes: `pnpm lint`
- [ ] Diff is small and focused
- [ ] No secrets committed

## When Stuck

- Ask a clarifying question before large speculative changes
- Propose a short plan for complex tasks
- Fix type errors before test failures
- Read surrounding code and match existing patterns

<!-- BEGIN:agent-kit-rules -->

## Rules

Coding rules live in `agents/rules/` as committed files, copied in from [agent-kit](https://github.com/rcrdk/agent-kit). Cursor loads them from `.cursor/rules`; the imports below load the always-on ones for Claude Code.

@agents/rules/ask-before-commit.mdc
@agents/rules/codebase-memory-first.mdc
@agents/rules/commit-messages.mdc
@agents/rules/deduplication.mdc
@agents/rules/documentation.mdc
@agents/rules/file-naming.mdc
@agents/rules/github-cli.mdc
@agents/rules/honest-delivery.mdc
@agents/rules/package-installation.mdc
@agents/rules/project-structure.mdc
@agents/rules/security.mdc
@agents/rules/workflow-orchestrator.mdc

Read these when touching matching files:

- [array-access](agents/rules/array-access.mdc) — `**/*.ts`, `**/*.tsx`
- [barrel-exports](agents/rules/barrel-exports.mdc) — `**/index.ts`, `**/index.tsx`
- [constants-and-variables](agents/rules/constants-and-variables.mdc) — `**/*.ts`, `**/*.tsx`
- [control-flow](agents/rules/control-flow.mdc) — `**/*.ts`, `**/*.tsx`
- [cursor-rules](agents/rules/cursor-rules.mdc) — `**/*.mdc`
- [file-size-limits](agents/rules/file-size-limits.mdc) — `**/*.ts`, `**/*.tsx`
- [function-parameters](agents/rules/function-parameters.mdc) — `**/*.ts`, `**/*.tsx`
- [functional-programming](agents/rules/functional-programming.mdc) — `**/*.ts`, `**/*.tsx`
- [imports](agents/rules/imports.mdc) — `**/*.ts`, `**/*.tsx`
- [naming-conventions](agents/rules/naming-conventions.mdc) — `**/*.ts`, `**/*.tsx`
- [optional-chaining](agents/rules/optional-chaining.mdc) — `**/*.ts`, `**/*.tsx`
- [react-components](agents/rules/react-components.mdc) — `**/*.tsx`
- [single-responsibility](agents/rules/single-responsibility.mdc) — `**/*.ts`, `**/*.tsx`
- [strict-equality](agents/rules/strict-equality.mdc) — `**/*.ts`, `**/*.tsx`
- [test-approach](agents/rules/test-approach.mdc) — `**/*.spec.ts`, `**/*.spec.tsx`
- [test-date-mocks](agents/rules/test-date-mocks.mdc) — `**/*.spec.ts`, `**/*.spec.tsx`
- [test-element-selection](agents/rules/test-element-selection.mdc) — `**/*.spec.ts`, `**/*.spec.tsx`
- [test-fixing](agents/rules/test-fixing.mdc) — `**/*.spec.ts`, `**/*.spec.tsx`
- [test-mocks](agents/rules/test-mocks.mdc) — `**/*.spec.ts`, `**/*.spec.tsx`
- [test-naming-and-structure](agents/rules/test-naming-and-structure.mdc) — `**/*.spec.ts`, `**/*.spec.tsx`
- [test-organization](agents/rules/test-organization.mdc) — `**/*.spec.ts`, `**/*.spec.tsx`
- [test-runner](agents/rules/test-runner.mdc) — `**/*.spec.ts`, `**/*.spec.tsx`
- [type-imports](agents/rules/type-imports.mdc) — `**/*.ts`, `**/*.tsx`
- [typescript](agents/rules/typescript.mdc) — `**/*.ts`, `**/*.tsx`
- [utility-functions](agents/rules/utility-functions.mdc) — `src/utils/**/*`, `src/shared/utils/**/*`, `src/features/**/utils/**/*`

<!-- END:agent-kit-rules -->

## Project Rules

Project-specific conventions the shared agent-kit rules do not cover.

### Do

- Export utilities in `src/utils/` as `const` arrow functions — never place utility modules in `src/app/`
- Use `server-only` at the top of every file in `src/http/` that is not reached from a client component (see the Tech Debt note in [get-lastfm-played-tracks.ts](src/http/get-lastfm-played-tracks.ts))
- Place React Query hooks in `src/hooks/react-query/` once they grow beyond a single file
- Sort array inputs used in a `queryKey` so cache keys stay stable regardless of input order
- Keep `src/app/` for routing, pages, route-local components, and `api/` handlers only
- Use kebab-case file names
- Use PNPM for all commands

### Don't

- Never skip the null check in a custom context hook
- Never add standalone helper files under `src/app/`

## Project Structure

```
src/
├── app/              # App Router pages, layouts, route-local components, api/
├── assets/           # Imported static assets (images bundled through Next.js)
├── components/       # Shared UI and feature components
├── config/           # App configuration
├── constants/        # Shared constants
├── contexts/         # React contexts and providers
├── data/             # Static data (projects, skills, etc.)
├── hooks/            # Custom React hooks (react-query/ for query hooks)
├── http/             # HTTP functions
├── i18n/             # Internationalization (next-intl)
├── lib/              # Shared libraries (react-query, env, etc.)
├── reducers/         # Reducer functions
├── schemas/          # Zod validation schemas
├── styles/           # Global styles
├── types/            # Shared TypeScript types
└── utils/            # Utility functions (const arrow fns, barrel index.ts when needed)
```

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4
- **UI**: Radix UI, class-variance-authority
- **i18n**: next-intl
- **Validation**: Zod
- **Animation**: Motion (Framer Motion)
- **Data fetching**: TanStack React Query
- **Package manager**: PNPM
- **Tests**: none configured — ignore test steps in the shared rules until a runner is added

## Code Examples

### Good type import

```typescript
import { useState } from 'react'

import type { Project } from '@/types/project'
```

### Good component

```typescript
interface ButtonProps {
  label: string
  onPress: VoidFunction
}

export function Button({ label, onPress }: Readonly<ButtonProps>) {
  return <button onClick={onPress}>{label}</button>
}
```

## Extended Documentation

Everything under `agents/` is a **committed file in this repository**. Rules, personas, commands, skills, and the shared part of this guide originated in **[agent-kit](https://github.com/rcrdk/agent-kit)** and were copied in by hand — there is no submodule and nothing fetches them at install time. Edit them here when the project needs it, and push improvements upstream to agent-kit so other projects can copy them in turn.

Only the tool-facing views are generated: the symlinks under `.cursor/` and `.claude/`, `CLAUDE.md`, `.cursorrules`, `agents/commit-messages.cursorrules`, and the rules index between `<!-- BEGIN:agent-kit-rules -->` / `<!-- END:agent-kit-rules -->` above (rebuilt from `agents/rules/*.mdc` frontmatter). Those are gitignored — run `pnpm setup:agent-links`, or just `pnpm dev`, to recreate them (skipped when `CI` is set).

- **[agents/README.md](agents/README.md)** — agent documentation index
- **[agents/commands.md](agents/commands.md)** — command reference
