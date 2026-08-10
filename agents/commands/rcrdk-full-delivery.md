---
name: rcrdk-full-delivery
description: Strict pipeline in one request — short plan, code, debug, tests, review, and security if applicable
---

Run **in a single conversation**, in sequence, **without** asking the user to re-type `/plan`, `/do`, etc. Follow project context (`project.mdc`, typically under `.cursor/rules/` or `agents/rules/`), the security gate in **`workflow-orchestrator`**, and **`honest-delivery`**.

**Fixed order:**

1. **Mini-plan** (8–15 lines max) — goal, files/modules, dependencies, success criteria; **separate scopes** if UX + data + backend.
2. **Implementation** — complete, working code; match project style; **one scope per delivery** when possible.
3. **Runtime verification** — exact scenario; failure hypotheses; run commands or execution reasoning; triad Symptom | Cause | Evidence.
4. **Tests** — add or suggest tests at critical points (`qa-tester`).
5. **Review** — Critical / Important / Suggestion as `code-reviewer`; **fix** critical issues yourself before closing.
6. **Security** — if the change touches secrets, auth, multi-tenant, PII, or a public API: checklist as `security-reviewer`; otherwise declare **Gate N/A** in one line.

**Required final output:**

## Status
[Closed | Partial | Unconfirmed]

## What changed

## What you should see now

## What is still unresolved

## How to test in 30 seconds
