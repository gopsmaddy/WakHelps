///////////////////////////URLS////////////////////////////////////////////////////////////////////////////////////
//Setting up

//var varEnvironment='LOCAL'
//var varEnvironment='DEV'
//var varEnvironment='EUAT'
var varEnvironment='LIVE'

//---------------------
/*
varWebServiceURL1 	: getReleasedDocumentsCustomFilteredDatesAsString
varWebServiceURL2 	: DownloadDocument,DownloadMultipleDocuments
varWebServiceURL3 	: getSubscriberProfile,saveSubscriberProfile,saveCommunicationPreferences
varWebServiceURL4 	: changeMyPassword
varWebServiceURL5 	: requestResetPassword,completeResetPassword
varWebServiceURL6 	: completeEnrolment

//background URLs
varWebServiceURL100 : ping (keep server alive)
varWebServiceURL101 : logout 

//ExtJS related URLs
varExtJSRelatedURL1	: Ext.BLANK_IMAGE_URL
*/	
//---------------------

var varWebServiceNonSecureURL='';
var varWebServiceSecureURL='';

var varWebServiceURL1		='';
var varWebServiceURL2		='';
var varWebServiceURL3		='';
var varWebServiceURL4		='';
var varWebServiceURL5		='';
var varWebServiceURL6		='';

var varWebServiceURL100	='';
var varWebServiceURL101	='';

var varExtJSRelatedURL1 = 'http://extjs-public.googlecode.com/svn/tags/extjs-3.3.0/release/resources/images/default/s.gif';
	
//-----------------------

if(varEnvironment=='LOCAL')
{
	//alert('LOCAL');
	varWebServiceSecureURL='http://localhost:9080/CampbellWebApplication/UI/jsp/Campbell.jsp';;
	varWebServiceNonSecureURL='http://localhost:9080/CampbellWebApplication/UI/jsp/Campbell.jsp'; //LOCAL
	
	varWebServiceURL1=varWebServiceSecureURL;
	varWebServiceURL2='http://modules.eurouwins.com/test/download.php';
	varWebServiceURL3=varWebServiceSecureURL;
	varWebServiceURL4=varWebServiceSecureURL;
	varWebServiceURL5=varWebServiceNonSecureURL;
	varWebServiceURL6=varWebServiceNonSecureURL;
	
	
	varWebServiceURL100	='http://localhost:9080/CampbellWebApplication/UI/jsp/ping.jsp';
	varWebServiceURL101	='http://localhost:9080/CampbellWebApplication/UI/jsp/login.jsp';
}

if(varEnvironment=='DEV')
{
	//alert('DEV');
	varWebServiceSecureURL='http://fwlondev3/TrcRel08/KAPI/KurtosysWSFactoryProxyAuth.aspx';
	varWebServiceNonSecureURL='http://fwlondev3/TrcRel08/KAPI/KurtosysWSFactoryProxy.aspx';   //DEV
	
	varWebServiceURL1=varWebServiceSecureURL;
	varWebServiceURL2=varWebServiceSecureURL;
	varWebServiceURL3=varWebServiceSecureURL;
	varWebServiceURL4=varWebServiceSecureURL;
	varWebServiceURL5=varWebServiceNonSecureURL;
	varWebServiceURL6=varWebServiceNonSecureURL;
	
	
	varWebServiceURL100	=varWebServiceSecureURL;
	varWebServiceURL101	='http://fwlondev3/TrcRel08/Reporting/logout.aspx';
}

if(varEnvironment=='EUAT')
{
	//alert('EUAT');
	varWebServiceSecureURL='/Reporting/KAPI/KurtosysWSFactoryProxyAuth.aspx';
	varWebServiceNonSecureURL='/Reporting/KAPI/KurtosysWSFactoryProxy.aspx';  //EUAT
	
	varWebServiceURL1=varWebServiceSecureURL;
	varWebServiceURL2=varWebServiceSecureURL;
	varWebServiceURL3=varWebServiceSecureURL;
	varWebServiceURL4=varWebServiceSecureURL;
	varWebServiceURL5=varWebServiceNonSecureURL;
	varWebServiceURL6=varWebServiceNonSecureURL;
	
	
	varWebServiceURL100	=varWebServiceSecureURL;
	varWebServiceURL101	='/Reporting/logout.aspx';
}

