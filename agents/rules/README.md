# Rules

Coding and workflow rules, committed as plain `.mdc` files. They originated in [agent-kit](https://github.com/rcrdk/agent-kit) and were copied in — there is no submodule, and nothing regenerates them.

agent-kit keeps a single flat `rules/` folder — **every rule applies to every project**. There are no per-project rule folders and no overrides. Rules that touch things projects differ on (folder layout, package manager, test runner) say how to detect which case applies.

Edit a rule here when this project needs it, and mirror the change in agent-kit so other projects can copy it. To pull newer rules, copy `rules/*.mdc` from an agent-kit checkout over this folder and run `pnpm setup:agent-links` so the rules index in `AGENTS.md` picks up any additions.

See [agents/README.md](../README.md) for the rules index.
