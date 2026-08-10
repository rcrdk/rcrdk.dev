---
name: evidence-verifier
description: Proof checklist for staging/prod before asking for human retest. Use after a fix or when project.mdc has a Verification section.
---

# Skill: Evidence Verifier

Complements **`/debug`**, **`/do`**, **`/sre`**, and the **`honest-delivery`** rule. Goal: **prove** before asking for a human retest.

## When to use

- Fix that affects API, data, bucket, queue, or visible behavior in prod/staging
- `project.mdc` with a filled **Verification** section
- Before closing with **`/rcrdk-honest-close`**

## Checklist (execute in order)

1. **Exact scenario** — reproduced the reported case (not only the happy path)?
2. **Real response** — HTTP status, body size, key fields, bucket/count?
3. **Before vs. after** — evidence shows a change aligned with the symptom?
4. **Source** — log, query, automated test, curl (cite command or snippet)
5. **Limits** — what was **not** possible to access (prod, credential, VPN)?

## Output

```
## Evidence verification

### Scenario reproduced
[which scenario — e.g. empty inbox, user X]

### Evidence collected
- [type]: [concrete result]

### Pending validation (if any)
- [what is missing] — [why it was not possible]

### Verdict
[Closed | Partial | Not confirmed] — aligned with the triad in honest-delivery
```

## Anti-patterns

- Asking for retest without attempting verification from `project.mdc`
- Assuming prod = local without declaring it
- "Should work" without citing a command, log, or test
