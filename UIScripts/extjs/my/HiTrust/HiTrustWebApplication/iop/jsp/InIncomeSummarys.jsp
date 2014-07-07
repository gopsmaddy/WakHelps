<%@ page language="java" import="java.io.*" %>
<%@ page language="java" import="java.util.*" %>
<%@ page language="java" import="oracle.xml.parser.v2.*" %>
<%@ page language="java" import="org.w3c.dom.*" %>
<%@ page language="java" import="com.kurtosys.tools.*" %>

<%
		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		
		String serverContextURL=AppUtils.getServerContextURL(request);		
		
		String orgXMLFile = serverContextURL+"iop/xml/InIncomeSummarys.xml";
		String orgXSLFile = serverContextURL+"iop/xsl/InIncomeSummarys.xsl";
		
		//String orgXMLFile = "http://localhost:8080/HiTrustWebApplication/iop/xml/InIncomeSummarys.xml";
		//String orgXSLFile = "http://localhost:8080/HiTrustWebApplication/iop/xsl/InIncomeSummarys.xsl";
		
		/*
		  _dc	1298727196520
		  limit
		  start
		  
			FUNDKEY					
			FUNDCODE	
			UNITCLASSKEY	
			EXDATE	
			PAYMENTDATE					
			ENTITLEMENT				
		*/
		try
		{
		
			ParameterList paramList = new ParameterList();
			Enumeration en = request.getParameterNames();
	        
	    while (en.hasMoreElements()) 
	    {
	        
	        String paramName = (String) en.nextElement();	        
	        //paramList.add(new Parameter(paramName.toUpperCase(),request.getParameter(paramName)));
	        paramList.addParamValue(paramName.toUpperCase(), request.getParameter(paramName));
	        
	    }
			
			String mySortedresponse="";
			
		
		
			
			///////////////////sort xml////////////////////////////////
			
		  String myOrgResponse = XMLUtils.getXMLDocumentAsString(XMLUtils.getXMLDocumentFromHttp(orgXMLFile));
			//System.out.println("xmlout>"+ myOrgResponse);
			mySortedresponse = PageUtils.getXMLPaginated(myOrgResponse, orgXSLFile, paramList);
			//mySortedXMLDoc = XMLUtils.getXMLDocumentFromString(mySortedresponse);
							
					
			response.setContentType("text/xml");
		
			out.print(mySortedresponse);			
			out.flush();
			//out.close();
		} 
		catch (IOException e) 
		{
			// TODO Auto-generated catch block
			e.getMessage();
		} 
		
%>
