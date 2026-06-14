@echo off
if exist ".git\index.lock" del /f ".git\index.lock"
git add -A
git status
git commit -m "fix: copyright 15-06-2026 + polished blue sidebar toggle buttons"
git push origin main
pause
