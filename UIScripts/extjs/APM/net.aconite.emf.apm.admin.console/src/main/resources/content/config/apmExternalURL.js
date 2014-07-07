///////////////////////////ENVIRONMENT/////////////////

//var varEnvironment	='LOCAL'
//var varEnvironment	='DEV_STATIC' //which will call admin console data folder to return json, can be used for testing purpose
var varEnvironment		='DEV_BACKEND'//which will return data from Restful API and used in real enet to end system
//var varEnvironment	='EUAT'
//var varEnvironment	='LIVE'

//------------------------------------------
//Setting up default values here

var serverURL				='';
var contextPath				='';
var bundleName 				= '';
//------------------------------------------
//MyTest	
var urlMyTestData			='';
var urlMyTestRun			='';

var urlMenuData             ='';
//------------------------------------------
//Scheduler
var urlSchedulerData		='';
var urlSchedulerRun			='';
//Country	
var urlCountryData			='';
//PMResponseCode	
var urlPMResponseCodeData	='';
//PMTransactionType	
var urlPMTransactionTypeData='';
//Institution	
var urlInstitutionData		='';
//SysConfig
var urlSysConfigData		='';
//var urlInstitutionData = serverURL + 'admin/system/pins';
var urlInterfaceData		='';
var urlInterfaceTypeData 	='';
var urlPersoBureauData		='';
//EncryptionZone	
var urlEncryptionZoneData	='';
//Issuer	
var urlIssuerData			='';
//TokenProducts
var urlInstitutionsData		='';
var urlIssuersData			='';
var urlTokenProductGroupsData='';
var urlTokenProductsData	='';
var urlTokenAppProfilesData	='';
var urlBINRangeData			='';
//Token Statistics
var urlTokenStatisticsData = '';
// Monitoring URLs
var urlDataExtractLogData = '';

///////////////////////////LOCAL ENVIRONMENT/////////////////

if(varEnvironment=='LOCAL')
{
	//////////URLs////////////////////
	//serverURL = 'http://localhost:8080/';
	serverURL='../../../';
	contextPath = 'apmgui';
	bundleName = '';
	//////////////////////////////////////////

	//MyTest	
	urlMyTestData 				= serverURL + contextPath + bundleName+'/data/mytest.json';
	urlMyTestRun  				= serverURL + contextPath + bundleName+ '/data/mytest/run';

    //urlInstitutionData 		= serverURL + 'admin/system/pins';
    
    urlMenuData                 = serverURL + contextPath + bundleName+ '/data/menu.json';

//------------------------------------------

	
	//Scheduler
	urlSchedulerData 			= serverURL + contextPath + bundleName+ '/data/scheduler.json';
	urlSchedulerRun  			= serverURL + contextPath + bundleName+ '/data/scheduler/run';

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	//Country
	urlCountryData 				= serverURL + contextPath + bundleName+ '/data/country.json';
	//PMResponseCode	
	urlPMResponseCodeData 		= serverURL + contextPath + bundleName+ '/data/pmresponsecode.json';
	//PMTransactionType	
	urlPMTransactionTypeData 	= serverURL + contextPath + bundleName+ '/data/pmtransactiontype.json';
	//Institution	
	urlInstitutionData 			= serverURL + contextPath + bundleName+ '/data/institution.json';
	//SysConfig
	urlSysConfigData 			= serverURL + contextPath + bundleName+ '/data/sysconfig.json';
	//EncryptionZone	
	urlEncryptionZoneData 		= serverURL + contextPath + bundleName+ '/data/encryptionzone.json';
	//Issuer	
	urlIssuerData 				= serverURL + contextPath + bundleName+ '/data/issuer.json';	

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
    //Interfaces
	urlInterfaceData 			= serverURL + contextPath + bundleName+  '/data/interface.json';
	urlInterfaceTypeData		= serverURL + contextPath + bundleName+  '/data/interfacetype.json';
    //PersoBureau
	urlPersoBureauData 			= serverURL + contextPath + bundleName+  '/data/persobureau.json';	

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
	//TokenProducts
	//urlInstitutionsData 		= serverURL + contextPath + bundleName+ '/institution';
	//urlIssuersData 				= serverURL + contextPath + bundleName+ '/issuer';
	urlTokenProductGroupsData 	= serverURL + contextPath + bundleName+ '/data/tokenproductgroup.json';
	urlTokenProductsData		= serverURL + contextPath + bundleName+ '/data/tokenproduct.json';
	urlTokenAppProfilesData 	= serverURL + contextPath + bundleName+ '/data/tokenapplicationprofile.json';
	urlBINRangeData 			= serverURL + contextPath + bundleName+ '/data/binrange.json';
	urlManageTokensData 		= serverURL + contextPath + bundleName+ '/data/managetoken.json';
	urlTokenOrderTypeData 		= serverURL + contextPath + bundleName+ '/data/tokenordertype.json';
	urlTokenOrderData 		    = serverURL + contextPath + bundleName+ '/data/tokenorder.json';

    urlTransactionQueryData 	= serverURL + contextPath + bundleName+ '/transactionquery';

   //Token Statistics
    urlTokenStatisticsData  = serverURL + contextPath + bundleName + '/data/tokenstats.json';

//------------------------------------------
}
///////////////////////////DEV ENVIRONMENT/////////////////

