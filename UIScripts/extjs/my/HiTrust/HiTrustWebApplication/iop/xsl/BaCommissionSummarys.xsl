<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	<xsl:include href="myUtils.xsl"/>
	
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>	
	<xsl:param name="LOGINUSERTYPE"/>
	

	<!-- My Advisor--> 			
	<xsl:param name="PAYMENTKEY"/>
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
		
 			
 			<DST>
 				<xsl:copy-of select="//DST/user"/>   		
				<xsl:copy-of select="//DST/password"/>			<!--<xsl:sort select="*[name() = $vsortKey]"/>-->				
 				<response>
<!-- 
'Payment_Key'   				
'PaymentDate'   				
'Currency_ISOCode'    	
'Payment_SettleAmount'  

--> 				
						<xsl:choose>	
							
							<xsl:when test="$vsortKey='Payment_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Payment/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='PaymentDate'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getLongDate(./PaymentDate)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							<xsl:when test="$vsortKey='Currency_ISOCode'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Currency/ISOCode"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Payment_SettleAmount'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./Payment/SettleAmount)"  order="{$vsortOrder}" data-type="number"/>
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
 		
		
		                           <!--Advisor-->
				<xsl:variable name="PaymentKey"><xsl:value-of select="$PAYMENTKEY" /></xsl:variable>
		    
		    
		    <xsl:variable name="longDateFrom"><xsl:value-of select="utils:getShortDate($SEFFDATEFROM)"/></xsl:variable>
				<xsl:variable name="longDateTo"><xsl:value-of select="utils:getShortDate($SEFFDATETO)"/></xsl:variable>
    		<xsl:variable name="longDateNow"><xsl:value-of select="utils:getShortDate(./PaymentDate)"/></xsl:variable>
		
			
		<xsl:choose>
			<xsl:when test="
												(number($longDateNow) &gt;= number($longDateFrom) or $longDateFrom='0') and  
												(number($longDateNow) &lt;= number($longDateTo)  or $longDateTo='0')  and												
												(contains(./Payment/Key,$PaymentKey) or $PaymentKey='')		
																	
										">
				<xsl:call-template name="AddNodes">
						<xsl:with-param name="loginUserType"><xsl:value-of select="$LOGINUSERTYPE" /></xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

