---
name: rcrdk-commit-unstaged
description: Commit staged files first, then unstaged/untracked as small layer-bucket Conventional Commits; tests last and separate
argument-hint: "[optional path or scope to limit the commits]"
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*), Bash(git restore:*), Read, Glob, Grep
---

# Commit unstaged files

When this command runs:

1. If the index has **staged** changes, commit them first with an appropriate Conventional Commit message (split by concern when needed).
2. Then commit **unstaged and untracked** working-tree changes as multiple small layer-bucket Conventional Commits.

Do **not** push. Do **not** add task codes (e.g. `PW-0000`) unless the user explicitly asks in this invocation.

## Preconditions

1. Run in parallel:
   - `git status`
   - `git diff` (unstaged) and `git diff --cached` (staged)
   - `git log -10 --oneline` (match recent style)
2. If staged paths exist, commit them before processing unstaged/untracked (see [Staged files](#staged-files) below).
3. Build the unstaged candidate set from **unstaged + untracked** only. Ignore paths that are fully staged with no further unstaged changes.
4. If both staged and unstaged/untracked sets are empty, stop and say so.
5. Do **not** commit secrets (`.env`, credentials, keys). Warn and skip those files.
6. Never update git config. Never use `--no-verify` unless the user asks.
7. Never use interactive git flags (`-i`).

## Staged files

When `git diff --cached` has changes:

1. Commit what is already staged — do **not** unstage or restage those paths unless splitting into multiple commits.
2. Use an appropriate Conventional Commit message from the staged diff (type, scope, subject).
3. Split into multiple commits only when staged paths contain clearly unrelated concerns.
4. After staged commits finish, continue with unstaged/untracked using the layer-bucket rules below.

## Discover commit rules

Prefer project rules in this order:

1. `.cursorrules`, `agents/commit-messages.cursorrules`, agent-kit `rules/commit-messages.mdc`
2. `AGENTS.md` / `CLAUDE.md` commit sections
3. `commitlint` config if present
4. Fallback: Conventional Commits (`type(scope): subject`)

Apply the project's scope casing and allowed types. **Skip** any project guidance that requires task codes in the commit body unless the user asked for them in this invocation.

## Split commits: layer buckets (small commits)

Prefer **many small commits**. Group unstaged/untracked files into buckets and commit in this order. Within a bucket, prefer **one logical unit per commit** (often one file or one component folder).

| Order | Bucket              | What goes here                                                                                           | Granularity                                        |
| ----: | ------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
|     1 | Types               | `src/shared/types/`, `src/features/**/types/`                                                            | one type module / file                             |
|     2 | Schemas             | `src/shared/schemas/`, `src/features/**/schemas/`                                                        | one schema module / file                           |
|     3 | Utils & hooks       | `src/shared/utils/`, `src/shared/hooks/`, `src/features/**/utils/`, `src/features/**/hooks/`             | one util or hook; barrel re-export may ride along  |
|     4 | Contexts & reducers | `src/shared/contexts/`, `src/shared/reducers/`, `src/features/**/contexts/`, `src/features/**/reducers/` | one context or reducer                             |
|     5 | Icons               | icon components / icon assets                                                                            | one icon (or tight icon set) per commit            |
|     6 | Assets              | images, fonts, static media                                                                              | one asset or tight group                           |
|     7 | UI components       | `src/shared/components/`, `src/features/**/components/`, route `_components/`                            | one component folder per commit                    |
|     8 | App wiring          | `src/app/`, server actions, route entry, config                                                          | one concern per commit                             |
|     9 | Docs                | `docs/`, `agents/` (rules and docs only)                                                                 | one concern per commit                             |
|    10 | **Tests**           | always last                                                                                              | separate commits only — never with production code |

### Soft pairing (same commit allowed)

- A source file + its barrel `index.ts` / `index.tsx` when the barrel only re-exports that change
- A rename/move pair that is the same logical unit (use type `refactor`)
- Snapshot updates with their matching `*.spec.*` / `*.test.*`

### Hard rules

- Never mix production code and test files in the same commit.
- If only tests changed → one or more `test` commits only.
- If only implementation changed → no empty test commit.
- Types, utils, and schemas are usually **independent** — give them their own commits even when part of the same feature.
- UI components, icons, and assets each get **their own** commits (do not bundle unrelated UI into one commit).
- If multiple unrelated concerns appear in one bucket, split further by concern.
- When a feature spans layers, still commit **bottom-up** (types → … → UI → wiring → docs → tests), not as one feature commit.

### Test path detection

Treat as tests when the path or name matches any of:

- `__tests__/`, `*.spec.*`, `*.test.*`
- `test/`, `tests/`, `e2e/`
- `__mocks__/` or test-only helpers/providers clearly used only by tests
- Snapshot files belonging to a test suite

Prefer grouping test commits by the **module under test** (e.g. all specs for `login-form` together), still separate from implementation.

## Commit procedure (each commit)

1. Stage **only** the files for that commit: `git add -- <paths>`. Prefer path-specific adds over `git add .`.
2. Draft message:
   - Format: `type(scope): subject` or `type: subject`
   - Imperative mood, lowercase subject, no trailing period
   - Prefer a scope when the change centers on a component/function (use project casing rules)
   - Focus the subject on **why**, keep it concise
   - Use type `refactor` when the change is only a file move or rename (no behavior change)
   - Do **not** add task codes unless the user asked
3. Commit with a HEREDOC:

```bash
git commit -m "$(cat <<'EOF'
type(scope): subject

Optional body when the why is not obvious from the subject.

EOF
)"
```

4. If a hook fails: fix the issue, then create a **new** commit (do not amend unless the user explicitly asks and amend safety rules are met).
5. After all commits, run `git status` and summarize the commits created (short list: hash + subject).

## Message types (fallback)

| Type       | Use when                                  |
| ---------- | ----------------------------------------- |
| `feat`     | New behavior                              |
| `fix`      | Bug fix                                   |
| `test`     | Tests only                                |
| `refactor` | No behavior change; file move/rename only |
| `style`    | Formatting only                           |
| `docs`     | Documentation                             |
| `chore`    | Tooling / misc                            |
| `perf`     | Performance                               |
| `ci`       | CI config                                 |
| `build`    | Build system                              |

Test commits should use type `test` (e.g. `test(loginForm): cover edge cases`).