if(varEnvironment=='DEV_STATIC')
{
	//////////URLs////////////////////
	//serverURL = 'http://localhost:6001/';
	serverURL='../../../';
	contextPath = 'admin/';
	bundleName = 'console';
	//////////////////////////////////////////
	//MyTest	
	urlMyTestData 				= serverURL + contextPath + bundleName+ '/data/mytest.json';
	urlMyTestRun  				= serverURL + contextPath + bundleName+ '/targetPage.php';

	urlMenuData                 = serverURL + contextPath + bundleName+ '/data/menu.json';
//------------------------------------------
	//Scheduler	
	urlSchedulerData 			= serverURL + contextPath + bundleName+ '/data/scheduler.json';
	urlSchedulerRun  			= serverURL + contextPath + bundleName+ '/targetPage.php';
	//Country	
	urlCountryData 				= serverURL + contextPath + bundleName+ '/data/country.json';
	//PMResponseCode	
	urlPMResponseCodeData 		= serverURL + contextPath + bundleName+ '/data/pmresponsecode.json';
	//PMTransactionType	
	urlPMTransactionTypeData 	= serverURL + contextPath + bundleName+ '/data/pmtransactiontype.json';
	//Institution	
	urlInstitutionData 			= serverURL + contextPath + bundleName+ '/data/institution.json';
	//SysConfig
	urlSysConfigData 			= serverURL + contextPath + bundleName+ '/data/systemconfig.json';	
	//Interface	
	urlInterfaceData 			= serverURL + contextPath + '/data/interface.json';		
	//urlInstitutionData 		= serverURL + 'admin/system/pins';
	//EncryptionZone	
	urlEncryptionZoneData 		= serverURL + contextPath + bundleName+ '/data/encryptionzone.json';
	//Issuer	
	urlIssuerData 				= serverURL + contextPath + bundleName+ '/data/issuer.json';	
//------------------------------------------
	//TokenProducts
	urlInstitutionsData 		= serverURL + contextPath + bundleName+ '/data/institutions.json';
	urlIssuersData 				= serverURL + contextPath + bundleName+ '/data/issuers.json';
	urlTokenProductGroupsData 	= serverURL + contextPath + bundleName+ '/data/tokenproductgroup.json';
	urlTokenProductsData		= serverURL + contextPath + bundleName+ '/data/tokenproducts.json';
	urlTokenAppProfilesData 	= serverURL + contextPath + bundleName+ 'data/tokenappprofiles.json';
	urlBINRangeData 			= serverURL + contextPath + bundleName+ '/data/binranges.json';
	urlManageTokensData 		= serverURL + contextPath + bundleName+ '/data/managetokens.json';
	urlTokenAppStatusData 		= serverURL + contextPath + bundleName+ '/data/tokenappstatus.json';
	urlTokenOrderTypeData 		= serverURL + contextPath + bundleName+ '/data/tokenordertype.json';
	urlTokenOrderData 		    = serverURL + contextPath + bundleName+ '/data/tokenorder.json';
    urlTransactionQueryData 	= serverURL + contextPath + bundleName+ '/transactionquery';
//------------------------------------------
    urlDataExtractLogData =  serverURL + contextPath + bundleName+ '/data/extractlogdata.json';
    urlDataExtractLogTypeData =  serverURL + contextPath + bundleName+ '/data/extractlogdatatype.json';

}

