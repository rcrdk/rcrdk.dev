# Command Reference

Prefer **PNPM** for all commands in this project.

## Agent Setup

```bash
pnpm agents:link     # Create .cursor/ and .claude/ symlinks to agents/
pnpm agents:unlink   # Remove symlinks (needed before git ops on old .cursor/rules paths)
```

Runs automatically on `pnpm install` via the `prepare` script.

If git fails with `pathspec is beyond a symbolic link`:

```bash
pnpm agents:unlink
git rm -r --cached .cursor/rules   # only needed once after migrating to agents/
pnpm agents:link
```

## Development

```bash
pnpm dev          # Start dev server (Turbopack, clears .next first)
pnpm build        # Production build
pnpm start        # Start production server
```

## Quality

```bash
pnpm typecheck    # TypeScript type check
pnpm lint         # ESLint
pnpm lint:fix     # ESLint with auto-fix
pnpm format       # Prettier write
pnpm format:check # Prettier check
```

## Git Hooks

Husky runs lint-staged on pre-commit (lint + format on staged files).
