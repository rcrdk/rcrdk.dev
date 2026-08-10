---
name: rcrdk-prod-incident
description: Production incident — SRE triage and next steps
---

Run **in a single response** as **`/sre`** (observability / incident).

1. **Triage** — user impact, inferred severity, **ordered** hypotheses (most likely first); what to measure now (metrics, logs, recent deploy).
2. **Next steps** — 3 measurable actions (sample log query, dashboard, rollback/canary if applicable); short bullet runbook.
3. **Technical handoff** — if evidence points to **code**, indicate **`/debug`** → **`/do`** in the same thread or as an explicit next step; if it points to **config/infra**, indicate **`/devops`** or a rollback procedure.
4. **Post-mortem** — only a minimal outline if asked or the incident is severe; otherwise stay on **mitigation**.

End with `## Recommended next steps` (actionable bullets).

If a fix or mitigation lands in the same thread, close with **`honest-delivery`**: triad Symptom | Cause | Evidence (logs/metrics), status Closed | Partial | Unconfirmed, and the four sections (What changed · What you should see now · What is still unresolved · How to test in 30 seconds).
