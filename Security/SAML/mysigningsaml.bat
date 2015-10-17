myxmlsectool.bat --sign --inFile saml2metadata.xml --outFile signedsaml2metadata.xml --keystore my/jrkeystore.jks --keystorePassword password  --key jridpsystem  --keyPassword password


rem http://xacmlinfo.org/2014/04/10/how-to-saml-generating-signature-for-saml-metadata/
rem sh xmlsectool.sh --sign --inFile saml2metadata.xml --outFile signedsaml2metadata.xml --keystore wso2carbon.jks --keystorePassword wso2carbon  --key wso2carbon  --keyPassword wso2carbon