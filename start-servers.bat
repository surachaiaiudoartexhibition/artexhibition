@echo off
echo ===========================================================
echo  Starting Multi-Tenant Virtual Exhibition System Servers
echo ===========================================================
echo.
echo Event Webapp:  http://localhost:8787
echo Master Portal: http://localhost:8788
echo.
node scripts\dev-server.js
pause
