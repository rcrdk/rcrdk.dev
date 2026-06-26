# rcrdk.dev Agent Documentation Index

- **[../AGENTS.md](../AGENTS.md)** - Main guide (structure, tech stack, commands)
- **[commands.md](commands.md)** - Command reference

## Skills

### Third-party

- [karpathy-guidelines](skills/karpathy-guidelines/SKILL.md) - Think before coding, simplicity, surgical changes ([source](https://github.com/multica-ai/andrej-karpathy-skills))
- [caveman](skills/caveman/SKILL.md) - Ultra-compressed replies, ~75% fewer output tokens ([source](https://github.com/JuliusBrussee/caveman))

### Superpowers

Source: [obra/superpowers](https://github.com/obra/superpowers) v6.0.3 (`896224c`)

**Testing**
- [test-driven-development](skills/test-driven-development/SKILL.md) - RED-GREEN-REFACTOR cycle

**Debugging**
- [systematic-debugging](skills/systematic-debugging/SKILL.md) - 4-phase root cause process
- [verification-before-completion](skills/verification-before-completion/SKILL.md) - Verify before claiming done

**Collaboration**
- [using-superpowers](skills/using-superpowers/SKILL.md) - How to find and invoke skills
- [brainstorming](skills/brainstorming/SKILL.md) - Design refinement before code
- [writing-plans](skills/writing-plans/SKILL.md) - Implementation plans with verification steps
- [executing-plans](skills/executing-plans/SKILL.md) - Batch execution with checkpoints
- [subagent-driven-development](skills/subagent-driven-development/SKILL.md) - Subagent per task with two-stage review
- [dispatching-parallel-agents](skills/dispatching-parallel-agents/SKILL.md) - Parallel independent tasks
- [requesting-code-review](skills/requesting-code-review/SKILL.md) - Pre-review checklist
- [receiving-code-review](skills/receiving-code-review/SKILL.md) - Handle review feedback
- [using-git-worktrees](skills/using-git-worktrees/SKILL.md) - Isolated feature branches
- [finishing-a-development-branch](skills/finishing-a-development-branch/SKILL.md) - Merge/PR/cleanup workflow

**Meta**
- [writing-skills](skills/writing-skills/SKILL.md) - Create and test new skills

## Rules Index

### Behavioral

- [using-superpowers](rules/using-superpowers.mdc) - Invoke Superpowers skills before acting (always on)
- [karpathy-guidelines](rules/karpathy-guidelines.mdc) - Reduce LLM coding mistakes (always on)
- [caveman](rules/caveman.mdc) - Terse communication mode (opt-in via `/caveman`)

### General

- [commands](rules/commands.mdc) - Prefer PNPM for commands
- [cursor-rules](rules/cursor-rules.mdc) - How to create and edit agent rules
- [typescript](rules/typescript.mdc) - TypeScript best practices
- [type-imports](rules/type-imports.mdc) - Type-only import conventions
- [imports](rules/imports.mdc) - Import path and barrel export preferences
- [naming-conventions](rules/naming-conventions.mdc) - Naming props, constants, and variables
- [constants-and-variables](rules/constants-and-variables.mdc) - Magic numbers and intermediate values
- [control-flow](rules/control-flow.mdc) - Early returns and single-line statements
- [function-responsibility](rules/function-responsibility.mdc) - Single-responsibility functions
- [utility-functions](rules/utility-functions.mdc) - Arrow functions exported as const
- [functional-programming](rules/functional-programming.mdc) - Immutability and functional style
- [optional-chaining](rules/optional-chaining.mdc) - Safe property access
- [array-access](rules/array-access.mdc) - Prefer `.at()` over bracket notation
- [file-naming](rules/file-naming.mdc) - File and folder naming conventions
- [barrel-exports](rules/barrel-exports.mdc) - Named exports in index files

### React

- [react-components](rules/react-components.mdc) - Component structure, props, and accessibility
- [contexts](rules/contexts.mdc) - Context and provider naming
- [hooks](rules/hooks.mdc) - Custom hook naming and file structure
- [reducers](rules/reducers.mdc) - Reducer naming conventions

### Data & API

- [schemas](rules/schemas.mdc) - Zod schema structure and naming
- [server-actions](rules/server-actions.mdc) - Next.js server action conventions
- [http-layer](rules/http-layer.mdc) - Server-only HTTP functions and error handling

### Testing

- [test-organization](rules/test-organization.mdc) - Test file organization
- [test-naming-and-structure](rules/test-naming-and-structure.mdc) - Test naming and structure
- [test-element-selection](rules/test-element-selection.mdc) - Element selection in tests
- [test-mocks](rules/test-mocks.mdc) - Mock usage in tests
