<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	
	<xsl:include href="myUtils.xsl"/>
	

	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>
	<xsl:param name="LOGINUSERTYPE"/>
	

  <!--Advisor Columns-->
  <xsl:param name="PAYMENTKEY"/>

	
	
	
	

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
 				
						
					<xsl:choose>
					
	<!--

'Agent_Key'			
'Payment_Key'		
'AgentPayKey'		
'PaidDate'			
'FeeType'	      
'AgentAmtPaid'	
	
	 -->						
							<xsl:when test="$vsortKey='Agent_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Agent/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='Payment_Key'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./Payment/Key"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	

						                      
								<xsl:when test="$vsortKey='AgentPayKey'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./AgentPayKey"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>		
							
							<xsl:when test="$vsortKey='PaidDate'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="utils:getLongDate(./PaidDate)"  order="{$vsortOrder}" data-type="number"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
													
							<xsl:when test="$vsortKey='FeeType'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="./FeeType"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>	
							
							<xsl:when test="$vsortKey='AgentAmtPaid'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./AgentAmtPaid)"  order="{$vsortOrder}" data-type="number"/>
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
 
		                                   <!-- Advisor data filter-->
		<xsl:variable name="PaymentKey"><xsl:value-of select="$PAYMENTKEY" /></xsl:variable>		
		
		<xsl:choose>
			<xsl:when test="
												(./Payment/Key = $PaymentKey or $PaymentKey='') 
												
										">
				<xsl:call-template name="AddNodes">
						<xsl:with-param name="loginUserType"><xsl:value-of select="$LOGINUSERTYPE" /></xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

