<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>
	
	<xsl:param name="PROFILERELNO"/>

	<xsl:param name="PORTFOLIOKEY"/>	
	<xsl:param name="PORTFOLIONUMBER"/>		
	<xsl:param name="FUNDKEY"/>					
	<xsl:param name="UNITCLASSKEY"/>
	<xsl:param name="TRANSACTIONTYPE"/>	
	<xsl:param name="CONTRACTNUMBER"/>
	<xsl:param name="SEFFDATEFROM"/>	
	<xsl:param name="SEFFDATETO"/>	
	
	
	

<xsl:output omit-xml-declaration="yes" indent="yes"/>
<xsl:output method="html" encoding="iso-8859-1" indent="no"/>
 
 
 
 <xsl:template match="/">
		<xsl:call-template name="main"/>
</xsl:template>



 <xsl:template name="main">
 		
	 	<xsl:variable name="sortType">
			<xsl:choose>				
					<xsl:when test="$vsortType=''">text</xsl:when>		
					<xsl:otherwise><xsl:value-of select="$vsortType" /></xsl:otherwise>
			</xsl:choose>	
		</xsl:variable>
		
 			<!--  descending / ascending , text/number
 			<xsl:variable name="vsortKey">FundKey</xsl:variable>
			<xsl:variable name="vsortOrder">descending</xsl:variable>
			<xsl:variable name="vsortType">number</xsl:variable>
			<xsl:variable name="RelNo">IN000002</xsl:variable>
			<xsl:variable name="PortfolioKey">0000000008</xsl:variable>
 			 -->
 			
 			<!--<xsl:copy-of select="*"/>-->
 			<DST>
 				<xsl:copy-of select="//DST/user"/>   		
				<xsl:copy-of select="//DST/password"/>			<!--<xsl:sort select="*[name() = $vsortKey]"/>-->				
 				<response>
 				<!--	
 					<xsl:for-each select="//DST/response/List">											
						<xsl:sort select="./UnitPrice"  order="{$vsortOrder}" data-type="{$vsortType}"/>
						<xsl:choose>
							<xsl:when test="(./Profile/RelNo = $RelNo or $RelNo='') and (./Portfolio/Key = $PortfolioKey or $PortfolioKey='')">
								<xsl:copy-of select="."/>	
							</xsl:when>
							<xsl:otherwise></xsl:otherwise>
						</xsl:choose>																													
					</xsl:for-each>
					-->
						
					<xsl:choose>
					
							<xsl:when test="$vsortKey='CtractNo'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./CtractNo"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='OrderDate'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getLongDate(./OrderDate)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='EffDate'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getLongDate(./EffDate)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='SFund_Desc'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./SFund/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='NoUnit'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./NoUnit)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>		
							
							<xsl:when test="$vsortKey='Price'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./Price)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='SGross'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./SGross)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='CtStatus_Desc'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./CtStatus/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							
							<xsl:when test="$vsortKey='Name'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Name"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
												
							<xsl:otherwise>
								<xsl:for-each select="//DST/response/List">																							
									<xsl:call-template name="FilterData"/>																													
								</xsl:for-each>
							</xsl:otherwise>
							
						</xsl:choose>	
						
						
				</response>
      </DST>
 </xsl:template>
 
 
 
 <xsl:template name="FilterData">		
 
		<xsl:variable name="ProfileRelNo"><xsl:value-of select="$PROFILERELNO" /></xsl:variable>
		
		<xsl:variable name="PortfolioKey"><xsl:value-of select="$PORTFOLIOKEY" /></xsl:variable> <!-- Not Available -->
		<xsl:variable name="PortfolioNumber"><xsl:value-of select="$PORTFOLIONUMBER" /></xsl:variable><!-- Not Available -->
		<xsl:variable name="FundKey"><xsl:value-of select="$FUNDKEY" /></xsl:variable>
		<xsl:variable name="UnitclassKey"><xsl:value-of select="$UNITCLASSKEY" /></xsl:variable><!-- Not Available -->
		<xsl:variable name="TransactionType"><xsl:value-of select="$TRANSACTIONTYPE" /></xsl:variable><!-- Not Available -->
		<xsl:variable name="ContractNumber"><xsl:value-of select="$CONTRACTNUMBER" /></xsl:variable>
		
			
		<xsl:variable name="longDateFrom"><xsl:value-of select="utils:getShortDate($SEFFDATEFROM)"/></xsl:variable>
		<xsl:variable name="longDateTo"><xsl:value-of select="utils:getShortDate($SEFFDATETO)"/></xsl:variable>
    <xsl:variable name="longDateNow"><xsl:value-of select="utils:getShortDate(./EffDate)"/></xsl:variable>
		<!--
		<x><xsl:value-of select="$DateFrom"/></x>
		<x><xsl:value-of select="utils:getLongDate($DateFrom)"/></x>		
		<x><xsl:value-of select="utils:getLongDate($DateTo)"/></x>
		<x><xsl:value-of select="utils:getLongDate($DateNow)"/></x>
		-->
			
		<xsl:choose>
			<xsl:when test="
												(./Profile/RelNo = $ProfileRelNo or $ProfileRelNo='') and
												
												(./SPortfolio/Key = $PortfolioKey or $PortfolioKey='') and   
												(./SPortfolio/Number = $PortfolioNumber or $PortfolioNumber='') and  
												(./SFund/Key = $FundKey or $FundKey='') and 												
												(./SUnitClass/Key = $UnitclassKey or $UnitclassKey='') and  
												(./Type/Desc = $TransactionType or $TransactionType='') and  
												
												(number($longDateNow) &gt;= number($longDateFrom) or $longDateFrom='0') and  
												(number($longDateNow) &lt;= number($longDateTo)  or $longDateTo='0')  and
												
												(contains(./CtractNo,$ContractNumber) or $ContractNumber='')											
												
										">
				<xsl:copy-of select="."/>	
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

