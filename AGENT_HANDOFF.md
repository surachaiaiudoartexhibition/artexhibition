# Agent Handoff: Virtual Exhibition System

Read this file before changing the repository. It records work already completed in the current handoff and prevents duplicate migrations or re-syncs.

## Current Production State

- Event: `18-poh-chang-art-workshop`
- Event URL: `https://18pohchangartworkshop.pages.dev`
- Master URL: `https://artexhibition.pages.dev`
- Shared Cloudflare account is the account currently used by Wrangler.
- Production Pages project: `18pohchangartworkshop`
- Production Event D1: `d1-18-poh-chang-art-workshop-prod`
- Production Event D1 ID: `722b3455-1166-4967-a0b9-e23c12fa319f`
- Event and Master currently match at `154` approved artworks.

## Already Completed

1. Moved the Event deployment to the same Cloudflare account as the Master Portal.
2. Created and bound the replacement Event D1 database.
3. Migrated the artwork dataset while preserving artwork IDs `177` through `352`.
4. Deployed the Event to the existing production Pages project.
5. Disabled stale caching for Event config/submission API responses and client submission fetches.
6. Reconciled 22 stale Master records after Event deletions.
7. Updated Master event registration so the Event shared token is accepted by Master `/api/sync`.
8. Verified Event delete authorization with a harmless nonexistent artwork ID and received HTTP `200`.
9. Committed the focused work as `65c10b9` (`fix: align Poh Chang event and master sync`).
10. Recorded detailed history in `docs/change-log-2026-09-08-event-master-sync.md`.

## Do Not Repeat

- Do not create another D1 or Pages project for this Event.
- Do not rerun the full data migration unless the current production D1 is explicitly replaced.
- Do not run `/api/submissions/sync-all` on the full 154+ artwork dataset: it exceeds the Cloudflare Worker subrequest limit.
- Do not delete or reset the production D1 to solve a normal sync problem.
- Do not overwrite unrelated uncommitted changes in other Event folders.

## Remaining Work

- Redesign `sync-all` to use a bounded/batched strategy or a queue before using it for large datasets.
- Consider adding a Master reconciliation endpoint that deletes stale IDs in one controlled operation.
- Improve delete failure reporting: local Event deletion currently succeeds even when the Master webhook fails; the response includes `masterPortalSync` for diagnosis.

## Verification Commands

```powershell
# Current Event count
Invoke-RestMethod 'https://18pohchangartworkshop.pages.dev/api/submissions?status=approved&limit=1000'

# Current Master count for this Event
Invoke-RestMethod 'https://artexhibition.pages.dev/api/artworks?event_id=18-poh-chang-art-workshop&limit=500'

# Production D1 binding
npx.cmd wrangler d1 list

# Read this handoff and detailed log before editing
Get-Content AGENT_HANDOFF.md
Get-Content docs\change-log-2026-09-08-event-master-sync.md
```

## Relevant Source

- `events/18-poh-chang-art-workshop/wrangler.toml`
- `events/18-poh-chang-art-workshop/functions/api/submissions/[id]/delete.js`
- `events/18-poh-chang-art-workshop/functions/api/submissions/sync-all.js`
- `events/18-poh-chang-art-workshop/functions/api/submissions/index.js`
- `apps/master-portal/functions/api/sync.js`
- `apps/master-portal/functions/api/sync/pull.js`

## Git Safety

The worktree contains unrelated changes in other Event folders. Inspect `git status` before editing and commit only files belonging to the requested task.