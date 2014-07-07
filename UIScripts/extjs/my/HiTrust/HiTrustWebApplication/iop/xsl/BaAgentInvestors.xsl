<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	<xsl:include href="myUtils.xsl"/>
	
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>
	<xsl:param name="LOGINUSERTYPE"/>
	
	
	<xsl:param name="FIRSTNAME"/>
	<xsl:param name="LASTNAME"/>
	<xsl:param name="INVESTORNUMBER"/>
	<xsl:param name="ACTIVEPROFILE"/>
	

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
'PortOwner_RelNo'   		
'PortOwner_Name'   		
'PortOwner_GivenName'  
'PortOwner_Company_Key'
'PortOwner_Key'   			

 -->			
 			
 			<!--<xsl:copy-of select="*"/>-->
 			<DST>
 				<xsl:copy-of select="//DST/user"/>   		
				<xsl:copy-of select="//DST/password"/>			<!--<xsl:sort select="*[name() = $vsortKey]"/>-->				
 				<response>
 				
					<xsl:choose>
					
							<xsl:when test="$vsortKey='PortOwner_RelNo'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./PortOwner/RelNo"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='PortOwner_Name'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./PortOwner/Name"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							<xsl:when test="$vsortKey='PortOwner_GivenName'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./PortOwner/GivenName"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='PortOwner_Company_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./PortOwner/Company/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='PortOwner_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./PortOwner/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
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
 
		
		<xsl:variable name="ActiveProfile"><xsl:value-of select="$ACTIVEPROFILE" /></xsl:variable>
 
		<xsl:variable name="FirstName"><xsl:value-of select="translate($FIRSTNAME,$upper,$lower)" /></xsl:variable>
		<xsl:variable name="LastName"><xsl:value-of select="translate($LASTNAME,$upper,$lower)" /></xsl:variable>			
		<xsl:variable name="InvestorNumber"><xsl:value-of select="translate($INVESTORNUMBER,$upper,$lower)" /></xsl:variable>			
				
		<xsl:variable name="dataFirstName"><xsl:value-of select="translate(./PortOwner/Name,$upper,$lower)" /></xsl:variable>
		<xsl:variable name="dataLastName"><xsl:value-of select="translate(./PortOwner/GivenName,$upper,$lower)" /></xsl:variable>
		<xsl:variable name="dataInvestorNumber"><xsl:value-of select="translate(./PortOwner/RelNo,$upper,$lower)" /></xsl:variable>
			
			
			
			
		<xsl:choose>
			<xsl:when test="
												(contains($dataFirstName, $FirstName) or $FirstName='')	and	
												(contains($dataLastName, $LastName) or $LastName='') and
												(contains($dataInvestorNumber, $InvestorNumber) or $InvestorNumber='')and
												(./ActiveProfile = $ActiveProfile or $ActiveProfile='') 
														
										">
				
				
				<xsl:call-template name="AddNodes">
						<xsl:with-param name="loginUserType"><xsl:value-of select="$LOGINUSERTYPE" /></xsl:with-param>
				</xsl:call-template>
				
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

