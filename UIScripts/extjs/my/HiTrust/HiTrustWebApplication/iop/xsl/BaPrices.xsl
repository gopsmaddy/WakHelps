<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>
	
	<xsl:param name="PROFILERELNO"/>

	<xsl:param name="FUNDKEY"/>		
	<xsl:param name="FUNDCODE"/>					
	<xsl:param name="UNITCLASSKEY"/>
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
					
							<xsl:when test="$vsortKey='PriceDate'">
									<xsl:for-each select="//DST/response/List">																					
										<xsl:sort select="utils:getLongDate(./PriceDate)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
					
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
							
							<xsl:when test="$vsortKey='UnitClass_Desc'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./UnitClass/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='BidPrice'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./BidPrice)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>		
							
							<xsl:when test="$vsortKey='NAVPrice'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./NAVPrice)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='OfferPrice'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./OfferPrice)"  order="{$vsortOrder}" data-type="number"/>
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
		
		<xsl:variable name="FundKey"><!-- Eventhough UI is passing FundKey and FundCode as two parameters, the values bind to them are same attribuites(Always fundKey)-->
			<xsl:choose>
				<xsl:when test="$FUNDKEY!=''"><xsl:value-of select="$FUNDKEY" /></xsl:when>
				<xsl:otherwise><xsl:value-of select="$FUNDCODE" /></xsl:otherwise>
			</xsl:choose>	
		</xsl:variable>	
		
		<xsl:variable name="UnitclassKey"><xsl:value-of select="$UNITCLASSKEY" /></xsl:variable><!-- Not Available -->
				
		<xsl:variable name="longDateFrom"><xsl:value-of select="utils:getShortDate($SEFFDATEFROM)"/></xsl:variable>
		<xsl:variable name="longDateTo"><xsl:value-of select="utils:getShortDate($SEFFDATETO)"/></xsl:variable>
    <xsl:variable name="longDateXML"><xsl:value-of select="utils:getShortDate(./PriceDate)"/></xsl:variable>
		<!--
		<x><xsl:value-of select="$DateFrom"/></x>
		<x><xsl:value-of select="utils:getLongDate($DateFrom)"/></x>		
		<x><xsl:value-of select="utils:getLongDate($DateTo)"/></x>
		<x><xsl:value-of select="utils:getLongDate($DateNow)"/></x>
		-->
			
		<xsl:choose>
			<xsl:when test="
												
												(./Fund/Key = $FundKey or $FundKey='') and 
																						
												(./UnitClass/Key = $UnitclassKey or $UnitclassKey='') and  
												
												(number($longDateXML) &gt;= number($longDateFrom) or $longDateFrom='0') and  
												(number($longDateXML) &lt;= number($longDateTo)  or $longDateTo='0')  									
																							
												
										">
				<xsl:copy-of select="."/>	
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

