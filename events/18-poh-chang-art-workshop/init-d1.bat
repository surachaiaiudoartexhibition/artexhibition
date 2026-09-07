@echo off
echo =======================================================
echo  Initializing D1 Database for 18-poh-chang-art-workshop
echo =======================================================
echo.
echo 1. Creating D1 Database on Cloudflare (Run once):
echo    npx wrangler d1 create d1-18-poh-chang-art-workshop
echo.
echo 2. Executing Schema remotely:
npx wrangler d1 execute d1-18-poh-chang-art-workshop --file=schema.sql --remote
pause
