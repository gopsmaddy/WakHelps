@echo on

set BUILD_NAME=%1
set BUILD_PATH=%2
set SIGNATURE_PATH=%3

fciv.exe -add %BUILD_PATH%%BUILD_NAME% -both > %SIGNATURE_PATH%%BUILD_NAME%.signature

