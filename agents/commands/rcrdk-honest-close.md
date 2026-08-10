---
name: rcrdk-honest-close
description: Honest close — symptom/cause/evidence triad plus fixed delivery summary
---

Close the current delivery per **`honest-delivery`** (consumer: `agents/rules/honest-delivery.mdc`).

**Do not** apply new code unless required to **produce evidence** (e.g. curl, test, query).

1. **Triad** — table Symptom | Likely cause | Evidence (state **after** the patch)
2. **Status** — Closed | Partial | Unconfirmed (one line with justification)
3. **Scopes** — if UX / data / backend were in the request, say what **was** and **was not** handled in this thread
4. **Pending validation** — only if you did not prove in prod/staging; list what is missing and who/what is needed

**Required output** (in this order):

## Triad (post-fix)
| Symptom | Likely cause | Evidence |
|---------|--------------|----------|

## Status
[Closed | Partial | Unconfirmed] — [one sentence]

## What changed

## What you should see now

## What is still unresolved

## How to test in 30 seconds
