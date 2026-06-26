# Command Reference

Prefer **PNPM** for all commands in this project.

## Development

```bash
pnpm dev          # Start dev server (Turbopack, clears .next first)
pnpm build        # Production build
pnpm start        # Start production server
```

## Quality

```bash
pnpm typecheck    # TypeScript check (tsc --noEmit)
pnpm lint         # ESLint on src/**/*.ts(x)
pnpm lint:fix     # ESLint with auto-fix
pnpm format       # Prettier write
pnpm format:check # Prettier check
```

## Agents

After cloning, create local symlinks for Cursor and Claude rules (also runs automatically via `predev` when you run `pnpm dev`):

```bash
pnpm setup:agent-links  # Link .cursor/, .claude/, CLAUDE.md, and .cursorrules to agents/
```

## Git

Commits use Conventional Commits and are validated by commitlint on `commit-msg`.

**Format:** `type(scope): subject` — header max **100 characters**.

When the change centers on a **component or function**, use a **scope** in **camelCase** (the export name). For broader areas (routes, modules, config), use **kebab-case** or omit the scope.

```bash
git commit -m "test(avatar): add unit tests"
git commit -m "feat(resultsTabs): add filter resume"
git commit -m "fix(getSearchTypologiesFiltersResume): handle empty filters"
git commit -m "chore(setup-agent-links): update symlink script"
git commit -m "docs: document agent symlink setup"
```

## Git Hooks

Husky runs lint-staged on pre-commit (lint + format on staged files).