if(varEnvironment=='LIVE')
{
	//alert('LIVE');
	varWebServiceSecureURL='/Reporting/KAPI/KurtosysWSFactoryProxyAuth.aspx';
	varWebServiceNonSecureURL='/Reporting/KAPI/KurtosysWSFactoryProxy.aspx';  //LIVE
	
	varWebServiceURL1=varWebServiceSecureURL; 		
	varWebServiceURL2=varWebServiceSecureURL; 		
	varWebServiceURL3=varWebServiceSecureURL; 		
	varWebServiceURL4=varWebServiceSecureURL; 		
	varWebServiceURL5=varWebServiceNonSecureURL;	
	varWebServiceURL6=varWebServiceNonSecureURL;	
	
	varExtJSRelatedURL1 =  'https://www.campbell.com/_images/extjsimg/default/s.gif';
	
	varWebServiceURL100	=varWebServiceSecureURL;
	varWebServiceURL101	='/Reporting/logout.aspx';
}
///////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------
//////WebService Constant Attributes///////////
//--------------------------------------------


///////////////////////////////////////////////////////////////////////////////////
//------------------------------
//////Secure WS Calls///////////
//------------------------------

var varGetReleasedDocumentsCustomFilteredDatesAsStringURL= varWebServiceURL1+'?ClientName=Campbell&ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1'+varUserType+varUserID;	

//-----------------------

var varDownloadSingleDocumentURL= varWebServiceURL2+'?ClientName=Campbell&ServiceName=KSDK&MethodName=DownloadDocument&args=args'+varUserID;	

var varDownloadMultipleDocumentsURL= varWebServiceURL2+'?ClientName=Campbell&ServiceName=KSDK&MethodName=DownloadMultipleDocuments&args=args'+varUserID;	

//-----------------------

var varGetSubscriberProfileURL= varWebServiceURL3+'?ClientName=Campbell&ServiceName=KSDK&MethodName=getSubscriberProfile&args=args&responseFormat=1'+varUserID;	

var varSaveSubscriberProfileURL= varWebServiceURL3+'?ClientName=Campbell&ServiceName=KSDK&MethodName=saveSubscriberProfile&args=args&responseFormat=1'+varUserID;	

var varSaveCommunicationPreferencesURL= varWebServiceURL3+'?ClientName=Campbell&ServiceName=KSDK&MethodName=saveCommunicationPreferences&args=args&responseFormat=1'+varUserID;	

//-----------------------

var varChangeMyPasswordURL= varWebServiceURL4+'?ClientName=Campbell&ServiceName=KSDK&MethodName=changeMyPassword&args=args&responseFormat=1'+varUserID;	

//----------------------------------
//////Non Secure WS Calls///////////
//----------------------------------

var varRequestResetPasswordURL= varWebServiceURL5+'?ClientName=Campbell&ServiceName=KSDK&MethodName=requestResetPassword&args=args&responseFormat=1'+varUserID;	

var varCompleteResetPasswordURL= varWebServiceURL5+'?ClientName=Campbell&ServiceName=KSDK&MethodName=completeResetPassword&args=args&responseFormat=1'+varUserID;	

//---------------------

var varCompleteEnrollmentURL= varWebServiceURL6+'?ClientName=Campbell&ServiceName=KSDK&MethodName=completeEnrolment&args=args&responseFormat=1'+varUserID;	

var varChangeUserLoginURL= varWebServiceURL6+'?ClientName=Campbell&ServiceName=KSDK&MethodName=changeUserLogin&args=args&responseFormat=1'+varUserID;	
//-------------------------------------
/////// Ajax timeout handling  ////////
//-------------------------------------

var varKeepAliveURL =varWebServiceURL1+'?ClientName=Campbell&ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&start=0&limit=10&documentCategory=KeepAlive&sort=referenceDate&dir=DESC'+varUserType+varUserID;;
//var varKeepAliveURL = varWebServiceURL100+'?ClientName=Campbell&ServiceName=KSDK&MethodName=ping&args=args';   
var varTimeoutURL	  = varWebServiceURL101;	

//#########################################################################################################

//-------------------------------------
/////// ExtJS Related URL  ////////
//-------------------------------------

var varExtBlankImageURL = varExtJSRelatedURL1;


   


//////////////////////////////////////////////
//var varGetReleasedDocumentsCustomFilteredDatesAsStringURL='/Reporting/KAPI/KurtosysWSFactoryProxy.aspx?ClientName=Campbell&ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=FINADVISOR&userid=24093';
//var varGetReleasedDocumentsCustomFilteredDatesAsStringURL='/Reporting/KAPI/KurtosysWSFactoryProxyAuth.aspx?ClientName=Campbell&ServiceName=KSDK&MethodName=g8etReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=FINADVISOR';
//var varGetReleasedDocumentsCustomFilteredDatesAsStringURL='http://fwlondev3/TrcRel08/KAPI/KurtosysWSFactoryProxy.aspx?ClientName=Campbell&ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=FINADVISOR&userid=335190';
