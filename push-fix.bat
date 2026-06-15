@echo off
del /f ".git\HEAD.lock" 2>nul
del /f ".git\index.lock" 2>nul
git add -A
git status
git commit -m "fix: hide button as right-edge tab + favicon + Node18 nvmrc"
git push origin main
pause
