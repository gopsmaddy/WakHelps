<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	
	
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
		 			
 			<DST>
 				<xsl:copy-of select="//DST/user"/>   		
				<xsl:copy-of select="//DST/password"/>						
 				<response> 				

					<xsl:for-each select="//DST/response/List">																							
						<xsl:call-template name="FilterData"/>																													
					</xsl:for-each>
						
				</response>
      </DST>
 </xsl:template>
 
  
 <xsl:template name="FilterData">		
 		
		<xsl:choose>
			<xsl:when test=" 1=1 ">
				<xsl:call-template name="UpdateNodes">
						<xsl:with-param name="loginUserType"><xsl:value-of select="$LOGINUSERTYPE" /></xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>	
										
 </xsl:template>
 
 
<xsl:template name="UpdateNodes">	
 	<xsl:param name="loginUserType"/>
 	
 	<xsl:variable name="IDTypeDesc"><xsl:value-of select="//DST/response/List/IDType/Desc" /></xsl:variable>		
	<xsl:variable name="TFN"><xsl:value-of select="//DST/response/List/TFN" /></xsl:variable>		
	<xsl:variable name="CorporateID"><xsl:value-of select="//DST/response/List/CorporateID" /></xsl:variable>
 
 	<List>	
 		
		<uid><xsl:value-of select="position()"/></uid>
		
		<LoginUserType>
			<xsl:choose>
				<xsl:when test="$loginUserType!=''">
					<xsl:value-of select="$loginUserType" />
				</xsl:when>
				<xsl:otherwise>0</xsl:otherwise>
			</xsl:choose>
		</LoginUserType>
		
		<xsl:for-each select="./*[name()!='TFN' or name()!='CorporateID']">	
				
			<xsl:copy-of select="."/>	
							
		</xsl:for-each>	
		
	</List>
	 	
 </xsl:template>
 
</xsl:stylesheet>

