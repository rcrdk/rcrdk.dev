---
name: rcrdk-index-codebase
description: Index or reindex the project with Codebase Memory MCP; ensure MCP is configured and .codebase-memory/ is gitignored
allowed-tools: Bash, Read, Edit, Glob, Grep
---

# Index codebase (Codebase Memory MCP)

When this command runs, index or reindex the **current project** into the [Codebase Memory MCP](https://github.com/DeusData/codebase-memory-mcp) knowledge graph so agents can query architecture, symbols, and dependencies before reading files.

Do **not** commit unless the user explicitly asks. Do **not** push.

## Step 1 — Verify MCP is configured (required first)

Before indexing, confirm the Codebase Memory MCP is available. **Do not skip this step.**

### A) Probe the MCP tool surface

1. Call MCP discovery for server `user-codebase-memory-mcp` (Cursor) or `codebase-memory-mcp`.
2. Confirm tools exist: at minimum `index_repository`, `index_status`, `list_projects`.
3. If discovery fails, the server is missing, or `serverStatus` is `needsAuth`, `error`, or `loading` → go to [MCP not configured](#mcp-not-configured-stop-here).

### B) Optional config file check

Read these paths if they exist (project first, then user):

- `.cursor/mcp.json`
- `~/.cursor/mcp.json`

Look for an `mcpServers` entry named **`codebase-memory-mcp`** with a valid `command` path.

If config files exist but the MCP probe in **A** still fails → treat as **not configured** (agent session may need a reload after install).

### C) Smoke test (when probe succeeds)

Call `list_projects` with empty arguments. If the call errors with connection/auth failures → [MCP not configured](#mcp-not-configured-stop-here).

## MCP not configured — stop here

**Do not** attempt indexing. Reply with this block (fill in any detected gaps):

```markdown
## Codebase Memory MCP is not configured

This project expects the **Codebase Memory MCP** for architecture-first discovery (`codebase-memory-first` rule).

### Install

1. Open the installation guide: https://github.com/DeusData/codebase-memory-mcp
2. Quick install (macOS / Linux):
   ```bash
   curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
   ```
3. Or add manually to `.cursor/mcp.json` (use an **absolute** path to the binary):
   ```json
   {
     "mcpServers": {
       "codebase-memory-mcp": {
         "command": "/absolute/path/to/codebase-memory-mcp"
       }
     }
   }
   ```
   Default binary location after install: `~/.local/bin/codebase-memory-mcp`
4. **Reload Cursor** (or restart the agent session) so the MCP server is picked up.
5. Run `/rcrdk-index-codebase` again.

### Docs

- Repository: https://github.com/DeusData/codebase-memory-mcp
- README (install, clients, troubleshooting): https://github.com/DeusData/codebase-memory-mcp#installation
```

Do not proceed to indexing until the user confirms MCP works or re-runs this command successfully.

## Step 2 — Resolve repository path

1. Use the workspace / git repository root (prefer `git rev-parse --show-toplevel` when inside a git repo).
2. Pass an **absolute** path to `index_repository.repo_path`.

## Step 3 — Gitignore the index folder (required before indexing)

Codebase Memory MCP writes local artifacts under **`.codebase-memory/`** at the repo root (e.g. `graph.db.zst` when `persistence: true`). This folder must **never** be committed.

**Do not proceed to Step 4 until this step is complete.**

1. Read `.gitignore` at the repo root (create the file if missing).
2. If `.codebase-memory/` is **not** already ignored (check for `.codebase-memory/` or `.codebase-memory` entries), **append**:

   ```gitignore
   # Codebase Memory MCP (local index — see /rcrdk-index-codebase)
   .codebase-memory/
   ```

3. If `.codebase-memory/` already exists and is **tracked** by git, untrack it without deleting local files:

   ```bash
   git rm -r --cached .codebase-memory 2>/dev/null || true
   ```

4. Do **not** stage or commit `.gitignore` unless the user explicitly asked to commit in this invocation. Mention the change in the Step 5 summary.

**Hard rule:** never add `.codebase-memory/` or its contents to the repository — local cache only, unless the user explicitly overrides this in the same turn.

## Step 4 — Index or reindex

1. Optionally call `index_status` with `project` set to the repo folder name (basename of `repo_path`) to report current state.
2. Call **`index_repository`**:
   - `repo_path`: absolute path from Step 2
   - `mode`: `full` (default) — use `moderate` or `fast` only if the user asks or the repo is extremely large and timing matters
   - `persistence`: `false` unless the user explicitly wants a team-shared artifact under `.codebase-memory/` (folder stays gitignored either way)
3. Reindexing uses the same call — `index_repository` refreshes an existing graph.

## Step 5 — Verify and summarize

1. Call `index_status` again (or `list_projects`) to confirm the project appears.
2. Reply briefly:

```markdown
## Codebase indexed

- **Project**: <name>
- **Path**: <absolute repo_path>
- **Mode**: full
- **MCP**: codebase-memory-mcp ✓
- **Index folder**: `.codebase-memory/` (local only)
- **.gitignore**: `.codebase-memory/` <added | already present | untracked from git index>

Agents should query Codebase Memory before broad filesystem search (see `codebase-memory-first` rule).
```

If indexing fails, include the MCP error text and link to https://github.com/DeusData/codebase-memory-mcp#installation for troubleshooting.

## Hard boundaries

1. Do not call `index_repository` until `.codebase-memory/` is in `.gitignore` (Step 3).
2. Do not commit or push unless the user explicitly asks.
3. Do not commit `.codebase-memory/` contents — only `.gitignore` may be committed when asked.
4. Do not modify `.cursor/mcp.json` unless the user asks to fix MCP configuration.
