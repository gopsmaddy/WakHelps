@echo off

set UNAME=%USERNAME%

echo ******************************
echo Connecting network drives ....
echo.


rem Remove network drives, in case any point to the wrong place

net use p: /d
net use r: /d
net use s: /d
net use t: /d
net use w: /d
net use x: /d
net use y: /d



Rem Map network drives

net use t: "\\192.168.0.125\Apps" /user:"aconite-tech\%UNAME%" /yes
net use p: "\\192.168.0.125\Users$\%UNAME%" /user:"aconite-tech\%UNAME%" /yes
net use r: "\\192.168.0.125\Restricted" /user:"aconite-tech\%UNAME%" /yes
net use s: "\\192.168.0.125\Company" /user:"aconite-tech\%UNAME%" /yes
net use w: "\\192.168.0.125\Releases" /user:"aconite-tech\%UNAME%" /yes
net use x: "\\192.168.0.125\Product Development" /user:"aconite-tech\%UNAME%" /yes
net use y: "\\192.168.0.125\Business Development" /user:"aconite-tech\%UNAME%" /yes
