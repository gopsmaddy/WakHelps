rem: %1 = package name to use in HiTrustWebApplication/src e.g com.kurtosys.hitrust.businessobject.baportfolios
rem: %2 = web services name e.g http://localhost:8080/BaPortfoliosService/BaPortfolios?wsdl
rem: wsimport -keep -p %1 %2

wsimport -keep -p com.kurtosys.hitrust.businessobject.baprofiles          http://localhost:8080/BaProfilesService/BaProfiles?wsdl             

wsimport -keep -p com.kurtosys.hitrust.businessobject.baportsummarydatas  http://localhost:8080/BaPortSummaryDatasService/BaPortSummaryDatas?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.basprofileaddrs     http://localhost:8080/BaSProfileAddrsService/BaSProfileAddrs?wsdl   
wsimport -keep -p com.kurtosys.hitrust.businessobject.bassbankaccounts    http://localhost:8080/BaSSBankAccountsService/BaSSBankAccounts?wsdl 
wsimport -keep -p com.kurtosys.hitrust.businessobject.baportfolios        http://localhost:8080/BaPortfoliosService/BaPortfolios?wsdl         
wsimport -keep -p com.kurtosys.hitrust.businessobject.bainvestorfunds     http://localhost:8080/BaInvestorFundsService/BaInvestorFunds?wsdl 
wsimport -keep -p com.kurtosys.hitrust.businessobject.bainvestorportfunds http://localhost:8080/BaInvestorPortFundsService/BaInvestorPortFunds?wsdl 

wsimport -keep -p com.kurtosys.hitrust.businessobject.bareportctracts     http://localhost:8080/BaReportCtractsService/BaReportCtracts?wsdl               
wsimport -keep -p com.kurtosys.hitrust.businessobject.inincomesummarys    http://localhost:8080/InIncomeSummarysService/InIncomeSummarys?wsdl 
wsimport -keep -p com.kurtosys.hitrust.businessobject.baprices            http://localhost:8080/BaPricesService/BaPrices?wsdl                 

wsimport -keep -p com.kurtosys.hitrust.businessobject.baportfoliosttinss  http://localhost:8080/BaPortfolioSttInssService/BaPortfolioSttInss?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.basassignments      http://localhost:8080/BaSAssignmentsService/BaSAssignments?wsdl     
wsimport -keep -p com.kurtosys.hitrust.businessobject.basowners           http://localhost:8080/BaSOwnersService/BaSOwners?wsdl               
wsimport -keep -p com.kurtosys.hitrust.businessobject.basportfolioaddrs   http://localhost:8080/BaSPortfolioAddrsService/BaSPortfolioAddrs?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.basunitclasss       http://localhost:8080/BaSUnitClasssService/BaSUnitClasss?wsdl       
wsimport -keep -p com.kurtosys.hitrust.businessobject.bactractreporttypes http://localhost:8080/BaCtractReportTypesService/BaCtractReportTypes?wsdl 

wsimport -keep -p com.kurtosys.hitrust.businessobject.bapayments 					http://localhost:8080/BaPaymentsService/BaPayments?wsdl 

REM Advisor Objects

wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentByCcys						http://localhost:8080/BaAgentByCcysService/BaAgentByCcys?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentFunds						http://localhost:8080/BaAgentFundsService/BaAgentFunds?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentInvestors				http://localhost:8080/BaAgentInvestorsService/BaAgentInvestors?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentPays							http://localhost:8080/BaAgentPaysService/BaAgentPays?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgents								http://localhost:8080/BaAgentsService/BaAgents?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentSummaryByUCs			http://localhost:8080/BaAgentSummaryByUCsService/BaAgentSummaryByUCs?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentSummarys					http://localhost:8080/BaAgentSummarysService/BaAgentSummarys?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentSummLevel2s			http://localhost:8080/BaAgentSummLevel2sService/BaAgentSummLevel2s?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baAgentSummLevel3s			http://localhost:8080/BaAgentSummLevel3sService/BaAgentSummLevel3s?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baCommissionSummarys		http://localhost:8080/BaCommissionSummarysService/BaCommissionSummarys?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baLoginUserInfos				http://localhost:8080/BaLoginUserInfosService/BaLoginUserInfos?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baSCommSplits						http://localhost:8080/BaSCommSplitsService/BaSCommSplits?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baSubAgentByCcys				http://localhost:8080/BaSubAgentByCcysService/BaSubAgentByCcys?wsdl

REM Forgotton Password
wsimport -keep -p com.kurtosys.hitrust.businessobject.baExtUserPwdResets			http://localhost:8080/BaExtUserPwdResetsService/BaExtUserPwdResets?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baExtUserValidation			http://localhost:8080/BaExtUserValidationService/BaExtUserValidation?wsdl
wsimport -keep -p com.kurtosys.hitrust.businessobject.baUserPasswords					http://localhost:8080/BaUserPasswordsService/BaUserPasswords?wsdl

          

pause