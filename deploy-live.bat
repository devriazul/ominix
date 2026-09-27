@echo off
echo ========================================================
echo   OMNIX NETWORK - AUTOMATED LIVE VPS DEPLOYMENT
echo ========================================================
echo.
echo [1/5] Building Next.js production bundle...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed! Aborting deployment.
    exit /b %errorlevel%
)

echo.
echo [2/5] Copying static assets to standalone build...
xcopy /E /I /Y .next\static .next\standalone\.next\static
xcopy /E /I /Y public .next\standalone\public

echo.
echo [3/5] Archiving distribution bundle...
tar -czf deploy.tar.gz -C .next/standalone .

echo.
echo [4/5] Uploading deploy.tar.gz to Hostinger live server via SSH...
scp -P 65002 -o StrictHostKeyChecking=no deploy.tar.gz u892414798@46.202.186.221:/home/u892414798/domains/omnixnetwork.com/deploy.tar.gz

echo.
echo [5/5] Extracting production app and restarting Passenger on live server...
ssh -p 65002 -o StrictHostKeyChecking=no u892414798@46.202.186.221 "cd /home/u892414798/domains/omnixnetwork.com/app && tar -xzf ../deploy.tar.gz && mkdir -p ../public_html/_next/static && cp -r .next/static/* ../public_html/_next/static/ && mkdir -p tmp && touch tmp/restart.txt && rm ../deploy.tar.gz"

echo.
echo [SUCCESS] Omnix Network successfully deployed to https://omnixnetwork.com/ !
echo ========================================================
