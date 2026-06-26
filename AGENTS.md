# rcrdk.dev Development Guide for AI Agents

You are a senior engineer working on a Next.js portfolio site. You prioritize type safety, small diffs, and consistency with existing conventions.

## Do

- Use `type` imports for type-only imports
- Use `.at()` instead of bracket notation for array access
- Use early returns to reduce nesting
- Use PNPM for all commands
- Use `@/` absolute imports when the relative path goes up more than one level
- Use named exports for components and barrel files
- Follow kebab-case for file and folder names
- Run `pnpm typecheck` and `pnpm lint` before concluding work is done

## Don't

- Never use `any` — use proper types, `unknown`, or generics
- Never use wildcard imports (`import * from`)
- Never use default exports for components
- Never skip the context null check in custom context hooks
- Never commit secrets or `.env` files

## Commands

See [agents/commands.md](agents/commands.md) for full reference. Key commands:

```bash
pnpm dev          # Development server
pnpm typecheck    # Type check
pnpm lint:fix     # Lint with auto-fix
pnpm format       # Format with Prettier
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
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

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4
- **UI**: Radix UI, class-variance-authority
- **i18n**: next-intl
- **Validation**: Zod
- **Animation**: Motion (Framer Motion)
- **Package manager**: PNPM

## Behavioral Guidelines

Always follow [Karpathy guidelines](agents/rules/karpathy-guidelines.mdc): think before coding, simplicity first, surgical changes, goal-driven execution. Source: [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills).

Optional terse mode: invoke `/caveman` or say "talk like caveman". Source: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman). Stop with "normal mode".

## Superpowers

Agentic development methodology from [obra/superpowers](https://github.com/obra/superpowers). Skills live in `agents/skills/` and auto-link via `.cursor/skills` and `.claude/skills`.

**Before any task**, check for applicable skills — see [using-superpowers](agents/skills/using-superpowers/SKILL.md).

Typical workflow: brainstorm → git worktree → write plan → execute (subagent or batched) → TDD → code review → finish branch.

Full skill index: [agents/README.md#superpowers](agents/README.md#superpowers)

## Agent Configuration

Rules and skills live in `agents/` and are linked from tool-specific folders:

```
agents/
├── rules/       # Source of truth for coding rules (.mdc)
├── skills/      # Agent skills
├── commands.md
└── README.md    # Rules index

.cursor/rules -> ../agents/rules   (symlink, not committed)
.cursor/skills -> ../agents/skills
.claude/rules -> ../agents/rules
.claude/skills -> ../agents/skills

After clone: `pnpm agents:link` (also runs on `pnpm install` via prepare).
```

## Extended Documentation

- **[agents/README.md](agents/README.md)** - Rules and skills index
- **[agents/rules/](agents/rules/)** - Modular engineering rules
- **[agents/skills/](agents/skills/)** - Agent skills (Superpowers, karpathy-guidelines, caveman)
- **[agents/commands.md](agents/commands.md)** - Complete command reference
