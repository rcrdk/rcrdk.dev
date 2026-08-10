# Command Reference

## Development

```bash
pnpm dev          # Start dev server (runs setup:agent-links first)
pnpm build        # Production build
pnpm start        # Start production server
```

## Quality

```bash
pnpm typecheck    # TypeScript check (tsc --noEmit)
pnpm lint         # ESLint
pnpm lint:fix     # ESLint with auto-fix
pnpm format       # Prettier write
pnpm format:check # Prettier check
pnpm test         # the project's test runner (watch mode)
pnpm test:run     # the project's test runner single run (CI)
```

## Agents

After cloning, create the local symlinks for Cursor and Claude rules, personas, skills, and slash commands (`predev` runs this automatically when not in CI):

```bash
pnpm setup:agent-links  # Link .cursor/ and .claude/ to agents/*, rebuild generated files
```

### Slash commands

Slash commands live in [agents/commands/](commands/) and are wired into Cursor (`.cursor/commands`) and Claude Code (`.claude/commands`):

| Command | Description |
| ------- | ----------- |
| `/rcrdk-commit-unstaged` | Commit staged files first, then unstaged/untracked as small layer-bucket Conventional Commits |
| `/rcrdk-index-codebase` | Index or reindex with Codebase Memory MCP; verify install and gitignore `.codebase-memory/` |
| `/rcrdk-review-rules` | Review branch changes against project rules; summarize fixes; ask before implementing |
| `/rcrdk-fix-tests` | Fix broken tests (tests only); log-scoped or branch-aware discovery |
| `/rcrdk-setup-agent-kit` | Install or refresh agent-kit — copy rules/personas/commands/skills in, wire scripts, gitignore, symlinks |
| `/rcrdk-setup-dx` | Install selected DX from rcrdk/utils — ESLint, Prettier, TS, EditorConfig, VS Code, Husky |

## Git

Commits use Conventional Commits and are validated by commitlint on `commit-msg`.

**Format:** `type(scope): subject` or `type: subject`

- Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`, `wip`

When the change centers on a **component or function**, use a **scope** in **camelCase** (the export name). For broader areas (routes, modules, config), use **kebab-case** or omit the scope.

```bash
git commit -m "feat(groupBy): add generic overload"
git commit -m "fix(twCnMerge): handle empty class list"
git commit -m "docs: document agent symlink setup"
```

See [../README-DX.md](../README-DX.md) for Husky hooks, lint-staged, and editor setup.
