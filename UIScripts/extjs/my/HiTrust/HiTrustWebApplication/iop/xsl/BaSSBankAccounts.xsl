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

						
					<xsl:choose>
					
							<xsl:when test="$vsortKey='Number'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./Number"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='SortCode_BSBCode'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./SortCode/BSBCode"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Name'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Name"  order="{$vsortOrder}" data-type="{$vsortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='SortCode_Bankname'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./SortCode/Bankname"  order="{$vsortOrder}" data-type="{$vsortType}"/>
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
			<xsl:when test="
												(./Client/RelNo = $ProfileRelNo or $ProfileRelNo='') 	and
												(./Client/Key = $ProfileKey or $ProfileKey='') 			
										">
				<xsl:copy-of select="."/>	
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

