---
name: rcrdk-debug-and-fix
description: Diagnose root cause and apply a minimal fix (debugger + executor)
---

Assume **`debugger`** then **`executor`** in the **same conversation**. Follow **`honest-delivery`**.

1. Restate the problem: expected vs actual, when it occurs, recent relevant changes.
2. **Initial triad** (before the patch): Symptom | Likely cause | Current evidence.
3. List ordered hypotheses; eliminate with evidence (logs, code reading, commands).
4. State **root cause** in one paragraph — **one scope** (UX **or** data **or** backend); other scopes stay explicit as out of this thread.
5. Apply a **minimal fix** with a complete diff.
6. **Prove** the fix: exact scenario, real response (API/data/test); use **Verification** from `project.mdc` if present.
7. **Final triad** — revalidate; status Closed | Partial | Unconfirmed.

If you cannot reproduce in the environment, declare **Pending validation** and which hypothesis is most likely — **do not** say "fixed".

**Required final output:**

## Triad (post-fix)
| Symptom | Likely cause | Evidence |

## Status
[Closed | Partial | Unconfirmed]

## What changed

## What you should see now

## What is still unresolved

## How to test in 30 seconds
