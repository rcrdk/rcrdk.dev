# rcrdk.dev Development Guide for AI Agents

You are a senior engineer working on rcrdk.dev, a Next.js portfolio site. Prioritize type safety, small reviewable diffs, and existing project conventions.

## Do

- Use `import type { X }` for TypeScript type-only imports
- Use early returns to reduce nesting
- Keep functions focused on a single responsibility; extract helpers when needed
- Use an object parameter when a function has three or more arguments
- Prefer functional style: `const`, immutability, `map`/`filter`/`reduce`, and pure functions
- Omit curly braces for single-statement blocks; use arrow implicit return for single-expression functions (not components)
- Export utilities in `src/utils/` as `const` arrow functions — not in `src/app/`
- Assign function results and complex conditions to `const` before returning or branching
- Use `.at()` instead of bracket notation for array access
- Use optional chaining when accessing nested properties that may be undefined
- Use `@/` absolute imports when the relative path goes up more than one folder level
- Use named exports (no default exports for components)
- Use `interface` for React component props wrapped in `Readonly`
- Use `server-only` at the top of files in `http/`
- Use PNPM for all commands
- Run `pnpm typecheck` before concluding CI failures are unrelated to your changes

## Don't

- Never use `any` — use proper types, `unknown`, or generics
- Never use wildcard imports (`import * from`)
- Never use barrel wildcard exports (`export * from`)
- Never commit secrets or `.env` files
- Never skip hooks (`--no-verify`) unless explicitly requested
- Never use default exports for React components
- Never skip the context null check in custom context hooks

## React Query

- Place hooks in `src/hooks/react-query/` when they grow beyond a single file
- Sort array inputs in `queryKey` so cache keys are stable regardless of input order

## Commands

See [agents/commands.md](agents/commands.md) for the full reference. Key commands:

```bash
pnpm typecheck   # Type check
pnpm lint:fix    # Lint and fix
pnpm format      # Prettier write
pnpm dev         # Dev server
```

## Boundaries

### Always do

- Run typecheck on changed files before committing
- Follow commit format: `type(scope): subject`; use camelCase scope for components/functions, kebab-case for broader areas; header max 100 chars
- Match existing naming and file structure conventions

### Ask first

- Adding new dependencies
- Deleting files
- Large refactors spanning many modules

### Never do

- Commit secrets or API keys
- Force push to shared branches
- Modify unrelated code in the same PR

## Project Structure

`src/app/` is for routing, pages, route-local components, and API routes. Do not add utility modules there — put helpers in `src/utils/`.

```
src/
├── app/              # App Router pages and layouts
├── components/       # Shared UI and feature components
├── config/           # App configuration
├── data/             # Static data (projects, skills, etc.)
├── hooks/            # Custom React hooks
├── http/             # Server-only HTTP functions
├── i18n/             # Internationalization
├── lib/              # Shared utilities (react-query, env, etc.)
├── reducers/         # Reducer functions
├── styles/           # Global styles
├── types/            # Shared TypeScript types
└── utils/            # Utility functions
```

### Key conventions

- **App folder**: pages, components, and `api/` only — no standalone util files
- **Utilities**: `src/utils/` as `const` arrow functions with barrel `index.ts` when needed
- **HTTP layer**: `src/http/` with `server-only`
- **File names**: kebab-case
- **Named values**: assign function results and complex conditions to `const` before returning or branching (see [constants-and-variables](agents/rules/constants-and-variables.mdc))

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

## PR Checklist

- [ ] Commit includes scoped subject (when applicable), type, and conventional format; header ≤ 100 chars
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Lint passes: `pnpm lint`
- [ ] Diff is small and focused
- [ ] No secrets committed

## When Stuck

- Ask a clarifying question before large speculative changes
- Propose a short plan for complex tasks
- Fix type errors before lint failures
- Read surrounding code and match existing patterns

## Extended Documentation

Agent rules and settings are centralized in `agents/`. Symlinks in `.cursor/` and `.claude/` are generated locally and not committed to git.

After cloning, run `pnpm dev` or `pnpm setup:agent-links` locally. Agent symlinks are recreated automatically via `predev` when starting the dev server (skipped when `CI` is set).

```
agents/
├── rules/          # Source of truth for coding rules (.mdc)
├── skills/         # Shared agent skills
├── README.md       # Rules index
└── commands.md     # Command reference

.cursor/            # generated symlinks
├── rules -> ../agents/rules
└── skills -> ../agents/skills

.claude/            # generated symlinks
├── rules -> ../agents/rules
└── skills -> ../agents/skills
```

- **[agents/README.md](agents/README.md)** - Rules index
- **[agents/rules/](agents/rules/)** - Modular engineering rules
- **[agents/commands.md](agents/commands.md)** - Complete command reference
