# Upload Guide — `feature/suggestion-box` branch

**Date prepared:** 2026-05-15
**Branch suggestion:** `feature/suggestion-box`
**Source repo:** `github.com/yourconnectionaustralia/poolconnection`

This guide lists every file to upload to a new GitHub branch via the web
interface. All paths are relative to the repo root (`poolconnection/`).

---

## Files to upload (in order)

### 1. New files

| Repo path | Purpose | Local path on your Mac |
|---|---|---|
| `src/components/SuggestionBox.jsx` | The Figma-style feedback widget | `/Users/JamesMac/PoolConnection/poolconnection/src/components/SuggestionBox.jsx` |
| `supabase/migrations/20260515_create_suggestions.sql` | Creates `suggestions` table + RLS | `/Users/JamesMac/PoolConnection/poolconnection/supabase/migrations/20260515_create_suggestions.sql` |
| `supabase/functions/submit-suggestions/index.ts` | Edge Function: saves batch + emails admin | `/Users/JamesMac/PoolConnection/poolconnection/supabase/functions/submit-suggestions/index.ts` |
| `docs/PHASE_2_BACKLOG.md` | Shop Near Me parking lot + future feedback triage template | `/Users/JamesMac/PoolConnection/poolconnection/docs/PHASE_2_BACKLOG.md` |
| `docs/RemoveShops.PATCH.md` | Find-and-remove pattern for any leftover Shops UI in your live App.jsx | `/Users/JamesMac/PoolConnection/poolconnection/docs/RemoveShops.PATCH.md` |

### 2. Modified files

| Repo path | Change | Local path on your Mac |
|---|---|---|
| `src/App.jsx` | +2 lines: import SuggestionBox at top; mount `<SuggestionBox currentView={activeView} />` before closing `</div>` of the app shell. Done — file is upload-ready. | `/Users/JamesMac/PoolConnection/poolconnection/src/App.jsx` |
| `src/supabase.js` | Adds named exports for `SUPABASE_URL` and `SUPABASE_ANON_KEY` (client behaviour unchanged). Done — file is upload-ready. | `/Users/JamesMac/PoolConnection/poolconnection/src/supabase.js` |

---

## GitHub web upload procedure

1. Go to `github.com/yourconnectionaustralia/poolconnection`.
2. Use the branch dropdown → type `feature/suggestion-box` → **Create branch from `main`**.
3. For each file above:
   - **New files:** click **Add file → Upload files**, drag the file into the drop zone, set the path correctly (GitHub picks up the folder structure from your local files if you drag the whole folder, otherwise type the path manually).
   - **Modified files:** open the existing file in the new branch, click the pencil icon, paste the new contents, scroll down and commit to `feature/suggestion-box`.
4. Once all files are committed to the branch, open a Pull Request titled
   **"feat: in-app SuggestionBox + defer Shop Near Me"** with body:
   > Adds Figma-style feedback widget (floating +, multi-pin drop, batch submit
   > to Supabase + admin email). Schema + Edge Function included. Defers Shop
   > Near Me to Phase 2 with backlog notes.

Cloudflare Pages auto-deploys a preview build for the PR; test the preview URL
before merging to `main`.

---

## What happens outside the repo (Supabase setup)

These steps don't go in GitHub — do them in the Supabase dashboard before
(or just after) merging:

1. **Run the SQL migration**
   Supabase dashboard → SQL Editor → paste the contents of
   `supabase/migrations/20260515_create_suggestions.sql` → **Run**.

2. **Mark yourself as admin** (so you can read all rows from the dashboard later):
   ```sql
   update auth.users
      set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
                            || '{"role":"admin"}'::jsonb
    where email = 'yourconnectionaustralia@gmail.com';
   ```

3. **Set Edge Function secrets** (Project Settings → Edge Functions → Secrets):

   | Key | Value |
   |---|---|
   | `RESEND_API_KEY` | from resend.com (free 3,000 emails/mo) |
   | `ADMIN_EMAIL` | `yourconnectionaustralia@gmail.com` |
   | `FROM_EMAIL` | `PoolConnection <onboarding@resend.dev>` (or your verified-domain sender) |
   | `ALLOWED_ORIGINS` | `https://poolconnection.pages.dev,https://app.poolconnection.com.au,http://localhost:5173` |

   You can skip Resend — the function still writes to the DB; you'll read rows
   from the dashboard until you wire email later.

4. **Deploy the Edge Function**
   - CLI: `supabase functions deploy submit-suggestions --no-verify-jwt`
   - Or dashboard: Edge Functions → Create function → paste `index.ts`.

   The `--no-verify-jwt` flag lets anon/trial users submit feedback. The function
   still validates the JWT internally to attribute submissions to signed-in users
   when present.

---

## Post-merge smoke test

1. Open the deployed app at `poolconnection.pages.dev`.
2. Bottom-right shows a light-blue **+** button.
3. Tap **+** → top banner appears, cursor becomes a crosshair.
4. Tap any element → pin drops, popover opens. Type "Test message" → **Save**.
5. Navigate to another view → drop another pin.
6. Tap **Review &amp; send** → **Send 2 suggestions**.
7. Check: Supabase `suggestions` table has 2 rows, your inbox has 1 email.

---

## "Shops" / "Find a Pool Shop" removal

The synced `App.jsx` doesn't contain these strings, but you mentioned they
appear in the live menu/homepage — meaning your local App.jsx has likely
drifted from the synced copy. Open `docs/RemoveShops.PATCH.md` for five
exact grep patterns covering every form the entry might take (sidebar item,
page render branch, page component, homepage tile, marketing page).

If you'd like me to write the exact diff, paste your current Sidebar JSX
(around lines 200–270) and the homepage tile grid into the next message.

---

## Files you don't need to upload

- `node_modules/`, `dist/`, `.DS_Store` — already in `.gitignore`.
- The standalone `/Users/JamesMac/Documents/Claude/Projects/PoolConnection/SuggestionBox-feature/` folder — it's the staging area; the actual versions are now copied into the repo paths above.
