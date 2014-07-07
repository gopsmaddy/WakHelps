<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	<xsl:include href="myUtils.xsl"/>
	
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>
	<xsl:param name="LOGINUSERTYPE"/>

	
	
	

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
<!-- 
'SubAgent_Key'			
'SubAgent_Number'		
'SubAgent_Name'			
'SubAgent_AgentType_Desc'	
'Currency_ISOCode'				
'TotalInCurrency'	

-->		
 			
 			<DST>
 				<xsl:copy-of select="//DST/user"/>   		
				<xsl:copy-of select="//DST/password"/>			<!--<xsl:sort select="*[name() = $vsortKey]"/>-->				
 				<response>
 				
						
					<xsl:choose>
					
							<xsl:when test="$vsortKey='SubAgent_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./SubAgent/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='SubAgent/Number'">
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
							
							<xsl:when test="$vsortKey='SubAgent_AgentType_Desc'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./SubAgent/AgentType/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Currency_ISOCode'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Currency/ISOCode"  order="{$vsortOrder}" data-type="{$sortType}"/>
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
 
		
    	
    	
    	
		<!--
		<x><xsl:value-of select="$DateFrom"/></x>
		<x><xsl:value-of select="utils:getLongDate($DateFrom)"/></x>		
		<x><xsl:value-of select="utils:getLongDate($DateTo)"/></x>
		<x><xsl:value-of select="utils:getLongDate($DateNow)"/></x>
		-->
			
		<xsl:choose>
			<xsl:when test="1=1				
										">
				
				<xsl:call-template name="AddNodes">
						<xsl:with-param name="loginUserType"><xsl:value-of select="$LOGINUSERTYPE" /></xsl:with-param>
				</xsl:call-template>
				
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

