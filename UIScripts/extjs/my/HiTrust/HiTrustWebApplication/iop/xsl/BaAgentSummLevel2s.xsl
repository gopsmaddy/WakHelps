<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	<xsl:include href="myUtils.xsl"/>
	
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>
	<xsl:param name="LOGINUSERTYPE"/>
	
	<!--<xsl:param name="PROFILERELNO"/>
	<xsl:param name="COMPANYKEY"/>-->
	
	<xsl:param name="UNITCLASSKEY"/>

		
	
	

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
	
 			
 			<DST>
 				<xsl:copy-of select="//DST/user"/>   		
				<xsl:copy-of select="//DST/password"/>					
 				<response>
 <!-- 
 'SubAgent_Number'						
'SubAgent_Name'							
'UnitClass_Fund_Ccy_ISOCode'
'TotalInUnits'							
'TotalInCurrency'						

 -->				
						
					<xsl:choose>
					
							<xsl:when test="$vsortKey='SubAgent_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./SubAgent/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='SubAgent_Number'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./SubAgent/Number"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='SubAgent_Name'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./SubAgent/Name"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							<xsl:when test="$vsortKey='UnitClass_Fund_Ccy_ISOCode'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./UnitClass/Fund/Ccy/ISOCode"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='TotalInUnits'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getNumber(./TotalInUnits)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='TotalInCurrency'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getNumber(./TotalInCurrency)"  order="{$vsortOrder}" data-type="number"/>
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
 
		<xsl:variable name="UnitClassKey"><xsl:value-of select="$UNITCLASSKEY" /></xsl:variable>
					
		<xsl:choose>
			<xsl:when test="												
												(./UnitClass/Key = $UnitClassKey or $UnitClassKey='') 
															
										">
				<xsl:call-template name="AddNodes">
						<xsl:with-param name="loginUserType"><xsl:value-of select="$LOGINUSERTYPE" /></xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

