# PoolConnection — Branching & Staging Workflow

**Established:** 2026-04-18
**Applies to:** repo `yourconnectionaustralia/poolconnection` on Cloudflare Pages

---

## The three environments

| Environment | Branch | URL | Purpose |
|---|---|---|---|
| **Production** | `main` | `poolconnection.pages.dev` (→ `app.poolconnection.com.au` when domain is live) | What real users see. Only merge after staging looks right. |
| **Staging** | `staging` | `staging.poolconnection.pages.dev` | Stable preview target. Visual testing, QA, cross-device checks. |
| **Feature** | `feat/*` | `<branch-alias>.poolconnection.pages.dev` | Per-branch preview for active work. Cloudflare auto-creates one for every pushed branch. |

Cloudflare Pages deploys each branch automatically on push — no manual setup needed after the one-time dashboard check described at the bottom of this doc.

## The workflow

```
feat/<thing>     →  opened as PR against staging
                    Cloudflare auto-deploys a preview at
                    feat-<thing>.poolconnection.pages.dev

staging          →  merge target for finished features
                    lives at staging.poolconnection.pages.dev
                    Use this URL for visual testing, client-side checks,
                    sharing with testers.

main             →  production only
                    merged from staging after staging looks right
                    deploys to poolconnection.pages.dev
```

### Standard promotion flow (GitHub web only — no Terminal needed)

1. Work happens on a `feat/*` branch.
2. Open a PR **into `staging`** (not main). Merge when the feature is complete.
3. Open Cloudflare Pages deploy URL for `staging` → visually verify across mobile + desktop.
4. When staging looks right: open a second PR **`staging` → `main`**. Merge to ship.
5. Production deploy happens automatically.

### Hotfix flow

If something is broken on `main` and you need to ship a fix immediately:

1. Create a `hotfix/<thing>` branch from `main` on GitHub.
2. Make the change (via web editor or Claude).
3. PR **directly to `main`**. Merge. Production deploys.
4. Immediately after, open a second PR from `main` → `staging` so staging is re-synced.

## What's in staging that isn't in main

As of 2026-04-18, staging is ahead of main by:

- `feat/design-system-v1-april-18` (DESIGN.md v1.0, HealthScore / AppShell / ui primitives, `src/index.css`, `marketing/index.html`)
- `public/landing.html` — the Apr 18 marketing landing page, served as a static asset at `staging.poolconnection.pages.dev/landing.html` for visual preview

None of these are wired into `App.jsx` yet, so the React app at staging's root URL looks identical to production's. The new landing page is only visible at `/landing.html`.

## Cloudflare dashboard — one-time check

Log in to Cloudflare → Workers & Pages → select the `poolconnection` project.

1. **Settings → Builds & deployments → Preview deployments** should be set to "All non-production branches". This is the default — confirm it is.
2. **Settings → Environment variables** — make sure any staging-specific env vars are set under the "Preview" scope (not "Production"). Keep production keys out of staging, and vice versa. Especially relevant once live Stripe keys go in.
3. **Custom domains** (optional, for later): when `poolconnection.com.au` is registered, point the production branch at `app.poolconnection.com.au` and optionally reserve `staging.poolconnection.com.au` for the staging branch.

## URLs to bookmark

- Production app: https://poolconnection.pages.dev/
- Staging app (React): https://staging.poolconnection.pages.dev/
- Staging landing page (new design): https://staging.poolconnection.pages.dev/landing.html
- Repo: https://github.com/yourconnectionaustralia/poolconnection
- Cloudflare Pages project: https://dash.cloudflare.com/4015bf1dd75ccf65067a769a1bfb281d/workers-and-pages

Feature-branch preview URLs follow the pattern `<branch-alias>.poolconnection.pages.dev`, where branch-alias replaces `/` with `-` and truncates to 28 chars. For `feat/design-system-v1-april-18` that resolves to `feat-design-system-v1-april-.poolconnection.pages.dev` (Cloudflare will show the exact URL in the Deployments tab).
