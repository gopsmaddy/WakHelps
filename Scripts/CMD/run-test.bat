@@echo off
REM starting.....

SET AFFINA_HOME=C:\JDrive\modules\Affina

CD %AFFINA_HOME%\Infrastructure

CD

mvn clean installl

echo 'done'

PAUSE;