# Event/Master Sync Change Log

## Scope

Event: `18-poh-chang-art-workshop`

Event URL: `https://18pohchangartworkshop.pages.dev`

Master URL: `https://artexhibition.pages.dev`

## Work Completed

- Moved the Event deployment to the same Cloudflare account as the Master Portal.
- Deployed Pages project `18pohchangartworkshop`.
- Created and bound replacement D1 database `d1-18-poh-chang-art-workshop-prod`.
- Replacement D1 ID: `722b3455-1166-4967-a0b9-e23c12fa319f`.
- Migrated the Event artwork dataset from Master into the replacement Event D1.
- Preserved artwork IDs `177` through `352` so existing artwork links remain valid.
- Added `no-store` response headers to Event config and submission list APIs.
- Added `cache: "no-store"` to the Event submission client fetch.
- Reconciled stale Master records after Event deletions.
- Updated the Master event registration so its `secret_token` matches the Event `SHARED_SECRET_TOKEN`.

## Verified State

- Event approved submissions: `154`.
- Master artworks for this event: `154`.
- Event delete webhook authorization: verified with HTTP `200` using a harmless nonexistent artwork ID.
- Event deletion handler syntax: passed `node --check`.
- Event API/config/client files: no language-service errors.
- Browser counter displays `1/176` immediately after the initial migration; after later deletions the APIs report the current count and Master reconciliation matches Event.

## Important Operational Notes

- Master `/api/sync/pull` only upserts; it does not remove artworks deleted from an Event.
- Event `/api/submissions/sync-all` currently performs one webhook request per artwork and can exceed the Cloudflare Worker subrequest limit for large datasets. Do not use it for large full re-syncs until it is batched or redesigned.
- Future Event deletes now use the registered Event token and remove the matching Master record through `/api/sync` with `action: "delete"`.
- The old D1 `d1-18-poh-chang-art-workshop` remains in the account but is no longer bound by the production Event configuration.
- A separate accidental Pages project named `18-poh-chang-art-workshop` (with hyphens) was created during account/project discovery; production uses `18pohchangartworkshop` without hyphens.

## Relevant Source Files

- `events/18-poh-chang-art-workshop/wrangler.toml`
- `events/18-poh-chang-art-workshop/functions/api/config.js`
- `events/18-poh-chang-art-workshop/functions/api/submissions/index.js`
- `events/18-poh-chang-art-workshop/public/js/api.js`
- `events/18-poh-chang-art-workshop/functions/api/submissions/[id]/delete.js`
- `events/18-poh-chang-art-workshop/functions/api/submissions/sync-all.js`