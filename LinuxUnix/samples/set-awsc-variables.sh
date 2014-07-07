#!/bin/bash

#export AWSC_LIB=/opt/awsc/lib
#export AWSC_CONFIG=/etc/opt/awsc
#export AWSC_LOG=/var/awsc/logs

export AWSC_LIB=/home/awsc/aconite/converter/lib
export AWSC_CONFIG=/home/awsc/aconite/converter/config
export AWSC_LOG=/home/awsc/aconite/converter/logs

export MQ_JARS=com.ibm.mq.headers.jar:com.ibm.mq.jmqi.jar:com.ibm.mqjms.jar:dhbcore.jar:jms.jar

export AWSC_JARS=$AWSC_LIB/aconite-ics-wrapper-app.jar:$AWSC_LIB/aconite-ics-converter-app.jar




