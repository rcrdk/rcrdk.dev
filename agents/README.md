# Hero Desktop Agent Documentation Index

- **[../AGENTS.md](../AGENTS.md)** - Main guide (structure, tech stack, commands, examples)
- **[commands.md](commands.md)** - Command reference

## Rules Index

Rules live in [agents/rules/](rules/) and are shared via symlinks in `.cursor/rules` and `.claude/rules`.

Run `pnpm dev` or `pnpm setup:agent-links` locally after cloning (skipped in CI).

### TypeScript & Code Style

- [type-imports](rules/type-imports.mdc) - Type-only imports
- [typescript](rules/typescript.mdc) - Type safety conventions
- [strict-equality](rules/strict-equality.mdc) - Prefer `===` and `!==` over `==` and `!=`
- [naming-conventions](rules/naming-conventions.mdc) - Naming props, constants, and variables
- [function-parameters](rules/function-parameters.mdc) - Object params for functions with 3+ arguments
- [constants-and-variables](rules/constants-and-variables.mdc) - Magic numbers, named returns, and named conditions
- [control-flow](rules/control-flow.mdc) - Early returns, single-statement blocks, no nested ternaries
- [single-responsibility](rules/single-responsibility.mdc) - One responsibility per function
- [functional-programming](rules/functional-programming.mdc) - Immutability, pure functions, single-return arrow functions
- [utility-functions](rules/utility-functions.mdc) - Arrow functions exported as const in utils
- [optional-chaining](rules/optional-chaining.mdc) - Safe property access
- [array-access](rules/array-access.mdc) - Prefer `.at()` over bracket notation
- [imports](rules/imports.mdc) - Import paths and barrel exports

### React

- [react-components](rules/react-components.mdc) - Component structure, props, JSX conditionals, and styling
- [component-member-order](rules/component-member-order.mdc) - Declaration order inside component bodies
- [react-query](rules/react-query.mdc) - React Query hooks and ordered query keys
- [contexts](rules/contexts.mdc) - Context and provider naming
- [hooks](rules/hooks.mdc) - Custom hook naming
- [timers](rules/timers.mdc) - Clear setTimeout/setInterval on unmount

### Architecture & Patterns

- [project-structure](rules/project-structure.mdc) - App routes vs shared `src/` modules
- [barrel-exports](rules/barrel-exports.mdc) - Named exports in index files
- [file-naming](rules/file-naming.mdc) - kebab-case file and folder names
- [reducers](rules/reducers.mdc) - useReducer naming for complex local state
- [schemas](rules/schemas.mdc) - Zod schema structure
- [server-actions](rules/server-actions.mdc) - Server action conventions
- [validated-actions](rules/validated-actions.mdc) - `validatedActionWithUser` wrapper and schemas
- [client-mutation-feedback](rules/client-mutation-feedback.mdc) - Toast + Sentry after client mutations
- [http-layer](rules/http-layer.mdc) - HTTP layer error handling

### Testing

Prioritize functional tests over implementation tests. See [test-approach](rules/test-approach.mdc).

- [test-approach](rules/test-approach.mdc) - Behavior-first tests, base props/params reuse
- [test-fixing](rules/test-fixing.mdc) - Prefer fixing tests; confirm before changing production code
- [test-mocks](rules/test-mocks.mdc) - Shared mocks from `@/mocks/` and `__mocks__`
- [test-naming-and-structure](rules/test-naming-and-structure.mdc) - Describe/it naming, quoted refs (props, brands, constants)
- [test-organization](rules/test-organization.mdc) - `it.each`, snapshots, class testing
- [test-element-selection](rules/test-element-selection.mdc) - Querying elements in tests

### Meta

- [commands](rules/commands.mdc) - Prefer PNPM for commands
- [cursor-rules](rules/cursor-rules.mdc) - How to create and maintain Cursor rules
