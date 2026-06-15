@echo off
del /f ".git\HEAD.lock" 2>nul
del /f ".git\index.lock" 2>nul
git add -A
git status
git commit -m "fix: remove auto-collapse on click, use native collapse button styled as strip"
git push origin main
pause
