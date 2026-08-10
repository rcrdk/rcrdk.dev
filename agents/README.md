# Agent Documentation Index

- **[../AGENTS.md](../AGENTS.md)** — main guide (structure, tech stack, commands, examples); `CLAUDE.md` symlinks to it
- **[commands.md](commands.md)** — package manager and git command reference
- **[rules/](rules/)** — coding + workflow rules
- **[personas/](personas/)** — workflow personas (`/plan`, `/do`, `/review`, …)
- **[commands/](commands/)** — slash command macros
- **[skills/](skills/)** — skills available to Cursor and Claude Code

## How agent context is wired

| Surface        | Cursor                                                                    | Claude Code                                           |
| -------------- | ------------------------------------------------------------------------- | ----------------------------------------------------- |
| Rules          | `.cursor/rules` → `agents/rules/` (`.mdc` front matter drives activation) | imported from `AGENTS.md` — see its **Rules** section |
| Personas       | `.cursor/agents` → `agents/personas/`                                     | `.claude/agents` → `agents/personas/`                 |
| Main guide     | `AGENTS.md`                                                               | `CLAUDE.md` → `AGENTS.md`                             |
| Slash commands | `.cursor/commands` → `agents/commands/`                                   | `.claude/commands` → `agents/commands/`               |
| Skills         | `.cursor/skills` → `agents/skills/`                                       | `.claude/skills` → `agents/skills/`                   |

Everything under `agents/` is committed. The symlinks in the table are generated locally by `pnpm setup:agent-links` and are gitignored, along with `CLAUDE.md`, `.cursorrules`, and `agents/commit-messages.cursorrules`.

## Editing

Rules, personas, commands, and skills are **this project's files**. Edit them here.

They came from [agent-kit](https://github.com/rcrdk/agent-kit), copied in at `dda8047`. Mirror reusable changes upstream so other projects can copy them; to pull newer content, copy the matching folders out of an agent-kit checkout and rerun `pnpm setup:agent-links`.

Project-specific guidance goes in `AGENTS.md`. The one generated part of that file is the rules index between the `<!-- BEGIN:agent-kit-rules -->` markers — do not hand-edit it.
