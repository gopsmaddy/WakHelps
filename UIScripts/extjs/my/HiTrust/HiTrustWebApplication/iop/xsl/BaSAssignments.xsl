<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	
	<xsl:include href="myUtils.xsl"/>
	

	
	
	<xsl:param name="vsortKey"/>
	<xsl:param name="vsortOrder"/>
	<xsl:param name="vsortType"/>	
	<xsl:param name="LOGINUSERTYPE"/>
	
	<xsl:param name="PROFILERELNO"/>
	
	<xsl:param name="PORTFOLIOKEY"/>
	<xsl:param name="ACCOUNTKEY"/>
	
	
	
	

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
{name:'Profile_Name'				    , mapping: 'Profile>Name' },
{name:'Type_Desc'						    , mapping: 'Type>Desc'},		               
{name:'Currency_ISOCode'	      , mapping: 'Currency>ISOCode'},		               
{name:'Amount'							    , mapping: 'Amount' }		  
 -->
 			
 			<!--<xsl:copy-of select="*"/>-->
 			<DST>
 				<xsl:copy-of select="//DST/user"/>   		
				<xsl:copy-of select="//DST/password"/>			<!--<xsl:sort select="*[name() = $vsortKey]"/>-->				
 				<response>
 				
						
					<xsl:choose>
					
							<xsl:when test="$vsortKey='Profile_Name'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./Profile/Name"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Type_Desc'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./Type/Desc"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Currency_ISOCode'">
									<xsl:for-each select="//DST/response/List">											
										<xsl:sort select="./Currency/ISOCode"  order="{$vsortOrder}" data-type="{$sortType}"/>
										<xsl:call-template name="FilterData"/>																													
									</xsl:for-each>
							</xsl:when>
							
							<xsl:when test="$vsortKey='Amount'">
									<xsl:for-each select="//DST/response/List">										
										<xsl:sort select="utils:getNumber(./Amount)"  order="{$vsortOrder}" data-type="number"/>
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
		<xsl:variable name="ProfileKey"><xsl:value-of select="$PORTFOLIOKEY" /></xsl:variable>
		<xsl:variable name="AccountKey"><xsl:value-of select="$ACCOUNTKEY" /></xsl:variable>
		
		<xsl:choose>
			<xsl:when test="(1=1) 
										">
				<xsl:call-template name="AddNodes">
						<xsl:with-param name="loginUserType"><xsl:value-of select="$LOGINUSERTYPE" /></xsl:with-param>
				</xsl:call-template>	
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
</xsl:stylesheet>

