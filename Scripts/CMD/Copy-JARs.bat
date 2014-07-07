
SET CurrentDir=%~dp0
SET AffinaDir=C:\JDrive\modules\Affina
SET WADir=C:\WebSphere\AppServer\profiles\AppSrv01\installedApps\ACO212Cell01


CD %AffinaDir%\Infrastructure\target
COPY  Infrastructure-2.12.jar Infrastructure.jar
COPY  Infrastructure.jar %WADir%\new_card_ICS_1.ear\Infrastructure.jar

CD %AffinaDir%\PMAframework\target
COPY  PMAframework-2.12.jar PMAframework.jar
COPY  PMAframework.jar %WADir%\new_card_ICS_1.ear\PMAframework.jar



cd %CurrentDir%



