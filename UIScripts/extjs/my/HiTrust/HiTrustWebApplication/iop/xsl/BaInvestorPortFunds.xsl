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
	<xsl:param name="FUNDCODE"/>
	
	
	
	

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
{name:'Fund_Desc', mapping: '>Fund>Desc'},
{name:'Fund_Code', mapping: '>Fund>Code' },
{name:'Fund_Key', mapping:  '>Fund>Key' }
-->						
					<xsl:choose>
					
							<xsl:when test="$vsortKey='Fund_Desc'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Fund/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Fund_Code'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Fund/Code"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Fund_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Fund/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
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
		<xsl:variable name="FundCode"><xsl:value-of select="$FUNDCODE" /></xsl:variable><!-- Not Available -->
		
			
		<xsl:choose>
			<xsl:when test="
												(./Profile/RelNo = $ProfileRelNo or $ProfileRelNo='') and
												
												(./Portfolio/Key = $PortfolioKey or $PortfolioKey='') and   
												(./Portfolio/Number = $PortfolioNumber or $PortfolioNumber='') and  
												(./Fund/Key = $FundKey or $FundKey='') and	
												(./Fund/Code = $FundCode or $FundCode='') 											
															
												
										">
				<xsl:copy-of select="."/>	
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

