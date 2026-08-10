---
name: rcrdk-hotfix
description: Lean mode — implement + debug + light review (no full pipeline)
---

Run **in a single response**, **Lean** style from `project.mdc` (if missing, assume Lean). Follow **`honest-delivery`**.

1. **Single scope** — if the request mixes UX + data + backend, implement only one; name the others as pending.
2. **Implement** the minimal fix or change requested.
3. **Mental `/debug`** — triad Symptom | Cause | Evidence; validate the fix with a command or execution reasoning.
4. **Short review** — Critical and Important only (no nitpicks).

**Do not** force a full test suite or `/secure` **unless** the change touches sensitive code (auth, secrets, PII); in that case add one security-risk paragraph.

**Required final output:**

## Status
[Closed | Partial | Unconfirmed]

## What changed

## What you should see now

## What is still unresolved

## How to test in 30 seconds
