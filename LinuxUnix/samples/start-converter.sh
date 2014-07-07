#!/bin/bash

./set-awsc-variables.sh

source ./set-awsc-variables.sh
echo "AWSC_LOG - ${AWSC_LOG}"

java -Dcom.ibm.msg.client.commonservices.log.status=OFF -Dcom.ibm.msg.client.commonservices.ffst.suppress=1 -Dlog4j.configuration=file:$AWSC_CONFIG/log4j.properties -Dmq-converter-config-dir=$AWSC_CONFIG -Dmq-converter-log-dir=$AWSC_LOG -cp $AWSC_JARS:$MQ_JARS net.aconite.wrapper.service.WrapperServerMain &



