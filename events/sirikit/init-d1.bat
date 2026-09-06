@echo off
echo =======================================================
echo  Initializing D1 Database for sirikit
echo =======================================================
echo.
echo 1. Creating D1 Database on Cloudflare (Run once):
echo    npx wrangler d1 create art_event_1
echo.
echo 2. Executing Schema remotely:
npx wrangler d1 execute art_event_1 --file=schema.sql --remote
pause
