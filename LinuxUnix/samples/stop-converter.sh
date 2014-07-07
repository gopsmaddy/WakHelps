#!/bin/bash


./set-awsc-variables.sh

source ./set-awsc-variables.sh
echo "AWSC_LOG - ${AWSC_LOG}"

java -Dlog4j.configuration=file:$AWSC_CONFIG/log4j.properties -Dmq-converter-config-dir=$AWSC_CONFIG -Dmq-converter-log-dir=$AWSC_LOG -cp $AWSC_JARS net.aconite.wrapper.client.WrapperClientMain stop

export PID_LOG=$AWSC_LOG/awsc*.pid


while : ; do
    [[ ! -f $PID_LOG ]] && break
    sleep 2
done


echo "AWSC services stopped"