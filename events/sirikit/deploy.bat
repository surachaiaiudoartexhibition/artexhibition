@echo off
echo =======================================================
echo  Deploying Queen Sirikit Art Exhibition (sirikit)
echo  Cloudflare Account: surachai.ai.udo@gmail.com
echo =======================================================
echo.
npx wrangler pages deploy public --project-name=sirikit
pause
