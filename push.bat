@echo off
echo Removing git lock file...
del /f ".git\index.lock" 2>nul

echo Staging all changes...
git add .

echo Committing...
git commit -m "Enrich all Java and Spring pages with Q&A, code examples, and French translations"

echo Pushing to GitHub...
git push origin main

echo Done!
pause
