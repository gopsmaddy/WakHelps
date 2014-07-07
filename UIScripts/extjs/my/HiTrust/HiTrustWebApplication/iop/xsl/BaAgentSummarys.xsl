<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	<xsl:include href="myUtils.xsl"/>
	
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>		
	<xsl:param name="LOGINUSERTYPE"/>
	
	<xsl:param name="FUNDKEY"/>
	<xsl:param name="ACTIVEPORTFOLIO"/>
	


	
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
		
 			
 			
 			<!--<xsl:copy-of select="*"/>-->
 			<DST>
 				<xsl:copy-of select="//DST/user"/>   		
				<xsl:copy-of select="//DST/password"/>			<!--<xsl:sort select="*[name() = $vsortKey]"/>-->				
 				<response>
 				
<!-- 
'PortOwner_RelNo'							
'Portfolio_Name'							
'Portfolio_Number'	         
'UnitClass_Fund_Code'	
'UnitClass_Fund_Key'					
'UnitClass_Desc'					   
'UnitClass_Fund_Ccy_ISOCode'	
'BalanceInCurrency'
BalanceInUnits	
UnitClass_Fund_Desc
      

-->					
					<xsl:choose>							
					
							<xsl:when test="$vsortKey='PortOwner_RelNo'">
									<xsl:for-each select="//DST/response/List">																					
										<xsl:sort select="./PortOwner/RelNo"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
					
							<xsl:when test="$vsortKey='Portfolio_Name'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./Portfolio/Name"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Portfolio_Number'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Portfolio/Number"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>		
							
							<xsl:when test="$vsortKey='UnitClass_Fund_Code'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./UnitClass/Fund/Code"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='UnitClass_Fund_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./UnitClass/Fund/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='UnitClass_Desc'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./UnitClass/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>		
							
							<xsl:when test="$vsortKey='UnitClass_Fund_Ccy_ISOCode'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./UnitClass/Fund/Ccy/ISOCode"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='BalanceInCurrency'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./BalanceInCurrency)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='BalanceInUnits'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./BalanceInUnits)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='UnitClass_Fund_Desc'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./UnitClass/Fund/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
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
 
		
		<xsl:variable name="ActivePortfolio"><xsl:value-of select="$ACTIVEPORTFOLIO" /></xsl:variable>
		<xsl:variable name="FundKey"><xsl:value-of select="$FUNDKEY" /></xsl:variable>

			
		<xsl:choose>
			<xsl:when test="
												
												(./UnitClass/Fund/Key = $FundKey or $FundKey='') 	and
												(./ActivePortfolio = $ActivePortfolio or $ActivePortfolio='') 	
												
										">
				<xsl:call-template name="AddNodes">
						<xsl:with-param name="loginUserType"><xsl:value-of select="$LOGINUSERTYPE" /></xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

