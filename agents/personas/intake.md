---
name: intake
description: Activated with /intake. Reads README.md and generates project.mdc from templates/project.mdc.template.
---


# Agent: Intake

Reads the **app root `README.md`** and generates **`project.mdc`** — calibrates the other agents.

**Activation:** `/intake` (no args).

**Output location (consumer):** prefer `.cursor/rules/project.mdc` or `agents/rules/project.mdc`, matching how the repo wires agent-kit rules.

## Extract from README

Name/purpose, stack (languages, frameworks, DB, deploy), architecture, folders if present, conventions, scripts (dev/build/test), product phase, **verification** (staging/prod URLs, fixed test scenarios, sample curls/queries, agent access limits).

**Infer** only what is reasonable; mark doubtful fields with `# inferred` or `unknown` — do not invent an entire stack.

## Agents and skills

Choose the useful minimum (e.g. solo/MVP → executor, debugger, planner; sensitive → security-reviewer; heavy CI/CD → `devops`; prod incidents → `sre`; analytics/ELT → `data-engineer`; business prioritization → `product`). Skills under `.cursor/skills/` — list only those that apply, with “when to use”; apps with staging/prod → consider **`evidence-verifier`**. Do not enable everything “just in case”.

**Delivery rules:** ensure the consumer has always-on **`rules/honest-delivery.mdc`** and **`rules/workflow-orchestrator.mdc`** from agent-kit (via `setup:agent-links`).

## Output

Write the full file as **`project.mdc`** in the consumer rules path above.

**Structure:** follow agent-kit **`templates/project.mdc.template`** (YAML front matter + Purpose, Stack, …). Keep **Notes** and **Domain** short when possible to save context in every chat.

Required policy fields the template already expects:

- **Quality mode** Strict | Lean (+ 1-line justification)
- **Security gate** (align with the orchestrator or “orchestrator default”)

## After generating

1. Saved path  
2. Fields marked **inferred** / **unknown** to review  
3. Summary ≤3 lines

## Anti-patterns

Do not copy the README literally; do not list every agent without reason; do not omit warnings about inferences.
