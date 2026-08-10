---
name: rcrdk-platform-pipeline
description: CI/CD or deploy-only change — DevOps focus (no product feature)
---

Run **in a single response** as **`/devops`** (pipeline, environments, rollout).

1. **Context** — stack and deploy from `project.mdc` if present; locate workflows (`.github/workflows`, `.gitlab-ci.yml`, etc.), Docker, release scripts.
2. **Proposal** — concrete changes (YAML snippets, Dockerfile, job order) or a checklist of files to edit; short trade-offs (pipeline time, parallelism).
3. **CI security** — if there are **secrets**, tokens, or broad permissions: risk paragraph and remind **`/secure`** before merge; prefer provider secrets, not plaintext values.
4. **Boundary** — **do not** implement an application feature; that is **`/do`** in another request.

End with `## Summary` and `## Files to touch` (list).
