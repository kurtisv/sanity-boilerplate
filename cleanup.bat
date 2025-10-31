@echo off
echo Nettoyage des fichiers Tailwind...
del /F src\components\layout\Header.tsx 2>nul
del /F src\components\layout\Footer.tsx 2>nul
del /F src\sanity\schemas\siteSettings.ts 2>nul
echo Nettoyage termine!
echo.
echo Les composants Styled Components sont dans:
echo - src\components\layout\Header\Header.tsx
echo - src\components\layout\Footer\Footer.tsx
echo.
echo Redemarrez le serveur: npm run dev
pause