if(varEnvironment=='DEV_BACKEND')
{
	//////////URLs////////////////////
	//serverURL = 'http://localhost:6001/';
	serverURL='../../../../';
	contextPath = 'admin/';
	bundleName = 'system';
	//////////////////////////////////////////

	//MyTest	
	urlMyTestData 				= serverURL + contextPath + bundleName+'/mytest';
	urlMyTestRun  				= serverURL + contextPath + bundleName+ '/mytest/run';

    //urlInstitutionData 		= serverURL + 'admin/system/pins';
    bundleName = 'console';
    urlMenuData                 = serverURL + contextPath + bundleName+ '/data/menu.json';

//------------------------------------------

	bundleName = 'scheduler';
	//Scheduler
	urlSchedulerData 			= serverURL + contextPath + bundleName+ '/scheduler';
	urlSchedulerRun  			= serverURL + contextPath + bundleName+ '/scheduler/run';

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	bundleName = 'dictionary';
	//Country
	urlCountryData 				= serverURL + contextPath + bundleName+ '/country';
	//PMResponseCode	
	urlPMResponseCodeData 		= serverURL + contextPath + bundleName+ '/pmresponsecode';
	//PMTransactionType	
	urlPMTransactionTypeData 	= serverURL + contextPath + bundleName+ '/pmtransactiontype';
	//Institution	
	urlInstitutionData 			= serverURL + contextPath + bundleName+ '/institution';
	//SysConfig
	urlSysConfigData 			= serverURL + contextPath + bundleName+ '/sysconfig';
	//EncryptionZone	
	urlEncryptionZoneData 		= serverURL + contextPath + bundleName+ '/encryptionzone';
	//Issuer	
	urlIssuerData 				= serverURL + contextPath + bundleName+ '/issuer';	

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	bundleName = 'interfaces';
    //Interfaces
	urlInterfaceData 			= serverURL + contextPath + bundleName+  '/interfaces';
	urlInterfaceTypeData		= serverURL + contextPath + bundleName+  '/interfaceType';
    //PersoBureau
	urlPersoBureauData 			= serverURL + contextPath + bundleName+  '/persoBureau';	

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    bundleName = 'token';
	//TokenProducts
	//urlInstitutionsData 		= serverURL + contextPath + bundleName+ '/institution';
	//urlIssuersData 			= serverURL + contextPath + bundleName+ '/issuer';
	urlTokenProductGroupsData 	= serverURL + contextPath + bundleName+ '/tokenproductgroup';
	urlTokenProductsData		= serverURL + contextPath + bundleName+ '/tokenproduct';
	urlTokenAppProfilesData 	= serverURL + contextPath + bundleName+ '/tokenapplicationprofile';
	urlBINRangeData 			= serverURL + contextPath + bundleName+ '/binrange';
	urlManageTokensData 		= serverURL + contextPath + bundleName+ '/managetoken';
	urlTokenAppStatusData 		= serverURL + contextPath + bundleName+ '/tokenappstatus';
	urlTokenOrderTypeData 		= serverURL + contextPath + bundleName+ '/tokenordertype';
	urlTokenOrderData 		    = serverURL + contextPath + bundleName+ '/tokenorder';
    urlTokenStatisticsData      = serverURL + contextPath + bundleName+ '/tokenstatistics';

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    bundleName = 'transaction';
    urlTransactionQueryData 	= serverURL + contextPath + bundleName+ '/transaction';
    urlTransactionStatisticsData = serverURL + contextPath + bundleName+ '/transactionstatistics';
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    bundleName = 'monitoring';
    urlDataExtractLogData       = serverURL + contextPath + bundleName+ '/dataExtractlog';
    urlDataExtractLogTypeData   = serverURL + contextPath + bundleName+ '/dataExtractLogType';
    urlAuditLogData             = serverURL + contextPath + bundleName+ '/auditlog';
//------------------------------------------



}


