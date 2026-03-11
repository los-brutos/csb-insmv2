@echo off
REM 
REM création des compendiums du module CSB INS/MV
REM
REM le paquet fvtt doit être  installé https://github.com/foundryvtt/foundryvtt-cli
REM
REM /!\ nécessite que l'instance de foundry soit fermée avant de lancer la commande
REM
@echo off
cls
echo * ********************************* *
echo * start create compendiums          *
echo * ********************************* *
echo.
echo /// configure environment
call fvtt package workon csb-insmv --type=Module
echo.
echo /// pack compendium "actor-templates"
call fvtt package pack actor-templates
echo.
echo /// pack compendium "item-templates"
call fvtt package pack item-templates
echo.
echo * ********************************* *
echo * all compendiums have been created *
echo * ********************************* *
echo.
@echo on
