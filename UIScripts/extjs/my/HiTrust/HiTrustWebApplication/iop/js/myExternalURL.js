///////////////////////////URLS////////////////////////////////////////////////////////////////////////////////////
//var varEnvironment='HOME'
//var varEnvironment='LOCAL'
var varEnvironment='LIVE'

//---------------------
var varWebServiceNonSecureURL='';
var varWebServiceSecureURL='';

var varWebServiceURL100	='';
var varWebServiceURL101	='';

var varWebServiceURL='';
//-----------------------

if(varEnvironment=='HOME')
{
	//alert('HOME');
	varWebServiceSecureURL='http://localhost:9080/HiTrustWebApplication/iop/jsp/HiTrust.jsp';;
	varWebServiceNonSecureURL='http://localhost:9080/HiTrustWebApplication/iop/jsp/HiTrust.jsp'; //LOCAL
	
	varWebServiceURL=varWebServiceSecureURL;
	
	varWebServiceURL100	='http://localhost:9080/HiTrustWebApplication/iop/jsp/ping.jsp';
	varWebServiceURL101	='http://localhost:9080/HiTrustWebApplication/iop/jsp/login.jsp';
}

if(varEnvironment=='LOCAL')
{
	//alert('LOCAL');
	varWebServiceSecureURL='http://localhost:8080/HiTrustWebApplication/iop/jsp/HiTrust.jsp';
	varWebServiceNonSecureURL='http://localhost:8080/HiTrustWebApplication/iop/jsp/HiTrust.jsp';   //LOCAL
	
	varWebServiceURL=varWebServiceSecureURL;
	
	varWebServiceURL100	='http://localhost:8080/HiTrustWebApplication/iop/jsp/ping.jsp';
	varWebServiceURL101	='http://localhost:8080/HiTrustWebApplication/iop/jsp/login.jsp';
	
}

if(varEnvironment=='LIVE')
{
	//alert('LIVE');
	varWebServiceSecureURL='/XMLDataLoader.aspx';
	varWebServiceNonSecureURL='/XMLDataLoaderNonSecure.aspx';  //LIVE
	
	varWebServiceURL=varWebServiceSecureURL;
	
	varWebServiceURL100	=varWebServiceSecureURL;
	varWebServiceURL101	='/logout.aspx';
	
}


///////////////////////////////////////////////////////////////////////////////////

var varProfileKey					= getUrlVars()["prokey"]	!=null ? getUrlVars()["prokey"] : ''; 
var varProfileRelNo				= getUrlVars()["relno"]		!=null ? getUrlVars()["relno"] 	: '';
var varProfileCompanyKey	= getUrlVars()["compkey"]	!=null ? getUrlVars()["compkey"]: '';

var varExtraParams='&profileRelNo='+varProfileRelNo+'&profileKey='+varProfileKey+'&profileCompanyKey='+varProfileCompanyKey;
//var varExtraParams='&profileRelNo='+Ext.getCmp('idprofilerelno').getValue()+'&profileKey='+Ext.getCmp('idprofilekey').getValue()+'&profileCompanyKey='+Ext.getCmp('idprofilecompanykey').getValue();

//------------------------------
//////Secure WS Calls///////////
//------------------------------

var varBaLoginUserInfosURL		= varWebServiceURL+'?action=BaLoginUserInfos'+varExtraParams;

