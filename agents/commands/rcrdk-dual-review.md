---
name: rcrdk-dual-review
description: Code review + security pass in one request (ideal before a sensitive merge)
---

Assume the **`code-reviewer`** and **`security-reviewer`** roles **in the same response**, over the current code or diff in the conversation (ask for context if missing).

**Part A — Code review:** Critical / Important / Suggestion / positives.

**Part B — Security:** compact checklist (auth, input, sensitive data, dependencies). If not applicable, **Gate N/A** with one sentence.

**Part C — Single action list** ordered by priority for the implementer.

Do not implement code unless explicitly asked for minimal examples.
