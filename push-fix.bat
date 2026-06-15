@echo off
del /f ".git\HEAD.lock" 2>nul
del /f ".git\index.lock" 2>nul
git add -A
git status
git commit -m "fix: remove custom show tab, use native sidebar toggle only"
git push origin main
pause
