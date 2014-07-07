<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>
	
	<xsl:param name="PROFILERELNO"/>
	<xsl:param name="PROFILEKEY"/>

	<xsl:param name="FUNDKEY"/>	
	<xsl:param name="FUNDCODE"/>				
	<xsl:param name="UNITCLASSKEY"/>		

	<xsl:param name="EXDATE"/>	
	<xsl:param name="PAYMENTDATE"/>	
	<xsl:param name="ENTITLEMENTNO"/>
	
	
	

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
'Portfolio_Name'			
'Portfolio_Number' 	
'Income_Key'					
'Fund_Desc'					
'Fund_Code'						
'UnitClass_Code'			
'UnitClass_Desc'			
'ExDate'							
'PaymentDate'				
'Income_IncomeGross'	
'Income_WithHeldTax'	
'Income_Income'			
'Income_IncMethod_Desc'	
-->				

					<xsl:choose>
					
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
					
							<xsl:when test="$vsortKey='Income_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Income/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
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
							
							<xsl:when test="$vsortKey='UnitClass_Code'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./UnitClass/Code"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							
							<xsl:when test="$vsortKey='UnitClass_Desc'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./UnitClass/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='ExDate'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getLongDate(./ExDate)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='PaymentDate'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getLongDate(./PaymentDate)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Income_IncomeGross'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getNumber(./Income/IncomeGross)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Income_WithHeldTax'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getNumber(./Income/WithHeldTax)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Income_Income'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getNumber(./Income/Income)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Income_IncMethod_Desc'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./Income/IncMethod/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
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
		
		
		<xsl:variable name="FundKey"><!-- Eventhough UI is passing FundKey and FundCode as two parameters, the values bind to them are same attribuites(Always fundKey)-->
			<xsl:choose>
				<xsl:when test="$FUNDKEY!=''"><xsl:value-of select="$FUNDKEY" /></xsl:when>
				<xsl:otherwise><xsl:value-of select="$FUNDCODE" /></xsl:otherwise>
			</xsl:choose>	
		</xsl:variable>		
		
		<xsl:variable name="UnitclassKey"><xsl:value-of select="$UNITCLASSKEY" /></xsl:variable>
		<xsl:variable name="EntitlementNo"><xsl:value-of select="$ENTITLEMENTNO" /></xsl:variable>
				
		<xsl:variable name="longExDate"><xsl:value-of select="utils:getShortDate($EXDATE)"/></xsl:variable>
		<xsl:variable name="longPaymentDate"><xsl:value-of select="utils:getShortDate($PAYMENTDATE)"/></xsl:variable>
		
    <xsl:variable name="longExDateXML"><xsl:value-of select="utils:getShortDate(./ExDate)"/></xsl:variable>
    <xsl:variable name="longPaymentDateXML"><xsl:value-of select="utils:getShortDate(./PaymentDate)"/></xsl:variable>
		<!--
		<x><xsl:value-of select="$DateFrom"/></x>
		<x><xsl:value-of select="utils:getLongDate($DateFrom)"/></x>		
		<x><xsl:value-of select="utils:getLongDate($DateTo)"/></x>
		<x><xsl:value-of select="utils:getLongDate($DateNow)"/></x>
		-->
			
		<xsl:choose>
			<xsl:when test="
												(./Profile/RelNo = $ProfileRelNo or $ProfileRelNo='') and
												(./Profile/Key = $ProfileKey or $ProfileKey='') and
												
												(./Fund/Key = $FundKey or $FundKey='') and 
																							
												(./UnitClass/Key = $UnitclassKey or $UnitclassKey='') and  
																								
												(number($longExDateXML) = number($longExDate) or $longExDate='0') and  
												(number($longPaymentDateXML) = number($longPaymentDate)  or $longPaymentDate='0')  and
												
												(contains(./Income/Key, $EntitlementNo) or $EntitlementNo='')											
												
										">
				<xsl:copy-of select="."/>	
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