/////////INVESTOR OBJECTS///////////////////////////////////////////////////////////////////////
var varBaProfilesURL					= varWebServiceURL+'?action=BaProfiles'+varExtraParams;
var varBaPortSummaryDatasURL	= varWebServiceURL+'?action=BaPortSummaryDatas'+varExtraParams;
var varBaPortfoliosURL				= varWebServiceURL+'?action=BaPortfolios'+varExtraParams;
var varBaCtractReportTypesURL	= varWebServiceURL+'?action=BaCtractReportTypes'+varExtraParams;
var varBaInvestorFundsURL			= varWebServiceURL+'?action=BaInvestorFunds'+varExtraParams;
var varBaInvestorPortFundsURL	= varWebServiceURL+'?action=BaInvestorPortFunds'+varExtraParams;
var varBaNoCommunicationsURL	= varWebServiceURL+'?action=BaNoCommunications'+varExtraParams;
var varBaPaymentsURL					= varWebServiceURL+'?action=BaPayments'+varExtraParams;
var varBaPortfolioSttInssURL	= varWebServiceURL+'?action=BaPortfolioSttInss'+varExtraParams;
var varBaPricesURL						= varWebServiceURL+'?action=BaPrices'+varExtraParams;
var varBaReportAssignsURL			= varWebServiceURL+'?action=BaReportAssigns'+varExtraParams;
var varBaReportCtractsURL			= varWebServiceURL+'?action=BaReportCtracts'+varExtraParams;
var varBaReportSettleInssURL	= varWebServiceURL+'?action=BaReportSettleInss'+varExtraParams;
var varBaSAssignmentsURL			= varWebServiceURL+'?action=BaSAssignments'+varExtraParams;
var varBaSOwnersURL						= varWebServiceURL+'?action=BaSOwners'+varExtraParams;
var varBaSPortfolioAddrsURL		= varWebServiceURL+'?action=BaSPortfolioAddrs'+varExtraParams;
var varBaSProfileAddrsURL			= varWebServiceURL+'?action=BaSProfileAddrs'+varExtraParams;
var varBaSSBankAccountsURL		= varWebServiceURL+'?action=BaSSBankAccounts'+varExtraParams;
var varBaSUnitClasssURL				= varWebServiceURL+'?action=BaSUnitClasss'+varExtraParams;
var varInIncomeSummarysURL		= varWebServiceURL+'?action=InIncomeSummarys'+varExtraParams;

/////////ADVISOR OBJECTS////////////////////////////////////////////////////////////////////////                                              
var varBaAgentsURL										= varWebServiceURL+'?action=BaAgents'+varExtraParams;
var varBaAgentInvestorsURL						= varWebServiceURL+'?action=BaAgentInvestors'+varExtraParams;
var varBaAgentSummaryByUCsURL					= varWebServiceURL+'?action=BaAgentSummaryByUCs'+varExtraParams;
	var varBaAgentSummLevel2sURL				= varWebServiceURL+'?action=BaAgentSummLevel2s'+varExtraParams;
	 var varBaAgentSummLevel3sURL				= varWebServiceURL+'?action=BaAgentSummLevel3s'+varExtraParams;
var varBaAgentSummarysURL							= varWebServiceURL+'?action=BaAgentSummarys'+varExtraParams;
var varBaAgentByCcysURL								= varWebServiceURL+'?action=BaAgentByCcys'+varExtraParams;
	var varBaSubAgentByCcysURL					= varWebServiceURL+'?action=BaSubAgentByCcys'+varExtraParams;
	var varBaAgentSummaryByUCLevel2sURL	= varWebServiceURL+'?action=BaAgentSummaryByUCLevel2s'+varExtraParams;
var varBaCommissionSummarysURL				= varWebServiceURL+'?action=BaCommissionSummarys'+varExtraParams;
	var varBaAgentPaysURL								= varWebServiceURL+'?action=BaAgentPays'+varExtraParams;
		var varBaSCommSplitsURL						= varWebServiceURL+'?action=BaSCommSplits'+varExtraParams;
//----------
var varBaAgentFundsURL								= varWebServiceURL+'?action=BaAgentFunds'+varExtraParams;

var varResetPasswordURL								= varWebServiceURL+'?action=BaUserPasswords';

//----------------------------------
//////Non Secure WS Calls///////////
//----------------------------------

var varRequestForgottenPasswordURL		= varWebServiceNonSecureURL+'?action=BaExtUserValidation&userRequestType=nonsecure';

var varCompleteForgottenPasswordURL		= varWebServiceNonSecureURL+'?action=BaExtUserPwdResets&userRequestType=nonsecure';

//-------------------------------------
/////// Ajax timeout handling  ////////
//-------------------------------------

var varKeepAliveURL =varWebServiceURL+'?action=ping'+varExtraParams;
var varTimeoutURL	  = varWebServiceURL101;	


