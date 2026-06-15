@echo off
del /f ".git\HEAD.lock" 2>nul
del /f ".git\index.lock" 2>nul
git add -A
git status
git commit -m "fix: remove hide strip (was blocking scroll), keep only show tab"
git push origin main
pause
