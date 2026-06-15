@echo off
del /f ".git\HEAD.lock" 2>nul
del /f ".git\index.lock" 2>nul
git add -A
git status
git commit -m "feat: polished sidebar strip with gradient + breathing show tab"
git push origin main
pause
