
cd C:\WebSphere\AppServer\profiles\AppSrv01\logs\Wakkir
del *.log*

cd C:\NSAMConfig\websphere\logs
del *.log*

cd C:\affina\logs
del *.log*

cd C:\ATH\logs
del *.log*

cd C:\App\sunApp\glassfish\domains\domain1\logs
del *.log*

cd C:\WebSphere\AppServer\profiles\AppSrv01
del /f /s /q logs\*.log*

cd C:\WebSphere\AppServer\profiles\AppSrv01\logs\ffdc
del *.log*
del *.txt*

cd C:\WebSphere\AppServer\profiles\Dmgr01
del /f /s /q logs\*
del /f /s /q temp\*


cd C:\affina-R2.10.14993WAS7\logs
del *.log*
