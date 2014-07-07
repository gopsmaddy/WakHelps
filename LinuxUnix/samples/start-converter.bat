set AWSC_HOME=C:/Wakkir/Work/TSMConvertor/converter
set AWSC_LIB=C:/Wakkir/Work/TSMConvertor/converter/lib
set AWSC_CONFIG=C:/Wakkir/Work/TSMConvertor/converter/config
set AWSC_LOG=C:/Wakkir/Work/TSMConvertor/converter/logs

set MQ_JARS=com.ibm.mq.headers.jar;com.ibm.mq.jmqi.jar;com.ibm.mqjms.jar;dhbcore.jar;jms.jar
set AWSC_JARS=%AWSC_LIB%/aconite-ics-wrapper-app.jar;%AWSC_LIB%/aconite-ics-converter-app.jar

java -Dcom.ibm.msg.client.commonservices.log.status=OFF -Dcom.ibm.msg.client.commonservices.ffst.suppress=1 -Dlog4j.configuration=file:%AWSC_CONFIG%/log4j.properties -Dmq-converter-config-dir=%AWSC_CONFIG% -Dmq-converter-log-dir=%AWSC_LOG% -cp %AWSC_JARS%;%MQ_JARS% net.aconite.wrapper.service.WrapperServerMain




