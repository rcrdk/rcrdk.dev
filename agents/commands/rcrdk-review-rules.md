---
name: rcrdk-review-rules
description: Review branch changes against project rules; summarize fixes needed; ask before implementing
argument-hint: "[optional base branch, defaults to main]"
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git merge-base:*), Read, Glob, Grep
---

# Review branch changes against project rules

When this command runs, audit **all files changed on the current branch** (including already-committed changes) against the project's coding rules. Produce a fix summary only — **do not implement**, **do not create docs**, **do not commit**, **do not push**.

## Goal

Find rule violations, missing tests, structural mismatches, and convention drift in branch work before merge. End with a concise action list grouped by file or concern.

## Hard boundaries

1. **Read-only review** in this phase — no file edits, no commits, no new markdown/docs.
2. Do **not** auto-fix or auto-implement after the summary.
3. Do **not** run package installs or change dependencies.
4. After the summary, **stop and ask** whether to proceed with implementation.

## Discover project rules

Load rules in this order (prefer repo-local sources):

1. `agents/rules/*.mdc` (symlinks to [agent-kit](https://github.com/rcrdk/agent-kit); edit rules there, not in the consumer repo)
2. `AGENTS.md`, `CLAUDE.md`
3. `.cursorrules`, `agents/commit-messages.cursorrules`
4. ESLint / Prettier / commitlint config when they encode conventions not covered above

Build a mental checklist keyed by file kind:

| File kind                                               | Primary rules                                                                                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `src/shared/utils/**`, `src/features/**/utils/**`       | utility-functions, functional-programming, typescript, type-imports, project-structure, constants-and-variables, deduplication |
| `src/shared/hooks/**`, `src/features/**/hooks/**`       | typescript, type-imports                                                                                                       |
| `src/app/**/*.tsx` (components)                         | react-components, file-size-limits, constants-and-variables, control-flow, project-structure                                   |
| `src/shared/contexts/**`, `src/features/**/contexts/**` | typescript                                                                                                                     |
| `src/shared/schemas/**`, `src/features/**/schemas/**`   | security, schemas, typescript                                                                                                  |
| `src/shared/http/**`                                    | type-imports                                                                                                                   |
| `src/features/**/actions/**`                            | security, validated-actions                                                                                                    |
| `src/shared/types/**`, `src/features/**/types/**`       | typescript, type-imports                                                                                                       |
| `**/*.spec.*`, `**/__tests__/**`                        | test-approach, test-naming-and-structure, test-organization, test-mocks, test-element-selection, test-date-mocks               |
| barrel `index.ts`                                       | barrel-exports, imports                                                                                                        |
| `docs/**`                                               | documentation                                                                                                                  |

Apply **alwaysApply** rules to every changed file (imports, strict-equality, optional-chaining, array-access, naming-conventions, etc.).

## Discover branch changes

1. Run in parallel:
   - `git branch --show-current`
   - `git merge-base HEAD main` (fallback: `master`, then `origin/main`, then `origin/master`)
   - `git diff --name-status <merge-base>..HEAD`
   - `git diff <merge-base>..HEAD` (full diff for context)
   - `git status` (include unstaged/untracked on top of branch diff)
2. Include **all paths** from the branch diff plus any **uncommitted** changes not yet on the branch.
3. Skip binary-only or generated artifacts unless the user cares about them; note skipped paths briefly.
4. Do **not** commit staged/unstaged files as part of this command.

## Review procedure

For each changed file:

1. Identify file kind and load the relevant rule subset.
2. Read the **current file content** (not only the diff) when needed for context.
3. Flag concrete violations with:
   - **File** and **line/area** (function, export, JSX block)
   - **Rule** (rule file or convention name)
   - **Problem** (what is wrong today)
   - **Suggested fix** (specific, minimal change)
4. Also check cross-cutting concerns:
   - Logic duplicated across changed files → deduplication
   - Business logic in `src/app/` that belongs in `src/features/` or `src/shared/` → project-structure
   - Feature internals imported from another module instead of the feature barrel → imports, barrel-exports
   - Missing barrel export when a new util/hook is added to a feature
   - Missing tests for new/changed util, hook, or non-trivial component behavior
   - Type-only imports not using `import type`
   - `function` exports in utils instead of `const` arrow
   - Component helpers that should be extracted utils
   - Test files mixed into production commits (informational only — do not rewrite history)
   - User text fields without `plainTextString` validation → security
   - **Docs drift** — see [Docs drift review](#docs-drift-review) below

Prefer **actionable** findings over nitpicks. Skip style issues Prettier/ESLint already auto-fix on commit unless they would fail CI.

## Docs drift review

After code findings, audit documentation sync separately (rule: [documentation.mdc](../rules/documentation.mdc)).

For each feature with production changes on the branch (`src/features/<feature>/`, excluding tests):

1. Does `docs/features/<feature>.md` exist? If not → **Must fix** for new features.
2. Do changed routes, public API exports, env vars, or key flows appear in the feature doc? If stale → **Should fix**.
3. Were plan checkboxes and [docs/status/current-task.md](../../docs/status/current-task.md) updated when tasks completed? If not → **Should fix**.
4. If user-visible behavior changed, is [docs/status/application.md](../../docs/status/application.md) updated? If not → **Should fix**.

Also check branch-wide:

- `src/app/**/page.tsx`, `layout.tsx`, or `route.ts` changes → relevant feature doc or application status
- `src/env.ts` or new integrations → feature doc, runbook, or README
- Architecture/library swaps → ADR + `docs/architecture/`

Add a **### Docs drift** section to the output (even when empty):

```text
### Docs drift
- `src/features/billing/…`: routes added — update docs/features/billing.md (Public API, Routes)
- `docs/status/application.md`: billing row still ❌ after Task 17 shipped — update status
```

Severity:

- **Must fix** — new feature with no `docs/features/<feature>.md`, or wrong architecture undocumented
- **Should fix** — stale feature doc, status docs, or plan checkboxes
- **Nice to have** — minor doc wording; cross-links missing

Optional verification (run only when useful, not mandatory):

- The project's `typecheck` script, scoped or full, if types look risky
- Targeted `test <path>` for changed modules with new behavior
- The project's `lint` script on changed paths if rule violations are ambiguous

Do not block the summary on long full-suite runs.

## Output format

End with this structure:

```text
## Branch review (<branch> vs <base>)

**Files reviewed:** N
**Findings:** N (X must-fix, Y should-fix, Z nice-to-have)

### Must fix
- `path/to/file.ts`: <problem> — <rule> — <suggested fix>

### Should fix
- ...

### Nice to have
- ...

### Missing tests
- `path/to/module.ts`: <what to cover>

### Docs drift
- `path/to/feature/…`: <what doc is missing or stale> — <suggested doc update>

### Clean / no issues
- `path/to/file.ts` (optional — only when explicitly verified)

### Skipped
- <path>: <reason>

### Open questions
- <id or short label>: <what is ambiguous> — options: A) … B) … C) …
```

Use **Open questions** when a finding has multiple valid fixes, behavior is unclear, or the review cannot recommend one path without a product/engineering decision. Do not bury ambiguity inside suggested fixes — surface it here.

Severity guide:

- **Must fix** — violates a hard project rule, likely CI failure, or clear bug/convention break
- **Should fix** — convention drift, maintainability, missing tests for new logic
- **Nice to have** — minor consistency; safe to defer

If no issues: say so explicitly and list what was reviewed.

## After the summary

**Stop.** Ask exactly:

> Should I continue and implement these fixes?

Do not start edits until the user confirms.

### When the user confirms without details

Treat as confirmation without details: bare **yes**, **y**, **continue**, **go ahead**, **implement**, or similar with no scope or option specified.

Before editing, check whether the summary has any **Open questions** (or equivalent ambiguity called out in Must fix / Should fix / Missing tests).

**If there are open questions:**

1. Do **not** implement yet.
2. Resolve questions **one at a time, in summary order** — never batch multiple open questions in a single message.
3. For the **first** unanswered question only:
   - Present **numbered options** (what you could do). Use the AskQuestion tool when available (single question per call); otherwise list options clearly in chat.
   - Each option should be concrete and mutually exclusive where possible, e.g.:
     - A) Keep current behavior; add test documenting it
     - B) Change behavior to fall back to `developmentCard` when filtered gallery is empty
     - C) Skip this item for now
4. **Stop and wait** for the user's answer. Do not ask the next question in the same turn.
5. After each answer, record the chosen option, then ask the **next** unanswered question the same way.
6. Repeat steps 3–5 until every open question has an answer.
7. Only then implement the confirmed scope (Must fix / Should fix + resolved choices).

**If there are no open questions:** proceed with all Must fix and Should fix items. Skip Nice to have unless the user included them in their reply.

### Implementation rules (after scope is clear)

Apply fixes in small focused edits (same conventions as the review). Still without committing unless they ask separately (e.g. `/rcrdk-commit-unstaged`).

If the user confirms with **partial** scope (e.g. "only must-fix", "skip nice-to-have", "option B only"), follow that scope exactly.
