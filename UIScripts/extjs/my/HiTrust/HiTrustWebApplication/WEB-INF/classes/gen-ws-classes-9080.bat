rem: %1 = package name to use in HiTrustWebApplication/src e.g com.kurtosys.hitrust.businessobject.baportfolios
rem: %2 = web services name e.g http://localhost:9080/BaPortfoliosService/BaPortfolios?wsdl
rem: wsimport -keep -p %1 %2

wsimport -keep -p com.kurtosys.hitrust.businessobject.baprofiles          http://localhost:9080/BaProfilesService/BaProfiles?wsdl             

wsimport -keep -p com.kurtosys.hitrust.businessobject.baportsummarydatas  http://localhost:9080/BaPortSummaryDatasService/BaPortSummaryDatas?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.basprofileaddrs     http://localhost:9080/BaSProfileAddrsService/BaSProfileAddrs?wsdl   
wsimport -keep -p com.kurtosys.hitrust.businessobject.bassbankaccounts    http://localhost:9080/BaSSBankAccountsService/BaSSBankAccounts?wsdl 
wsimport -keep -p com.kurtosys.hitrust.businessobject.baportfolios        http://localhost:9080/BaPortfoliosService/BaPortfolios?wsdl         
wsimport -keep -p com.kurtosys.hitrust.businessobject.bainvestorfunds     http://localhost:9080/BaInvestorFundsService/BaInvestorFunds?wsdl 
wsimport -keep -p com.kurtosys.hitrust.businessobject.bainvestorportfunds http://localhost:9080/BaInvestorPortFundsService/BaInvestorPortFunds?wsdl 

wsimport -keep -p com.kurtosys.hitrust.businessobject.bareportctracts     http://localhost:9080/BaReportCtractsService/BaReportCtracts?wsdl               
wsimport -keep -p com.kurtosys.hitrust.businessobject.inincomesummarys    http://localhost:9080/InIncomeSummarysService/InIncomeSummarys?wsdl 
wsimport -keep -p com.kurtosys.hitrust.businessobject.baprices            http://localhost:9080/BaPricesService/BaPrices?wsdl                 

wsimport -keep -p com.kurtosys.hitrust.businessobject.baportfoliosttinss  http://localhost:9080/BaPortfolioSttInssService/BaPortfolioSttInss?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.basassignments      http://localhost:9080/BaSAssignmentsService/BaSAssignments?wsdl     
wsimport -keep -p com.kurtosys.hitrust.businessobject.basowners           http://localhost:9080/BaSOwnersService/BaSOwners?wsdl               
wsimport -keep -p com.kurtosys.hitrust.businessobject.basportfolioaddrs   http://localhost:9080/BaSPortfolioAddrsService/BaSPortfolioAddrs?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.basunitclasss       http://localhost:9080/BaSUnitClasssService/BaSUnitClasss?wsdl       
wsimport -keep -p com.kurtosys.hitrust.businessobject.bactractreporttypes http://localhost:9080/BaCtractReportTypesService/BaCtractReportTypes?wsdl 

wsimport -keep -p com.kurtosys.hitrust.businessobject.bapayments 					http://localhost:9080/BaPaymentsService/BaPayments?wsdl 

REM Advisor Objects

wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentByCcys						http://localhost:9080/BaAgentByCcysService/BaAgentByCcys?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentFunds						http://localhost:9080/BaAgentFundsService/BaAgentFunds?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentInvestors				http://localhost:9080/BaAgentInvestorsService/BaAgentInvestors?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentPays							http://localhost:9080/BaAgentPaysService/BaAgentPays?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgents								http://localhost:9080/BaAgentsService/BaAgents?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentSummaryByUCs			http://localhost:9080/BaAgentSummaryByUCsService/BaAgentSummaryByUCs?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentSummarys					http://localhost:9080/BaAgentSummarysService/BaAgentSummarys?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentSummLevel2s			http://localhost:9080/BaAgentSummLevel2sService/BaAgentSummLevel2s?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentSummLevel3s			http://localhost:9080/BaAgentSummLevel3sService/BaAgentSummLevel3s?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baCommissionSummarys		http://localhost:9080/BaCommissionSummarysService/BaCommissionSummarys?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baLoginUserInfos				http://localhost:9080/BaLoginUserInfosService/BaLoginUserInfos?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baSCommSplits						http://localhost:9080/BaSCommSplitsService/BaSCommSplits?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baSubAgentByCcys				http://localhost:9080/BaSubAgentByCcysService/BaSubAgentByCcys?wsdl

REM Forgotton Password
wsimport -keep -p com.kurtosys.hitrust.businessobject.baExtUserPwdResets			http://localhost:8090/BaExtUserPwdResetsService/BaExtUserPwdResets?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baExtUserValidation			http://localhost:8090/BaExtUserValidationService/BaExtUserValidation?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baUserPasswords					http://localhost:8090/BaUserPasswordsService/BaUserPasswords?wsdl

      

pause