# Personas

Workflow personas, committed as plain markdown. They originated in [agent-kit](https://github.com/rcrdk/agent-kit) and were copied in — there is no submodule.

Edit a persona here when this project needs it, and mirror the change in agent-kit. To pull newer ones, copy `personas/*.md` from an agent-kit checkout over this folder.

- **Cursor:** `.cursor/agents` → `agents/personas/`
- **Claude Code:** `.claude/agents` → `agents/personas/`

Slash routing (`/plan`, `/do`, `/review`, …) is defined in `agents/rules/workflow-orchestrator.mdc`. Files use `name` + `description` front matter (shared agent format).

See [agents/README.md](../README.md).
