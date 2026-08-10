---
name: rcrdk-fix-tests
description: Fix broken tests (tests only); log-scoped first, else branch-aware discovery (feature vs merged branches)
argument-hint: "[test path, or paste failing output]"
allowed-tools: Bash, Read, Edit, Write, Glob, Grep
---

# Fix broken tests (tests only)

When this command runs, make failing or outdated tests pass by updating **tests only**. Do **not** change production behavior.

## Goal

Align tests with the **current** implementation (functions, components, comments, return shapes, copy, selectors). Typical workflow: production was changed first; tests lag behind.

## Hard boundaries

1. **Do not** edit production / implementation files:
   - components, hooks, utils, schemas, actions, pages, styles, configs used at runtime
2. **Do** edit only test-related files:
   - `__tests__/`, `*.spec.*`, `*.test.*`, snapshots, `__mocks__/` used by tests, test helpers/providers
3. Prefer updating expectations, mocks, and selectors over weakening assertions.
4. Do **not** commit unless the user explicitly asks (or runs `/rcrdk-commit-unstaged`).
5. Do **not** push. Never use `--no-verify` unless asked.

## How to discover failures

Decide from the **current invocation only**, in this order:

### A) User attached / pasted terminal test logs (highest priority)

When the prompt includes terminal output from a test run, **start here** — do not branch-scope or run a broad discovery pass first.

- Treat that log as the failure source of truth.
- Parse failing suites/files from it and **only** work on those.
- **Do not** run the full test suite (the bare `test` script with no path). It is too heavy.
- To reproduce or verify, run **targeted** commands only — the project's test script plus a path filter (e.g. `<run> test path/to/file.spec.tsx`).
- Ignore passing suites mentioned in the log unless the user asks otherwise.

### B) No test log provided — branch-aware scope

1. Detect the current branch (`git branch --show-current` or equivalent).
2. Define **merged branches** (integration / release lines): `main`, `master`, `development`, `v2`.
3. Choose scope:

#### B1) Feature branch (current branch is **not** a merged branch)

- Scope discovery to **this branch's changes** vs its merge base (e.g. `git merge-base HEAD main` then `git diff --name-only` / related test paths).
- Run **targeted** tests for changed production files and their colocated specs first.
- Expand only if targeted runs still fail or clearly unrelated suites are broken on this branch.
- **Do not** run the full suite unless targeted runs are inconclusive.

#### B2) Merged branch (current branch **is** `main`, `master`, `development`, or `v2`)

- Treat failures as potentially repo-wide — **investigate the full codebase**.
- Run the project's single-run test script (e.g. `test:run`) to find all failures, then fix what fails.
- After fixes, a full-suite re-run is acceptable on this path to confirm nothing else regressed.

## Procedure

1. Discover failures using **A** (logs) or **B** (branch-aware) above.
2. Read the **current** implementation the test targets — treat it as source of truth for expected behavior.
3. Update tests/snapshots/mocks so they assert what the code actually does now.
4. Re-run tests to verify:
   - **Log-scoped (A)** or **feature branch (B1)**: only affected test files until they pass. Do not kick off a full-suite run just to verify.
   - **Merged branch (B2)**: full-suite re-run is allowed after fixes.
5. If a failure looks like a **real production bug** (wrong return, broken contract, missing edge case) rather than a stale test:
   - Still fix the **test** to match current behavior when that unblocks the suite, **or** leave that case failing if matching would hide a critical bug — prefer fixing the test and flagging it.
   - Always record it in the report below. Do **not** "fix" production in this command.

## Afterward: mismatch report

End with a short resumed list of anything that looked wrong in production while fixing tests. Only include real suspicions, not every diff.

Format:

```text
## Test fixes
- <file>: <what changed in the test>

## Suspicious production behavior (review)
- <symbol or path>: <what looks wrong> → <expected vs actual / why it matters>

(If none: "No suspicious production behavior noticed.")
```

Keep the suspicious list actionable and brief. Do not silently ignore odd returns, missing fields, inverted booleans, or assertions that had to be deleted to match broken behavior.
