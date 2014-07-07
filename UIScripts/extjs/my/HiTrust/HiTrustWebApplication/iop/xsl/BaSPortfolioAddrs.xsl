<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>
	
	<xsl:param name="PROFILERELNO"/>
	<xsl:param name="PROFILEKEY"/>
	
	

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
<!-- 
{name: 'AddrType_Desc'				, mapping: '>AddrType>Desc'},									
{name: 'Address_Address1'			, mapping: '>Address>Address1'},
{name: 'Address_Address2'			, mapping: '>Address>Address2'},
{name: 'Address_Address3'			, mapping: '>Address>Address3'},
{name: 'Address_State'				, mapping: '>Address>State'},
{name: 'Address_ZipCode'			, mapping: '>Address>ZipCode'},
{name: 'Address_Country_Desc'	, mapping: '>Address>Country>Desc'},
{name: 'Address_TelNo'				, mapping: '>Address>TelNo'},
{name: 'Address_Telno2'				, mapping: '>Address>Telno2'},
{name: 'Address_MobileNo'			, mapping: '>Address>MobileNo'},
{name: 'Address_FaxNo'				, mapping: '>Address>FaxNo'},
{name: 'Address_EMail'				, mapping: '>Address>EMail'}	
-->						
					<xsl:choose>
					
							<xsl:when test="$vsortKey='AddrType_Desc'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./AddrType/Desc"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Address_Address1'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/Address1"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_Address2'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/Address2"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_Address3'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/Address3"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_State'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/State"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_ZipCode'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/ZipCode"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_Country_Desc'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/Country/Desc"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_TelNo'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/TelNo"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_Telno2'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/TelNo2"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_MobileNo'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/MobileNo"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_FaxNo'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/FaxNo"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Address_EMail'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Address/EMail"  order="{$vsortOrder}" data-type="{$vsortType}"/>
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
		<xsl:variable name="ProfileKey"><xsl:value-of select="$PROFILEKEY" /></xsl:variable>	
		
		<xsl:choose>
			<xsl:when test="1=1"> <!-- Filter at wsml by portfolioNumber -->
				<xsl:copy-of select="."/>	
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

