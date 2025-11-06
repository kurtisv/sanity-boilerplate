@echo off
echo.
echo ========================================
echo   Configuration du fichier .env
echo ========================================
echo.

if exist .env (
    echo Fichier .env existe deja.
    echo.
    type .env
    echo.
    set /p "overwrite=Voulez-vous le remplacer? (O/N): "
    if /i not "%overwrite%"=="O" (
        echo Operation annulee.
        exit /b
    )
)

echo.
echo Copie de env.example vers .env...
copy env.example .env

echo.
echo ========================================
echo   IMPORTANT: Ajoutez votre cle Anthropic
echo ========================================
echo.
echo Editez maintenant le fichier .env et ajoutez:
echo   ANTHROPIC_API_KEY=sk-ant-api03-...votre-cle...
echo.
echo Puis testez avec:
echo   npm run agents:run -- builder --prompt="test" --dry-run=false
echo.

notepad .env

echo.
echo Configuration terminee!
pause
