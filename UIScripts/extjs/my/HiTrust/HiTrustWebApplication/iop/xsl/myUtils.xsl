<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:utils="http://www.oracle.com/XSL/Transform/java/com.kurtosys.tools.AppUtils"
	>
	
	<xsl:param name="linebreak">&#10;</xsl:param>
	
	<xsl:param name="lower">abcdefghijklmnopqrstuvwxyz</xsl:param>
	<xsl:param name="upper">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:param>
	
	 
 <xsl:template name="AddNodes">	
 	<xsl:param name="loginUserType"/>
 
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
		
		<xsl:for-each select="./*">					
			<xsl:copy-of select="."/>		
		</xsl:for-each>	
	</List>
	 	
 </xsl:template>
 
 
 <xsl:template name="GetResponse">
		<xsl:choose>
			<xsl:when test="count(//DST/response/error) &gt; 0">													
				<xsl:for-each select="//DST/response">
					<error>
						<text>																														
							<xsl:for-each select="./*">		
								<xsl:variable name="erroText"><xsl:value-of select="./text" /></xsl:variable>			
									<li><xsl:value-of select="$erroText" /></li>
							</xsl:for-each>
						 </text>		
					</error>																											
				</xsl:for-each>	
			</xsl:when>					
			<xsl:otherwise>
				<response>
					<successful>true</successful>	
				</response>
			</xsl:otherwise>					
		</xsl:choose>
 </xsl:template>
 
</xsl:stylesheet>
