@echo off
echo =======================================================
echo  Deploying International Photography Biennial 2026 (photography-2026)
echo  Cloudflare Account: artorg+photo2026@gmail.com
echo =======================================================
echo.
npx wrangler pages deploy public --project-name=photography-2026
pause
