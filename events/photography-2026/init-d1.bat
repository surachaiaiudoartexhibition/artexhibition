@echo off
echo =======================================================
echo  Initializing D1 Database for photography-2026
echo =======================================================
echo.
echo 1. Creating D1 Database on Cloudflare (Run once):
echo    npx wrangler d1 create d1-photo2026
echo.
echo 2. Executing Schema remotely:
npx wrangler d1 execute d1-photo2026 --file=schema.sql --remote
pause
