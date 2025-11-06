@echo off
REM ============================================
REM NETTOYAGE DU PROJET - COMMANDES WINDOWS
REM ============================================
REM Copiez-collez ces commandes UNE PAR UNE dans votre terminal
REM Testez après chaque étape avec: npm run dev
REM ============================================

echo.
echo ========================================
echo ETAPE 1 - DOCUMENTS MARKDOWN (14 fichiers)
echo ========================================
echo.

REM 1. Documents markdown redondants
del 00_LIRE_EN_PREMIER.md
del 01_REGLES_CRITIQUES.md
del 02_TOUTES_LES_ERREURS.md
del CLEANUP_SUMMARY.md
del CONFORMITY_REPORT.md
del DOCUMENTATION_INDEX.md
del FICHIERS_IMPORTANTS.md
del GUIDE_APPROPRIATION.md
del MANUEL_AUTO_IMPLEMENTATION.md
del NOUVEAUX_BLOCS_COMPLETS.md
del NOUVEAUX_COMPOSANTS_REACT.md
del TESTING_PLAN.md
del WEBHOOK_SETUP.md
del README_FINAL.md

echo.
echo ========================================
echo ETAPE 2 - SCRIPTS OBSOLETES (8 fichiers)
echo ========================================
echo.

del scripts\add-common-fields.js
del scripts\validate-schemas.js
del cleanup-orphaned-docs.js
del simple-test.js
del test-apis.js
del cleanup.bat
del demo-content.json
del setup-env.bat

echo.
echo ========================================
echo ETAPE 3 - DOSSIERS VIDES (11 dossiers)
echo ========================================
echo.

rmdir /q content-massotherapie
rmdir /q src\app\admin\create-demos
rmdir /q src\app\admin\kvks-manager
rmdir /q src\app\admin\massage-site-manager
rmdir /q src\app\admin\regenerate
rmdir /q src\app\api\admin
rmdir /q src\app\api\create-kvks-site
rmdir /q src\app\api\create-massage-site
rmdir /q src\app\api\get-all-pages
rmdir /q src\components\pages
rmdir /q src\components\ui

echo.
echo ========================================
echo ETAPE 4 - PAGES ADMIN DE TEST (5 dossiers)
echo ========================================
echo.

rmdir /s /q src\app\admin\demo
rmdir /s /q src\app\admin\fix-apis
rmdir /s /q src\app\admin\fix-keys
rmdir /s /q src\app\admin\migration
rmdir /s /q src\app\admin\navigation

echo.
echo ========================================
echo ETAPE 5 - PAGES WEBSITE DE TEST (5 dossiers)
echo ========================================
echo.

rmdir /s /q "src\app\(website)\modern-home"
rmdir /s /q "src\app\(website)\styled-home"
rmdir /s /q "src\app\(website)\test-404"
rmdir /s /q "src\app\(website)\theme-demo"
rmdir /s /q "src\app\(website)\routing-analysis"

echo.
echo ========================================
echo ETAPE 6 - APIS DE TEST (4 dossiers)
echo ========================================
echo.

rmdir /s /q src\app\api\migrate-all-blocks
rmdir /s /q src\app\api\migrate-hero-blocks
rmdir /s /q src\app\api\test-stats
rmdir /s /q src\app\api\cleanup-studio

echo.
echo ========================================
echo ETAPE 7 - PAGES ADMIN REDONDANTES (9 dossiers)
echo OPTIONNEL - Seulement si vous utilisez auto-generate
echo ========================================
echo.

REM rmdir /s /q src\app\admin\about
REM rmdir /s /q src\app\admin\faq
REM rmdir /s /q src\app\admin\home
REM rmdir /s /q src\app\admin\legal
REM rmdir /s /q src\app\admin\pages
REM rmdir /s /q src\app\admin\portfolio
REM rmdir /s /q src\app\admin\pricing
REM rmdir /s /q src\app\admin\services
REM rmdir /s /q src\app\admin\site-settings

echo.
echo ========================================
echo ETAPE 8 - APIS SETUP REDONDANTES (14 dossiers)
echo OPTIONNEL - Seulement si vous utilisez auto-generate
echo ========================================
echo.

REM rmdir /s /q src\app\api\setup-about
REM rmdir /s /q src\app\api\setup-blog
REM rmdir /s /q src\app\api\setup-careers
REM rmdir /s /q src\app\api\setup-contact
REM rmdir /s /q src\app\api\setup-contact-simple
REM rmdir /s /q src\app\api\setup-faq
REM rmdir /s /q src\app\api\setup-footer
REM rmdir /s /q src\app\api\setup-header
REM rmdir /s /q src\app\api\setup-legal
REM rmdir /s /q src\app\api\setup-portfolio
REM rmdir /s /q src\app\api\setup-pricing
REM rmdir /s /q src\app\api\setup-services
REM rmdir /s /q src\app\api\setup-studio-showcase
REM rmdir /s /q src\app\api\import-home

echo.
echo ========================================
echo NETTOYAGE TERMINE !
echo ========================================
echo.
echo Testez maintenant:
echo   npm run dev
echo   http://localhost:3000
echo   http://localhost:3000/studio
echo.
