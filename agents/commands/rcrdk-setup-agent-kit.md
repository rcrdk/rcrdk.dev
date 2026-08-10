---
name: rcrdk-setup-agent-kit
description: Install or refresh agent-kit — copy rules/personas/commands/skills in, wire scripts, gitignore, and symlinks
argument-hint: "[--no-vendor] [--dry-run]"
allowed-tools: Bash, Read, Edit, Write, Glob, Grep
---

# Set up or refresh agent-kit in this project

When this command runs, install or **refresh** **[agent-kit](https://github.com/rcrdk/agent-kit)** in the **current git repository**: copy its rules, personas, commands, and skills into `agents/`, write the project's own `scripts/setup-agent-links.mjs`, merge gitignore / prettierignore entries and the `setup:agent-links` package script, then rebuild the local symlinks.

agent-kit is **not** a dependency of the consumer. Nothing is added to `.gitmodules`, and nothing is fetched at install time — the copied files belong to this repo from then on.

Do **not** commit unless the user explicitly asks. Do **not** push.

## Step 0 — Locate an agent-kit checkout

The installer lives in agent-kit, so a local clone is required. Look for one, in order:

1. A path the user gave in the request.
2. A sibling of the repo root — `../agent-kit`, `../../agent-kit`, `../boilerplates/agent-kit`.
3. Ask the user for the path.

If none exists, offer to clone it outside the project:

```bash
git clone git@github.com:rcrdk/agent-kit.git ~/dev/agent-kit
```

Never clone it **into** the consumer repo — that recreates the vendored-checkout problem this model removed.

Confirm the checkout is current before copying from it:

```bash
git -C "$KIT" status --short && git -C "$KIT" pull --ff-only
```

A dirty or stale checkout silently ships the wrong content into the project.

## Step 1 — Detect install state

| State | Signals | Mode |
| ----- | ------- | ---- |
| **Fresh** | No `agents/rules/` | Install — full copy + wiring |
| **Installed** | `agents/rules/*.mdc` present | Refresh — re-copy content, re-link |
| **Legacy** | `.gitmodules` contains `.agents/agent-kit` | Migrate — see Step 4 |

There is **no project key** and no layout flag. agent-kit rules are flat and apply to every repo; the installer detects the package manager (lockfile / `packageManager`) and test runner (`devDependencies`) itself, and skills always land in `agents/skills/`.

## Step 2 — Check for local edits before overwriting

Refresh **overwrites every file agent-kit ships**. Before running it on an installed project, look for deliberate local changes:

```bash
git -C "$KIT" --no-pager diff --no-index --stat "$KIT/rules" agents/rules
```

Report anything that differs and ask before proceeding — a project may have adapted a shared rule on purpose. Files the project added itself are untouched by the copy.

## Step 3 — Run the installer

From the **repository root** (`git rev-parse --show-toplevel`):

```bash
node "$KIT"/scripts/setup-consumer.mjs              # copy content + wire everything
node "$KIT"/scripts/setup-consumer.mjs --no-vendor  # wiring only, leave agents/ alone
node "$KIT"/scripts/setup-consumer.mjs --dry-run    # preview
node "$KIT"/scripts/setup-consumer.mjs --force-scripts  # also regenerate the linker
```

The script:

1. Copies `rules/*.mdc`, `personas/*.md`, `commands/rcrdk-*.md`, and `skills/*/` into `agents/`
2. Appends missing gitignore entries (Cursor/Claude symlinks, `CLAUDE.md`, `.cursorrules`, `.codebase-memory/`) and prettierignore entries for the copied folders
3. Writes `scripts/setup-agent-links.mjs`, the `agents/*/README.md` stubs, `agents/commands.md`, `AGENTS.md`, `.mcp.json`, `.cursor/mcp.json`, `.claude/settings.json` when missing
4. Adds `setup:agent-links` to `package.json` when missing
5. Runs `setup:agent-links` — symlinks plus `agents/commit-messages.cursorrules` and the `AGENTS.md` rules block

`AGENTS.md` is only written when absent. On an existing project the shared body is **not** refreshed — it is that project's prose. Apply base changes by hand.

## Step 4 — Migrating a legacy submodule consumer

If `.gitmodules` still lists `.agents/agent-kit`:

```bash
git submodule deinit -f .agents/agent-kit
git rm -f .agents/agent-kit
rm -rf .git/modules/.agents/agent-kit
git rm -f .gitmodules          # only when no other submodules remain
find agents/rules agents/commands agents/personas -maxdepth 1 -type l -delete
```

Then run Step 3, and clean up the leftovers:

- Delete `scripts/setup-submodules.mjs`; drop `setup:submodules` / `setup:agents` from `package.json`, pointing `predev` at `setup:agent-links` and `prepare` at `husky`
- Remove `agents/rules/*.mdc`, `agents/commands/rcrdk-*.md`, `agents/personas/*.md`, `agents/skills/*` from `.gitignore` — those files are tracked now
- Drop the `<!-- BEGIN:agent-kit-base -->` / `<!-- END:agent-kit-base -->` markers from `AGENTS.md`, keeping the prose between them; keep the `agent-kit-rules` markers

## Step 5 — Verify

1. `git submodule status` is empty and `.agents/agent-kit` is gone.
2. Symlinks resolve: `.cursor/rules`, `.cursor/agents`, `.cursor/commands`, `.cursor/skills`, the four `.claude/*` equivalents, `CLAUDE.md`, `.cursorrules`.
3. `agents/rules/*.mdc`, `agents/personas/*.md`, `agents/commands/rcrdk-*.md`, `agents/skills/*/SKILL.md` are real files and **tracked** by git.
4. Re-running `setup:agent-links` reports everything up to date (idempotent), and `CI=true node scripts/setup-agent-links.mjs` exits 0 without writing.
5. Always-on rules are present: `workflow-orchestrator`, `honest-delivery`, `ask-before-commit`.
6. Slash commands appear in Cursor / Claude after a reload: `/rcrdk-commit-unstaged`, `/rcrdk-full-delivery`, …
7. Optionally run `/intake` to create `project.mdc`, and `/rcrdk-index-codebase` for Codebase Memory MCP.

## Step 6 — Summarize

Reply with:

```markdown
## agent-kit <install | refresh | migration> complete

- **Mode**: <fresh install | refresh | migrated from submodule>
- **Source**: `<path to agent-kit checkout>` @ `<sha>`
- **Copied**: <n> rules · <n> personas · <n> commands · <n> skills → `agents/`
- **Scripts**: `setup:agent-links` (symlinks + generated files)
- **Local edits detected**: <none | list>

### Next steps

1. Reload Cursor if rules/personas/commands/skills did not appear.
2. Review the diff under `agents/` and commit it — it is this repo's content now.
3. Run `/intake` to generate `project.mdc` (optional but recommended).
4. Run `/rcrdk-index-codebase` for Codebase Memory MCP (optional).
```

## Hard boundaries

1. Do not commit or push unless the user explicitly asks.
2. Do not clone agent-kit inside the consumer repository.
3. Do not overwrite `scripts/setup-agent-links.mjs` without `--force-scripts` — report and ask if regeneration is needed.
4. Do not overwrite local edits under `agents/` without reporting them first (Step 2).
5. Do not rewrite the shared body of an existing `AGENTS.md` — only the rules block is generated.
