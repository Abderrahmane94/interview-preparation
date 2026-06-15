@echo off
del /f ".git\HEAD.lock" 2>nul
del /f ".git\index.lock" 2>nul
git add -A
git status
git commit -m "fix: restore full CSS + hide button top + favicon + Node18"
git push origin main
pause
